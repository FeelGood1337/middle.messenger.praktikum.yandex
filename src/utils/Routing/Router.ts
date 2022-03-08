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

	protected use(pathname: string, block: TBlockConstructor): this {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery });

		this.routes.push(route);
		return this;
	}

	protected start() {
		window.onpopstate = (event: any): void => {
			this._onRoute(event.currentTarget.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	private _onRoute(pathname: string): void {
		const route = this.getRoute(pathname);
		if (!route) {
			return;
		}

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render(route, pathname);
	}

	protected go(pathname: string): void {
		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
	}

	protected back(): void {
		this.history.back();
	}

	protected forward(): void {
		this.history.forward();
	}

	protected getRoute(pathname: string): any {
		return this.routes.find(route => route.match(pathname));
	}
}

export default Router;
