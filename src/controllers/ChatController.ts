import { ChatAPI, IChats } from '../API/chat-api';
import router from '../router';
import store from '../utils/Store/Store';

const chatApi = new ChatAPI();

class ChatController {
	async createChat(body: Record<string, string>): Promise<void> {
		await chatApi.createChat(body).then(() => this.getChat());
	}

	async getChat(): Promise<void> {
		await chatApi
			.getChats()
			.then((chats: IChats[]): void => {
				store.set('user.chats', chats);
			})
			.catch((err) => {
				const { status } = err;

				if (status === 500) {
					router.go('/error');
				}
			});
	}

	async addUserToChat(data: Record<string, any>): Promise<void> {
		await chatApi.addUserToChat(data).catch((err) => {
			const { status } = err;

			if (status === 500) {
				router.go('/error');
			}
		});
	}

	async getToken(id: string) {
		await chatApi
			.getToken(id)
			.then(({ token }: Record<string, string>) => {
				store.set('user.token', token);
				// localStorage.setItem('user_token', token);
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
