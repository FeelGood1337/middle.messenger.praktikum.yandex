import router from '../router';
import { AuthAPI } from '../API/auth-api';
import { chatController, userController } from '.';

class AuthController {
	private authApi: AuthAPI;
	constructor() {
		this.authApi = new AuthAPI();
	}

	async signIn(data: Record<string, string>): Promise<void> {
		await this.authApi.signin(data);
		await userController.getUser();
		await chatController.getChat();
		await router.go('/messenger');
	}

	async signUp(data: Record<string, string>): Promise<void> {
		await this.authApi.signup(data);
		await userController.getUser();
		await chatController.getChat();
		await router.go('/messenger');
	}

	async logout(): Promise<void> {
		await this.authApi
			.logout()
			.then(() => router.go('/'))
			.catch(() => router.go('/error'));
	}
}

export default new AuthController();
