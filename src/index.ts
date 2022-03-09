import router from './router';
import {
	SigninPage,
	SignupPage
} from './pages';

import './index.css';

router
	.use('/', SigninPage)
	.use('/sign-up', SignupPage)
	.start();

