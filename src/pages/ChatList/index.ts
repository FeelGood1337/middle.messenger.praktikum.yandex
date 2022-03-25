import { ChatList } from './ChatList';
import { withUser } from '../../HOC/withUser';
import { withRouter } from '../../HOC/WithRouter';
import { Block } from '../../utils/Block/Block';

function withChildren(Component: typeof Block) {
	return class extends Component {
		constructor(props: Record<string, any>) {
			console.log(props);
			super({ ...props, name: 'Segey Vlasov' });
		}
	};
}

export default withRouter(withChildren(withUser(ChatList)));
