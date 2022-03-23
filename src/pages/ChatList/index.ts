import { ChatList } from './ChatList';
import { withUser } from '../../HOC/withUser';
import Router from '../../utils/Routing/Router';
import { Block } from '../../utils/Block/Block';

function withRouter(Component: typeof Block) {
	return class extends Component {
		constructor(props: Record<string, any>) {
			super({ ...props, route: new Router() });
		}
	};
}

export default withRouter(withUser(ChatList));
