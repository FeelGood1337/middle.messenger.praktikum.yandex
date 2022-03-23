/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Route, TBlockConstructor } from './Route';

interface IRouter {
	rootQuery: string;
	routes: Route[];
	history: History;
	_currentRoute: Route | null;
	_rootQuery: string;
}

class Router implements IRouter {
	_TEMPLATE_REGEXP = /\{(.*?)\}/gi;
	history: History;
	routes: Route[];
	_currentRoute: Route | null;
	static __instance: any;
	_rootQuery: string;
	rootQuery: string;

	constructor(rootQuery?: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery!;

		Router.__instance = this;
	}

	use(pathname: string, block: TBlockConstructor | any): this {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery });

		this.routes.push(route);
		return this;
	}

	start() {
		window.onpopstate = (event: any): void => {
			this._onRoute(event.currentTarget.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	private _onRoute(pathname: string): void {
		const route = this.getRoute(pathname);

		if (!route) {
			this.go('/notfound');
			return;
		}

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	getUrlParam(): Record<string, string> | null {
		const pathArr = window.location.pathname.split('/');
		pathArr.shift();
		return pathArr.length === 2 ? { chatId: pathArr[1] } : null;
	}

	go(pathname: string): void {
		this.history.pushState({ url: pathname }, pathname, pathname);
		this._onRoute(pathname);
	}

	back(): void {
		this.history.back();
	}

	forward(): void {
		this.history.forward();
	}

	protected getRoute(pathname: string): Route | undefined {
		const regExp = this._TEMPLATE_REGEXP;
		return this.routes.find((route) => {
			const args = regExp.exec(route._pathname);
			if (args) {
				return true;
			}
			return route.match(pathname);
		});
	}
}

export default Router;
