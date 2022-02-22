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
	eventBus(): IEventBus;
	init(): void;
	componentDidMount(): void;
	dispatchComponentDidMount(): void;
	componentDidUpdate(oldProps: TProps, newProps: TProps): boolean;
	render(): string;
	getContent(): HTMLElement;
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
	private _id: string = '';

	protected props: TProps;
	protected children: Record<string, Block>;
	eventBus: () => IEventBus;

	constructor(propsAndChildren: TProps = {}) {
		const eventBus = new EventBus();

		const { children, props } = this._getChildren(propsAndChildren);

		// Генерируем уникальный UUID V4
		this._id = makeUUID();

		this.props = this._makePropsProxy({ ...props, _id: this._id });
		this.children = children;

		this.eventBus = (): IEventBus => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private _registerEvents(eventBus: IEventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CMD, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	init(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _componentDidMount(): void {
		this.componentDidMount();

		Object.values(this.children).forEach(child => {
			if (Array.isArray(child)) {
				child.map(el => {
					el.dispatchComponentDidMount();
				})
			} else {
				child.dispatchComponentDidMount();
			}

		});
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidMount(): void { }

	dispatchComponentDidMount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CDU);
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

	private _getChildren(propsAndChildren: TProps): TProps {
		const children: TProps = {};
		const props: TProps = {};

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				const _zId = makeUUID();
				children[key] = [...value, { _zId }];
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
			if (Array.isArray(child)) {
				let propsStrTmpl: string = '';
				let ID = '';
				child.map(el => {
					if (el._zId !== undefined) {
						ID = el._zId;
					}
					propsStrTmpl += `<div data-id="${el._id}"></div>`;
				});
				propsAndStubs[key] = `<div data-id="${ID}">${propsStrTmpl}</div>`;
			} else {
				propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
			}
		});

		const fragment = this._createDocumentElement('template');

		fragment.innerHTML = new Templator(template).compile(propsAndStubs).getNode().outerHTML;

		Object.values(this.children).forEach(child => {
			if (Array.isArray(child)) {
				let cnt: number = 0;
				const [zID] = Object.values(child[child.length - 1]);
				child.splice(child.length - 1, 1);
				const stub = (fragment as any).content.querySelector(`[data-id="${zID}"]`);
				stub.removeChild(stub.lastElementChild);

				for (const val of stub.childNodes) {
					if (!(val.dataset.id === 'undefined')) {
						val.replaceWith(child[cnt].getContent());
					}
					child.length - 1 > cnt ? cnt += 1 : cnt;
				}

				this._moveChildToNewParent(stub);

			} else {
				const stub = (fragment as any).content.querySelector(`[data-id="${child._id}"]`);
				stub.replaceWith(child.getContent());
			}
		});

		return (fragment as any).content;

	}

	private _moveChildToNewParent(stub: any): void {
		const fragment = document.createDocumentFragment();
		while (stub.firstChild) {
			fragment.appendChild(stub.firstChild);
		}
		stub.parentNode.replaceChild(fragment, stub);
	}

	private _render(): void {
		const fragment = this.render();
		const newElement = fragment.firstElementChild as HTMLElement;

		if (this._element) {
			this._removeEvents();
			this._element.replaceWith(newElement);
		}

		this._element = newElement;

		this._addEvents();
	}

	render(): any { }

	getContent(): HTMLElement {
		return this.element;
	}

	private _makePropsProxy(props: TProps): TProps {
		const checkPrivateProp = (prop: string) => prop.startsWith('_');
		return new Proxy(props, {
			get: (target: TProps, prop: string) => {
				const value = target[prop];
				return (typeof value === 'function') ? value.bind(target) : value;
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
		const element = document.createElement(tagName);
		element.setAttribute('data-id', this._id);
		element.setAttribute('id', 'Chat-app');
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
