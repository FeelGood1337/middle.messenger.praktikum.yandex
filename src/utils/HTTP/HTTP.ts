enum METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

type deepObject = { [key: string]: string | deepObject };
type headersStringKey = { [key: string]: string };

type Options = {
	method?: METHOD;
	data?: any;
	body?: any;
	timeout?: number;
	headers?: headersStringKey;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

interface IHTTPTransport {
	ERROR_NEED_METHOD: string;
	getDeepParams(keyName: string, object: deepObject): string;
	queryStringify(data: deepObject): string;
	get(url: string, options?: Options): Promise<XMLHttpRequest>;
	post(url: string, options?: Options): Promise<XMLHttpRequest>;
	put(url: string, options?: Options): Promise<XMLHttpRequest>;
	request(url: string, options?: Options): Promise<unknown>;
}

class HTTPTransport implements IHTTPTransport {
	ERROR_NEED_METHOD = 'Need to specify a method';

	constructor() {
		this.queryStringify = this.queryStringify.bind(this);
		this.request = this.request.bind(this);
	}

	get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: METHOD.GET });
	}

	post(url: string, options: Options): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: METHOD.POST });
	}

	put(url: string, options: Options): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: METHOD.PUT });
	}

	getDeepParams(keyName: string, object: deepObject): string {
		return Object.keys(object).reduce((result, key, index, arr) => {
			const obj = object[key];
			let params = `${keyName}[${key}]=${obj}`;

			if (typeof obj === 'object') {
				params = this.getDeepParams(`${keyName}[${key}]`, obj);
			}
			return `${result}${params}${index < arr.length - 1 ? '&' : ''}`;
		}, '?');
	}

	queryStringify(data: deepObject): string {
		if (typeof data !== 'object') {
			throw new Error('Data not object');
		}

		const keys = Object.keys(data);
		return keys.reduce((result, key, index) => {
			const obj = data[key];
			let param = `${key}=${obj}`;

			if (typeof obj === 'object') {
				param = this.getDeepParams(key, obj);
			}
			return `${result}${param}${index < keys.length - 1 ? '&' : ''}`;
		}, '?');
	}

	request(
		url: string,
		options: Options = { method: METHOD.GET },
	): Promise<XMLHttpRequest> {
		const { headers = {}, method, body, timeout = 5000 } = options;
		return new Promise((resolve: any, reject: any) => {
			if (!method) {
				reject(this.ERROR_NEED_METHOD);
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHOD.GET;

			xhr.open(
				method,
				isGet && !!body ? `${url}${this.queryStringify(body)}` : url,
			);

			xhr.withCredentials = true;
			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});
			xhr.onload = () => resolve(xhr);
			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.timeout = timeout;
			xhr.ontimeout = reject;
			if (isGet || !body) {
				xhr.send();
			} else {
				xhr.send(body);
			}
		});
	}
}

export { HTTPTransport };
