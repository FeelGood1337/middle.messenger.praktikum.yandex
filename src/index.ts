import router from './router';
import {
	SigninPage,
	SignupPage,
	NotFoundPage,
	Chat,
	ProfilePage,
} from './pages';

import './index.css';

router
	.use('/', SigninPage)
	.use('/sign-up', SignupPage)
	.use('/messenger', Chat)
	.use('/settings', ProfilePage)
	.use('/notfound', NotFoundPage)
	.start();

