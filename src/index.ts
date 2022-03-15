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

router
	.use('/', SigninPage)
	.use('/sign-up', SignupPage)
	.use('/messenger', Chat)
	.use('/settings', ProfilePage)
	.use('/error', ServerErrorPage)
	.use('/notfound', NotFoundPage)
	.use('/change-user-info', ChangeUserInfo)
	.use('/change-user-password', ChangeUserPassword)
	.start();
