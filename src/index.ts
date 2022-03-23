import router from './router';
import {
	SigninPage,
	SignupPage,
	NotFoundPage,
	ServerErrorPage,
	// Chat,
	ChatList,
	ProfilePage,
	ChangeUserInfo,
	ChangeUserPassword,
} from './pages';

import './index.css';
import { chatController, userController } from './controllers';

document.addEventListener('DOMContentLoaded', async () => {
	router
		.use('/', SigninPage)
		.use('/sign-up', SignupPage)
		.use('/settings', ProfilePage)
		.use('/error', ServerErrorPage)
		.use('/notfound', NotFoundPage)
		.use('/settings/change-user-info', ChangeUserInfo)
		.use('/settings/change-user-password', ChangeUserPassword)
		.use('/messenger/{chatId}', ChatList)
		.use('/messenger', ChatList);

	try {
		await userController.getUser();
		await chatController.getChat();
	} catch (error) {
		console.log(error);
	}

	router.start();
});
