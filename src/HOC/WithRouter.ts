/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Block } from '../utils/Block/Block';
import Router from '../utils/Routing/Router';

export function withRouter(Component: typeof Block) {
	return class extends Component {
		constructor(props: Record<string, any>) {
			super({ ...props, router: new Router() });
		}
	};
}
