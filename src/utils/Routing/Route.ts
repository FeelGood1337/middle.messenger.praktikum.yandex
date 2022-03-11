import { isEqual } from '../isEqual/isEqual';
import { render } from '../renderDOM';
import { Block } from '../Block/Block';

type TBlockConstructor = new (props?: Record<string, string | boolean>) => Block;

class Route {
	_pathname: string;
	_blockClass: TBlockConstructor;
	_block: Block | null;
	_props: Record<string, any>;

	constructor(pathname: string, view: TBlockConstructor, props: Record<string, any>) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	protected navigate(pathname: string): void {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave(): void {
		if (this._block) {
			this._block.hide();
		}
	}

	match(pathname: string): boolean {
		return isEqual(pathname, this._pathname);
	}

	protected render(): void {
		if (!this._block) {
			this._block = new this._blockClass();
			render(this._props.rootQuery, this._block);
			return;
		}

		this._block.show();
	}
}

export { Route, TBlockConstructor };
