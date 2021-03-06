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

		this._currentRoute = route;
		route.render();
	}

	getParams(): Record<string, string> {
		return this._currentRoute!.getParams(window.location.pathname);
	}

	go(pathname: string): void {
		this.history.pushState({ ...this.getParams() }, pathname, pathname);
		this._onRoute(pathname);
	}

	back(): void {
		this.history.back();
	}

	forward(): void {
		this.history.forward();
	}

	protected getRoute(pathname: string): Route | undefined {
		return this.routes.find((route) => route.match(pathname));
	}
}

export default Router;
