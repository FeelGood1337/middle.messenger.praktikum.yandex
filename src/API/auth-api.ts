import { BaseAPI } from './base-api';

class AuthAPI extends BaseAPI {
	_url: string;
	constructor() {
		super();
		this._url = `${this._baseURL}/auth/`;
	}

	signup(body: Record<string, string>): Promise<XMLHttpRequest> {
		const options = {
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};
		const finalRoute = `${this._url}signup`;

		return this._http
			.post(finalRoute, options)
			.then((res: any) => this.getResponse(res));
	}

	signin(body: Record<string, string>): Promise<XMLHttpRequest> {
		const options = {
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};
		const finalRoute = `${this._url}signin`;

		return this._http
			.post(finalRoute, options)
			.then((res: any) => this.getResponse(res));
	}

	logout(): Promise<XMLHttpRequest> {
		const options = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const finalRoute = `${this._url}logout`;

		return this._http
			.post(finalRoute, options)
			.then((res: any) => this.getResponse(res));
	}
}

export { AuthAPI };
