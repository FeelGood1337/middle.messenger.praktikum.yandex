import { ChatList } from './ChatList';
import { withUser } from '../../HOC/withUser';
import { withRouter } from '../../HOC/WithRouter';
import { Block } from '../../utils/Block/Block';
import { EMPTY_CHATS, NO_SELECTED_CHAT } from '../../constants';
import store, { IUser } from '../../utils/Store/Store';
import { IChats } from '../../API/chat-api';

function withChildren(Component: typeof Block) {
	return class extends Component {
		constructor(props: Record<string, any>) {
			const { user }: Record<string, IUser> = store.getState();
			const { chats } = user;
			const { chatId } = props.router.getParams();

			const currentChat = chats?.filter((el: IChats) => el.id === parseInt(chatId));
			const [chat] = currentChat as IChats[];

			super({
				...props,
				chats,
				startMessage:
					chats === undefined || chats.length === 0
						? EMPTY_CHATS
						: NO_SELECTED_CHAT,
			});
		}
	};
}

export default withRouter(withChildren(withUser(ChatList)));
