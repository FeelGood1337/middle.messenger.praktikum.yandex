import { ChatAPI, IChats } from '../API/chat-api';
import router from '../router';
import store from '../utils/Store/Store';

const chatApi = new ChatAPI();

class ChatController {
	async createChat(body: Record<string, string>): Promise<void> {
		await chatApi.createChat(body);
	}

	async getChat(): Promise<void> {
		await chatApi
			.getChats()
			.then((chats: IChats[]): void => {
				store.set('chats', chats);
			})
			.catch((err) => {
				const { status } = err;

				if (status === 500) {
					router.go('/error');
				}
			});
	}
}

export default new ChatController();
