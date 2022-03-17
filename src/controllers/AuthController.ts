import router from '../router';
import { AuthAPI, ISingin, ISignup } from '../API/auth-api';

class AuthController {
	private authApi: AuthAPI;
	constructor() {
		this.authApi = new AuthAPI();
	}

	async signIn(data: Record<string, string>) {
		await this.authApi.signin(data);
	}

	async signUp(data: Record<string, string>) {
		await this.authApi.signup(data);
	}

	logout(): void {
		this.authApi
			.logout()
			.then(() => router.go('/'))
			.catch(() => router.go('/error'));
	}
}

export default new AuthController();
