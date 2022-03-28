/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { v4 as makeUUID } from 'uuid';
import { EventBus, IEventBus } from '../EventBus/EventBus';
import isEqual from '../isEqualProps';
import { Templator } from '../Template-engine/templater';

type TEvents<T extends object> = {
	[P in keyof T]: T[P];
};

interface IEvents {
	INIT: string;
	FLOW_CDM: string;
	FLOW_CDU: string;
	FLOW_RENDER: string;
}

abstract class Block {
	static EVENTS: TEvents<IEvents> = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	private _element: HTMLElement;
	private _id = '';
	private _arrId = '';

	protected props: Record<string, any>;
	protected children: Record<string, Block | Block[]>;
	protected eventBus: () => IEventBus;

	constructor(propsAndChildren: Record<string, any> = {}) {
		const eventBus = new EventBus();

		const { props, children } = this._getChildren(propsAndChildren);

		this.children = children;

		// Генерируем уникальный UUID V4
		this._id = makeUUID();
		this._arrId = makeUUID();

		this.props = this._makePropsProxy({ ...props, _id: this._id });
		this.initChildren();

		this.eventBus = (): IEventBus => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	protected initChildren() {}

	private _registerEvents(eventBus: IEventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private init(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		// this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _getChildren(propsAndChildren: Record<string, any>): Record<string, any> {
		const children: Record<string, any> = {};
		const props: Record<string, any> = {};

		Object.entries(propsAndChildren).map(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else if (
				Array.isArray(value) &&
				value.every((val) => val instanceof Block)
			) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props };
	}

	private _componentDidMount(): void {
		this.componentDidMount();
		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.map((el: Block) => el.dispatchComponentDidMount());
				return;
			}
			child.dispatchComponentDidMount();
		});
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	componentDidMount(): void {}

	private _componentDidUpdate(
		oldProps: Record<string, any>,
		newProps: Record<string, any>,
	): void {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();
		// this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidUpdate(
		oldProps: Record<string, any>,
		newProps: Record<string, any>,
	): boolean {
		return !isEqual(oldProps, newProps);
	}

	setProps = (nextProps: Record<string, any>): void => {
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

		Object.keys(events).forEach((eventName) => {
			(this._element as HTMLElement).addEventListener(eventName, events[eventName]);
		});
	}

	private _removeEvents(): void {
		const { events = {} } = this.props;

		Object.keys(events).forEach((eventName) => {
			(this._element as HTMLElement).removeEventListener(
				eventName,
				events[eventName],
			);
		});
	}

	private _createDocumentElement(tagName: string) {
		return document.createElement(tagName);
	}

	compile(template: Templator, context: Record<string, any>): DocumentFragment {
		const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

		Object.entries(this.children).forEach(([key, child]) => {
			if (Array.isArray(child)) {
				context[key] = child
					.map((el: Block) => `<div data-id="${el._id}"></div>`)
					.join('');
				context[key] = `<div data-id="${this._arrId}">${context[key]}</div>`;
				return;
			}
			context[key] = `<div data-id="${child._id}"></div>`;
		});

		const htmlString = template.compile({ ...context });
		fragment.innerHTML = htmlString;

		Object.entries(this.children).forEach(([key, child]) => {
			if (Array.isArray(child)) {
				const stub = fragment.content.querySelector(`[data-id="${this._arrId}"]`);
				child.map((el: Block, index: number) => {
					stub?.children[index].replaceWith(el.getContent());
				});
				return;
			}

			const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

			if (!stub) {
				return;
			}

			stub.replaceWith(child.getContent());
		});

		return fragment.content;
	}

	private _render(): void {
		const fragment: DocumentFragment = this.render();
		const newElement = fragment.firstElementChild as HTMLElement;

		if (this._element) {
			this._removeEvents();
			this._element.replaceWith(newElement);
		}

		this._element = newElement;
		this._addEvents();
	}

	render(): any {}

	getContent(): HTMLElement {
		return this.element;
	}

	private _makePropsProxy(props: Record<string, any>): Record<string, any> {
		const checkPrivateProp = (prop: string) => prop.startsWith('_');
		return new Proxy(props, {
			get: (target: Record<string, any>, prop: string) => {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set: (target: any, prop: string, val: string): boolean => {
				const oldProps = { ...target };
				target[prop] = val;
				this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
				return true;
			},
			deleteProperty(target: Record<string, any>, prop: string): boolean {
				if (checkPrivateProp(prop)) {
					throw new Error('Нет прав');
				} else {
					delete target[prop];
					return true;
				}
			},
		});
	}

	show(): void {
		this.getContent().style.display = 'flex';
	}

	hide(): void {
		this.getContent().style.display = 'none';
	}
}

export { Block };
