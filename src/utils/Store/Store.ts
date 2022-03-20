import { IChats } from '../../API/chat-api';
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
	chats?: IChats[];
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
	chats?: IChats[];
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

	set(path: any, value: unknown) {
		set(this.state, path, value);
		this.emit(StoreEvents.UPDATE);
	}
}

const store = new Store();

export default store;
