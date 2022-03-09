import router from './router';
import {
	SigninPage,
	SignupPage,
	NotFoundPage,
	ServerErrorPage,
	Chat,
	ProfilePage,
} from './pages';

import './index.css';

router
	.use('/', SigninPage)
	.use('/sign-up', SignupPage)
	.use('/messenger', Chat)
	.use('/settings', ProfilePage)
	.use('/error', ServerErrorPage)
	.use('/notfound', NotFoundPage)
	.start();

