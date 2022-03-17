/* eslint-disable indent */
import { Block } from '../Block/Block';
import { EventBus } from '../EventBus/EventBus';
import isEqual from '../isEqualProps';
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
interface IStoreData {
	user?: IUser;
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

export const withStore =
	(mapStateToProps: (state: IStoreData) => Record<string, unknown>) =>
	(Component: typeof Block) => {
		let state: IStoreData;
		return class extends Component {
			constructor(props: Record<string, any>) {
				state = mapStateToProps(store.getState());
				super({ ...props, state });
				store.on(StoreEvents.UPDATE, () => {
					const newState = mapStateToProps(store.getState());

					if (!isEqual(state, newState)) {
						this.setProps({
							state: newState,
						});
					}
				});
			}
		};
	};

export default store;
