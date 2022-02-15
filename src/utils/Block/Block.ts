import { v4 as makeUUID } from 'uuid';
import { EventBus, IEventBus } from '../EventBus/EventBus';
import { isEqual } from '../isEqual/isEqual';

type TProps = {
	[key: string]: any;
};

type TEvents<T extends object> = {
	[P in keyof T]: T[P];
};

interface IEvents {
	INIT: string;
	FLOW_CMD: string;
	FLOW_CDU: string;
	FLOW_RENDER: string;
}
interface IBlock {
	_element: HTMLElement;
	_meta: { tagName: string; props: TProps };
	_id: string;
	props: TProps;
	eventBus(): IEventBus;
	_registerEvents(eventBus: IEventBus): void;
	_createResources(): void;
	init(): void;
	_componentDidMount(): void;
	componentDidMount(): void;
	dispatchComponentDidMount(): void;
	_componentDidUpdate(oldProps: TProps, newProps: TProps): void;
	componentDidUpdate(oldProps: TProps, newProps: TProps): boolean;
	setProps(nextProps: TProps): void;
	_addEvents(): void;
	_render(): void;
	render(): string;
	getContent(): HTMLElement;
	_makePropsProxy(props: TProps): TProps;
	_createDocumentElement(tagName: string): HTMLElement;
	show(): void;
	hide(): void;
}

class Block implements IBlock {

	static EVENTS: TEvents<IEvents> = {
		INIT: 'init',
		FLOW_CMD: 'flow:component-did-mount',
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: 'flow:render',
	};

	_element: HTMLElement;
	readonly _meta: { tagName: string, props: TProps };
	_id: string = '';

	props: TProps;
	eventBus: () => IEventBus;

	constructor(tagName = 'div', props: TProps = {}) {
		const eventBus = new EventBus();

		this._meta = {
			tagName,
			props,
		};

		// Генерируем уникальный UUID V4
		this._id = makeUUID();

		this.props = this._makePropsProxy({ ...props, __id: this._id });

		this.eventBus = (): IEventBus => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	_registerEvents(eventBus: IEventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CMD, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources(): void {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	init(): void {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	_componentDidMount(): void {
		this.componentDidMount();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidMount(): void { }

	dispatchComponentDidMount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CMD);
	}

	_componentDidUpdate(oldProps: TProps, newProps: TProps): void {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();
	}

	componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
		return !isEqual(oldProps, newProps);
	}

	setProps = (nextProps: TProps): void => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element(): HTMLElement {
		return this._element as HTMLElement;
	}

	_addEvents(): void {
		const { events = {} } = this.props;

		Object.keys(events).forEach(eventName => {
			(this._element as HTMLElement).addEventListener(eventName, events[eventName]);
		});
	}

	_removeEvents(): void {
		const { events = {} } = this.props;

		Object.keys(events).forEach(eventName => {
			(this._element as HTMLElement).removeEventListener(eventName, events[eventName]);
		});
	}

	_render(): void {
		const block = this.render();

		// this._element.firstElementChild
		// 	? this._element.replaceChild(block, this._element.firstElementChild)
		// 	: this._element.append(block)
		// Удалить старые события через removeEventListener +
		this._removeEvents();

		(this._element as HTMLElement).innerHTML = block.outerHTML;

		// Навесить новые события через addEventListener +
		this._addEvents();
	}

	// Переопределяется пользователем. Необходимо вернуть разметку
	render(): any { }

	getContent(): HTMLElement {
		return this.element;
	}

	_makePropsProxy(props: TProps): TProps {
		const checkPrivateProp = (prop: string) => prop.startsWith('_');
		return new Proxy(props, {
			get(target: TProps, prop: string) {
				if (checkPrivateProp(prop)) {
					throw new Error("Нет прав");
				} else {
					const value = target[prop];
					return (typeof value === 'function') ? value.bind(target) : value;
				}
			},
			set: (target: any, prop: string, val: string): boolean => {
				if (checkPrivateProp(prop)) {
					throw new Error("Нет прав");
				} else {
					target[prop] = val;
					this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
					return true;
				}
			},
			deleteProperty(target: TProps, prop: string): boolean {
				if (checkPrivateProp(prop)) {
					throw new Error("Нет прав");
				} else {
					delete target[prop];
					return true;
				}
			}
		});
	}

	_createDocumentElement(tagName: string): HTMLElement {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		const element = document.createElement(tagName);
		element.setAttribute('data-id', this._id);
		return element;
	}

	show(): void {
		this.getContent().style.display = "block";
	}

	hide(): void {
		this.getContent().style.display = "none";
	}
}

export { Block, IBlock };
