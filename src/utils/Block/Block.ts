/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { v4 as makeUUID } from 'uuid';
import { EventBus, IEventBus } from '../EventBus/EventBus';
import { isEqual } from '../isEqual/isEqual';

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

	protected props: Record<string, any>;
	protected children: Record<string, Block>;
	protected eventBus: () => IEventBus;

	constructor(props: Record<string, any> = {}) {
		const eventBus = new EventBus();

		// Генерируем уникальный UUID V4
		this._id = makeUUID();

		this.props = this._makePropsProxy({ ...props, _id: this._id });

		this.eventBus = (): IEventBus => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private _registerEvents(eventBus: IEventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	init(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidMount(): void {
		this.componentDidMount();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
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
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
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

	private _render(): void {
		const fragment = this.render();

		if (this._element) {
			this._removeEvents();
			this._element.replaceWith(fragment);
		}

		this._element = fragment;
		this._removeEvents();
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
