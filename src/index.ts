import router from './router';
import {
	SigninPage,
	SignupPage,
	NotFoundPage,
	ServerErrorPage,
	Chat,
	ProfilePage,
	ChangeUserInfo,
	ChangeUserPassword,
} from './pages';

import './index.css';
import { userController } from './controllers';

document.addEventListener('DOMContentLoaded', async () => {
	router
		.use('/', SigninPage)
		.use('/sign-up', SignupPage)
		.use('/messenger', Chat)
		.use('/settings', ProfilePage)
		.use('/error', ServerErrorPage)
		.use('/notfound', NotFoundPage)
		.use('/change-user-info', ChangeUserInfo)
		.use('/change-user-password', ChangeUserPassword);

	try {
		await userController.getUser();
	} catch (error) {
		console.log(error);
	}

	router.start();
});
