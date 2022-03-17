import store, { IUser } from '../utils/Store/Store';
import router from '../router';
import { AuthAPI } from '../API/auth-api';
import { UserAPI } from '../API/user-api';
import { showSpinner, hideSpinner } from '../utils/spinner';

const authApi = new AuthAPI();
const userApi = new UserAPI();

class UserController {
	async getUser(): Promise<void> {
		await authApi
			.getUser()
			.then((user: IUser): void => {
				showSpinner();
				store.set('user', user);
			})
			.catch((err) => {
				const { status } = err;

				if (status === 401) {
					router.go('/');
				}
			})
			.finally(() => hideSpinner());
	}

	async updateAvatar(data: FormData): Promise<void> {
		await userApi
			.avatar(data)
			.then((user: IUser): void => {
				showSpinner();
				store.set('user', user);
			})
			.finally(() => hideSpinner());
	}

	async updateProfile(data: Record<string, string>): Promise<void> {
		await userApi
			.profile(data)
			.then((user: IUser): void => {
				showSpinner();
				store.set('user', user);
			})
			.then(() => router.go('/settings'))
			.catch((err) => {
				const { status } = err;

				if (status === 500) {
					router.go('/error');
				}
			})
			.finally(() => hideSpinner());
	}

	async changePassword(data: Record<string, string>): Promise<void> {
		await userApi
			.changePassword(data)
			.then(() => router.go('/settings'))
			.catch((err) => {
				const { status } = err;

				if (status === 500) {
					router.go('/error');
				}
			});
	}
}

export default new UserController();
