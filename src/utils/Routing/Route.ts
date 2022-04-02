/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { render } from '../renderDOM';
import { Block } from '../Block/Block';
import trim from '../trim';

type TBlockConstructor = new (props?: Record<string, string | boolean>) => Block;

class Route {
	TEMPLATE_REGEXP = /\{(.*?)\}/gi;
	_pathname: string;
	_params: string[];
	_regexp: RegExp;
	_blockClass: TBlockConstructor;
	_block: Block | null;
	_props: Record<string, any>;

	constructor(pathname: string, view: TBlockConstructor, props: Record<string, any>) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
		this._params = this._pathname.match(this.TEMPLATE_REGEXP) || [];
		this._regexp = new RegExp(
			'^' + this._pathname.replace(this.TEMPLATE_REGEXP, '(.*)') + '$',
		);
	}

	navigate(pathname: string): void {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	match(pathname: string): boolean {
		return this._regexp.test(pathname);
	}

	getParams(pathname: string) {
		const values = (pathname.match(this._regexp) || []).slice(1);
		return this._params.reduce((params: any, param: string, i: number) => {
			params[trim(param, '{}')] = values[i];

			return params;
		}, {});
	}

	render(): void {
		this._block = new this._blockClass();
		render(this._props.rootQuery, this._block);
	}
}

export { Route, TBlockConstructor };
