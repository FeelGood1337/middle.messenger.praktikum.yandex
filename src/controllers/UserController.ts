import store, { IUser } from '../utils/Store/Store';
import router from '../router';
import { AuthAPI } from '../API/auth-api';
import { UserAPI } from '../API/user-api';
import { showSpinner, hideSpinner } from '../utils/spinner';

const authApi = new AuthAPI();
const userApi = new UserAPI();

class UserController {
	async getUser(): Promise<void> {
		showSpinner();
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
			})
			.finally(() => {
				hideSpinner();
			});
	}

	async updateAvatar(data: FormData): Promise<void> {
		showSpinner();
		await userApi
			.avatar(data)
			.then((user: IUser): void => {
				store.set('user', user);
			})
			.finally(() => {
				hideSpinner();
			});
	}

	updateProfile(data: Record<string, string>) {
		return userApi.profile(data).then((user: IUser): IUser => {
			store.set('user', user);
			return user;
		});
	}
}

export default new UserController();
