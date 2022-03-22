/* eslint-disable indent */
import { Block } from '../utils/Block/Block';
import isEqual from '../utils/isEqualProps';
import store, { IStoreData, StoreEvents } from '../utils/Store/Store';

export const withStore =
	(mapStateToProps: (state: IStoreData) => Record<string, unknown>) =>
	(Component: typeof Block) => {
		let state: IStoreData = {};
		return class extends Component {
			constructor(props: Record<string, any>) {
				state = { ...mapStateToProps(store.getState()) };
				super({ ...props, state });
				const pathList = window.location.pathname.split('/');
				pathList.shift();

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
