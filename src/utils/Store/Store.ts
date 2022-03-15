import { EventBus } from '../EventBus/EventBus';
import set from '../set';

export enum StoreEvents {
	UPDATE = 'update',
}

type Indexed<T = any> = {
	[key in string]: T;
};

class Store extends EventBus {
	private state: Indexed = {};
	constructor() {
		super();
	}

	getState(): Indexed {
		return this.state;
	}

	set(path: string, value: unknown) {
		set(this.state, path, value);
		this.emit(StoreEvents.UPDATE);
	}
}

export default new Store();
