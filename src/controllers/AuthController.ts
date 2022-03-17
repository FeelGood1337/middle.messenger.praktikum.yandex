import router from '../router';
import { AuthAPI, ISingin, ISignup } from '../API/auth-api';

class AuthController {
	private authApi: AuthAPI;
	constructor() {
		this.authApi = new AuthAPI();
	}

	async signIn(data: Record<string, string>): Promise<void> {
		await this.authApi
			.signin(data)
			.then(() => router.go('/messenger'))
			.catch((err) => {
				const { status } = err;

				if (status === 500) {
					router.go('/error');
				}
			});
	}

	async signUp(data: Record<string, string>): Promise<void> {
		await this.authApi
			.signup(data)
			.then(() => router.go('/messenger'))
			.catch((err) => {
				const { status } = err;

				if (status === 500) {
					router.go('/error');
				}
			});
	}

	async logout(): Promise<void> {
		await this.authApi
			.logout()
			.then(() => router.go('/'))
			.catch(() => router.go('/error'));
	}
}

export default new AuthController();
