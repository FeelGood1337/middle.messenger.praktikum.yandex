import { BaseAPI } from './base-api';

class ChatAPI extends BaseAPI {

	protected create(): any {
		return this._http.post('/', { body: 'string' });
	}

	protected request(): void {
		// return this._http.get('/full');
	}
}

export { ChatAPI };
