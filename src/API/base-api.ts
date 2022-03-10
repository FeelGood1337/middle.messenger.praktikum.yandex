import { HTTPTransport } from "../utils/HTTP/HTTP";

export abstract class BaseAPI {
	_baseURL: string;
	_http: HTTPTransport;
	constructor() {
		this._baseURL = 'api/v1/chats';
		this._http = new HTTPTransport();
	}

	protected create() { throw new Error('Not implemented'); }

	protected request() { throw new Error('Not implemented'); }

	protected update() { throw new Error('Not implemented'); }

	protected delete() { throw new Error('Not implemented'); }
}