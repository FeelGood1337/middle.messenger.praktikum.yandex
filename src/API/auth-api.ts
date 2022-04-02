import { BaseAPI } from './base-api';

interface ISingin {
	login: string;
	password: string;
}
interface ISignup {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

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

	getUser(): Promise<any> {
		const finalRoute = `${this._url}user`;

		return this._http
			.get(finalRoute)
			.then((res: any) => this.getResponseWithParse(res));
	}
}

export { AuthAPI, ISingin, ISignup };
