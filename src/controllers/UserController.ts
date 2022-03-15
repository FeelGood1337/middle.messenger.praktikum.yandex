import store from '../utils/Store/Store';
import { AuthAPI } from '../API/auth-api';

const authApi = new AuthAPI();

class UserController {
	getUser() {
		authApi.getUser().then((data) => store.set('user', data));
	}
}

export default new UserController();
