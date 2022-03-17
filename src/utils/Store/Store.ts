import { EventBus } from '../EventBus/EventBus';
import set from '../set';

export enum StoreEvents {
	UPDATE = 'update',
}

type Indexed<T = any> = {
	[key in string]: T;
};

export interface IUser {
	id: number;
	avatar: string;
	display_name: string;
	email: string;
	first_name: string;
	second_name: string;
	login: string;
	phone: string;
}
export interface IStoreData {
	user?: IUser;
	isLoaded?: boolean;
}

class Store extends EventBus {
	private state: IStoreData = {};
	constructor() {
		super();
	}

	getState(): Indexed {
		return this.state;
	}

	set(path: keyof IStoreData, value: unknown) {
		set(this.state, path, value);
		this.emit(StoreEvents.UPDATE);
	}
}

const store = new Store();

export default store;
