import router from '../router';
import { AuthAPI } from '../API/auth-api';

const authApi = new AuthAPI();

class AuthController {
	logout(): Promise<any> {
		return authApi
			.logout()
			.then(() => router.go('/'))
			.catch(() => router.go('/error'));
	}
}

export default new AuthController();
