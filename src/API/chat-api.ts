import { BaseAPI } from './base-api';

class ChatAPI extends BaseAPI {
	_url: string;
	constructor() {
		super();
		this._url = `${this._baseURL}/chats/`;
	}

	createChat(body: Record<string, string>): Promise<any> {
		const options = {
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};

		return this._http
			.post(this._url, options)
			.then((res: any) => this.getResponse(res));
	}

	getChats(): Promise<any> {
		return this._http
			.get(this._url)
			.then((res: any) => this.getResponseWithParse(res));
	}
}

export { ChatAPI };
