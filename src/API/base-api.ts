import { HTTPTransport } from '../utils/HTTP/HTTP';
import { API_URL } from '../constants';

export abstract class BaseAPI {
	_baseURL: string;
	_http: HTTPTransport;
	constructor() {
		this._baseURL = API_URL;
		this._http = new HTTPTransport();
	}

	protected getResponse(res: XMLHttpRequest): Promise<XMLHttpRequest> | XMLHttpRequest {
		if (res.status === 200) {
			return res;
		}

		return Promise.reject(res);
	}

	protected getResponseWithParse(
		res: XMLHttpRequest,
	): Promise<XMLHttpRequest> | XMLHttpRequest {
		if (res.status === 200) {
			return JSON.parse(res.response);
		}

		return Promise.reject(res);
	}
}
