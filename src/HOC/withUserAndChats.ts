import { withStore } from './WithStor';

export const withUserAndChats = withStore((state) => ({
	user: state.user,
	chats: state.chats,
}));
