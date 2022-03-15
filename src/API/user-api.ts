import { BaseAPI } from './base-api';

class UserAPI extends BaseAPI {
	_url: string;
	constructor() {
		super();
		this._url = `${this._baseURL}/user/`;
	}

	avatar(body: FormData): Promise<any> {
		const options = {
			body,
		};
		const finalRoute = `${this._url}profile/avatar`;

		return this._http
			.put(finalRoute, options)
			.then((res: any) => this.getResponseWithParse(res));
	}

	profile(body: Record<string, string>): Promise<any> {
		const options = {
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};
		const finalRoute = `${this._url}profile`;

		return this._http
			.put(finalRoute, options)
			.then((res: any) => this.getResponseWithParse(res));
	}

	changePassword(body: Record<string, string>): Promise<any> {
		const options = {
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		};
		const finalRoute = `${this._url}password`;

		return this._http
			.put(finalRoute, options)
			.then((res: any) => this.getResponseWithParse(res));
	}
}

export { UserAPI };
