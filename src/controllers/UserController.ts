import store from '../utils/Store/Store';
import router from '../router';
import { AuthAPI } from '../API/auth-api';
import { UserAPI } from '../API/user-api';
import { showSpinner, hideSpinner } from '../utils/spinner';

interface IUser {
	id: number;
	avatar: string;
	display_name: string;
	email: string;
	first_name: string;
	second_name: string;
	login: string;
	phone: string;
}

const authApi = new AuthAPI();
const userApi = new UserAPI();

class UserController {
	getUser(): Promise<IUser | any> {
		return authApi
			.getUser()
			.then((user: IUser): IUser => {
				store.set('user', user);
				return user;
			})
			.catch((err) => {
				const { status } = err;

				if (status === 401) {
					router.go('/');
				}
			});
	}

	updateAvatar(data: FormData): Promise<IUser> {
		showSpinner();
		return userApi
			.avatar(data)
			.then((user: IUser): IUser => {
				store.set('user', user);
				return user;
			})
			.finally(() => {
				hideSpinner();
			});
	}

	updateProfile(data: Record<string, string>) {
		showSpinner();
		return userApi
			.profile(data)
			.then((user: IUser): IUser => {
				store.set('user', user);
				return user;
			})
			.finally(() => {
				hideSpinner();
			});
	}
}

export default new UserController();
