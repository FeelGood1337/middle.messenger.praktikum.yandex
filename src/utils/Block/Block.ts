import { EventBus, IEventBus } from "../EventBus/EventBus";

type TProps = {
	[key: string]: any;
};

type TEvents<T extends object> = {
	[P in keyof T]: T[P];
};

interface IEvents {
	INIT: string;
	FLOW_CMD: string;
	FLOW_RENDER: string;
}
interface IBlock {
	EVENTS: TEvents<IEvents>;
	_element: HTMLElement;
	_meta: { tagName: string; props: TProps };
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
		FLOW_RENDER: 'flow:render',
	};

	_element: HTMLElement = null;
	_meta: { tagName: string, props: TProps } = null;

	props: TProps;
	eventBus: () => IEventBus;

	constructor(tagName = 'div', props: TProps = {}) {
		const eventBus = new EventBus();

		this._meta = {
			tagName,
			props,
		};

		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	_registerEvents(eventBus: IEventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CMD, this._componentDidMount.bind(this));
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
	}

	componentDidMount(): void { }

	dispatchComponentDidMount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CMD);
	}

	_componentDidUpdate(oldProps: TProps, newProps: TProps): void { }

	componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
		return true;
	}

	setProps = (nextProps: TProps): void => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element(): HTMLElement {
		return this._element;
	}

	_render(): void {
		const block = this.render();
		// Это небезопасный метод для упрощения логики
		// Используйте шаблонизатор из npm или напишите свой безопасный
		// Нужно компилировать не в строку (или делать это правильно),
		// либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
		this._element.innerHTML = block;
	}

	// Переопределяется пользователем. Необходимо вернуть разметку
	render(): any { }

	getContent(): HTMLElement {
		return this.element;
	}

	_makePropsProxy(props: TProps): TProps {
		// Ещё один способ передачи this, но он больше не применяется с приходом ES6+
		const self = this;

		// Здесь вам предстоит реализовать метод
		return props;
	}

	_createDocumentElement(tagName: string): HTMLElement {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	show(): void {
		this.getContent().style.display = "block";
	}

	hide(): void {
		this.getContent().style.display = "none";
	}
}

export { Block, IBlock };
