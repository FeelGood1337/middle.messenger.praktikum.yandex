import { ChatAPI } from '../API/chat-api';

const chatApi = new ChatAPI();

class ChatController {
	async createChat(body: Record<string, string>): Promise<void> {
		await chatApi.createChat(body);
	}

	async getChat(): Promise<void> {
		await chatApi.getChats();
	}
}

export default new ChatController();
