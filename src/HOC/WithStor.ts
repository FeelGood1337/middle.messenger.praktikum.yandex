/* eslint-disable indent */
import { Block } from '../utils/Block/Block';
import isEqual from '../utils/isEqualProps';
import Router from '../utils/Routing/Router';
import store, { IStoreData, StoreEvents } from '../utils/Store/Store';

export const withStore =
	(mapStateToProps: (state: IStoreData) => Record<string, unknown>) =>
	(Component: typeof Block) => {
		let state: IStoreData = {};
		let newState: IStoreData = {};
		let route: Router;
		let chatId: Record<string, string>;
		return class extends Component {
			constructor(props: Record<string, any>) {
				state = { ...mapStateToProps(store.getState()) };
				super({ ...props, state });

				store.on(StoreEvents.UPDATE, () => {
					if (props !== undefined) {
						route = props.route;
						chatId = { chatId: route.getUrlParam() };
						newState = { ...mapStateToProps(store.getState()), ...chatId };
					} else {
						newState = mapStateToProps(store.getState());
					}
					if (!isEqual(state, newState)) {
						this.setProps({
							state: newState,
						});
					}
				});
			}
		};
	};
