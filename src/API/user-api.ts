import { BaseAPI } from './base-api';

class UserAPI extends BaseAPI {
	_url: string;
	constructor() {
		super();
		this._url = `${this._baseURL}/user/`;
	}

	avatar(body: FormData): Promise<XMLHttpRequest> {
		const options = {
			body,
		};
		const finalRoute = `${this._url}profile/avatar`;

		return this._http
			.put(finalRoute, options)
			.then((res: any) => this.getResponseWithParse(res));
	}
}

export { UserAPI };
