import { v4 as makeUUID } from 'uuid';
import { EventBus, IEventBus } from '../EventBus/EventBus';
import { isEqual } from '../isEqual/isEqual';
import { Templator } from '../Template-engine/templater';

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
	props: TProps;
	children: TProps;
	eventBus(): IEventBus;
	// _registerEvents(eventBus: IEventBus): void;
	// _createResources(): void;
	init(): void;
	// _componentDidMount(): void;
	componentDidMount(): void;
	dispatchComponentDidMount(): void;
	// _componentDidUpdate(oldProps: TProps, newProps: TProps): void;
	componentDidUpdate(oldProps: TProps, newProps: TProps): boolean;
	// setProps(nextProps: TProps): void;
	// _addEvents(): void;
	// _render(): void;
	render(): string;
	getContent(): HTMLElement;
	// _makePropsProxy(props: TProps): TProps;
	// _createDocumentElement(tagName: string): HTMLElement;
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

	private _element: HTMLElement;
	private readonly _meta: { tagName: string, props: TProps };
	private _id: string = '';
	// private _arrId: string = '';

	props: TProps;
	children: TProps;
	eventBus: () => IEventBus;

	constructor(tagName = 'div', propsAndChildren: TProps = {}) {
		const eventBus = new EventBus();

		const { children, props } = this._getChildren(propsAndChildren);

		this._meta = {
			tagName,
			props,
		};

		// Генерируем уникальный UUID V4
		this._id = makeUUID();
		// this._arrId = makeUUID();

		this.props = this._makePropsProxy({ ...props, _id: this._id });
		this.children = children;

		this.eventBus = (): IEventBus => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private _getChildren(propsAndChildren: TProps): TProps {
		const children: TProps = {};
		const props: TProps = {};

		Object.entries(propsAndChildren).forEach(([key, value]) => {

			if (Array.isArray(value)) {
				children[key] = value;
			}

			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props };

	}

	compile(template: string, props: TProps): any {
		const propsAndStubs = { ...props };

		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
		});
		// console.log(propsAndStubs);

		const fragment = this._createDocumentElement('template');

		fragment.innerHTML = new Templator(template).compile(propsAndStubs).getNode().outerHTML;

		let stub: any = null;
		Object.values(this.children).forEach(child => {
			
			if (Array.isArray(child)) {
				child.map(el => {
					stub = (fragment as any).content.querySelector(`[data-id="${el._id}"]`);
					stub.replaceWith(this.element);
				});

			} else {
				stub = (fragment as any).content.querySelector(`[data-id="${child._id}"]`);
				stub.replaceWith(this.element);
			}
			
		});

		return (fragment as any).content;

	}

	private _registerEvents(eventBus: IEventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CMD, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources(): void {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	init(): void {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _componentDidMount(): void {
		this.componentDidMount();

		Object.values(this.children).forEach(child => {
			child.dispatchComponentDidMount();
		});
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidMount(): void { }

	dispatchComponentDidMount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CMD);
	}

	private _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
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

	private _addEvents(): void {
		const { events = {} } = this.props;

		Object.keys(events).forEach(eventName => {
			(this._element as HTMLElement).addEventListener(eventName, events[eventName]);
		});
	}

	private _removeEvents(): void {
		const { events = {} } = this.props;

		Object.keys(events).forEach(eventName => {
			(this._element as HTMLElement).removeEventListener(eventName, events[eventName]);
		});
	}

	private _render(): void {
		const block = this.render();

		this._removeEvents();
		this._element.innerHTML = '';

		// this._element.firstElementChild
		// 	? this._element.replaceChild(block, this._element.firstElementChild)
		// 	: this._element.append(block)

		this._element.appendChild(block);

		this._addEvents();
	}

	// Переопределяется пользователем. Необходимо вернуть разметку
	render(): any { }

	getContent(): HTMLElement {
		return this.element;
	}

	private _makePropsProxy(props: TProps): TProps {
		const checkPrivateProp = (prop: string) => prop.startsWith('_');
		return new Proxy(props, {
			get: (target: TProps, prop: string) => {
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

	private _createDocumentElement(tagName: string): HTMLElement {
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
