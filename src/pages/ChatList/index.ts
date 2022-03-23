import { ChatList } from './ChatList';
import { withUser } from '../../HOC/withUser';
import { withRouter } from '../../HOC/WithRouter';

export default withRouter(withUser(ChatList));
