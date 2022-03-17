import { ProfilePage } from './ProfilePage';
import { withStore } from '../../utils/Store/Store';

const withUser = withStore((state) => ({ ...state.user }));
export default withUser(ProfilePage);
