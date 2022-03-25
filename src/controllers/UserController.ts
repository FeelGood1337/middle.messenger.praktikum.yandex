import store, { IUser } from '../utils/Store/Store';
import router from '../router';
import { AuthAPI } from '../API/auth-api';
import { UserAPI } from '../API/user-api';

const authApi = new AuthAPI();
const userApi = new UserAPI();

class UserController {
	async getUser(): Promise<void> {
		await authApi
			.getUser()
			.then((user: IUser): void => {
				store.set('user', user);
			})
			.catch((err) => {
				const { status } = err;

				if (status === 401) {
					router.go('/');
				}
			});
	}

	async updateAvatar(data: FormData): Promise<void> {
		await userApi
			.avatar(data)
			.then((user: IUser): void => {
				store.set('user', user);
			})
			.catch((err) => {
				const { status } = err;

				if (status === 500) {
					router.go('/error');
				}
			});
	}

	async updateProfile(data: Record<string, string>): Promise<void> {
		await userApi
			.profile(data)
			.then((user: IUser): void => {
				store.set('user', user);
			})
			.then(() => router.go('/settings'))
			.catch((err) => {
				const { status } = err;

				if (status === 500) {
					router.go('/error');
				}
			});
	}

	async searchUser(body: Record<string, string>): Promise<any> {
		return await userApi
			.searchUser(body)
			.then((res) => res)
			.catch((err) => {
				const { status } = err;

				if (status === 500) {
					router.go('/error');
				}
			});
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
