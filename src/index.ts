import { SigninPage } from './pages/AuthPage/SigninPage/SigninPage';
import { render } from './utils/renderDOM';

import './index.css';

const signin = new SigninPage();
render("#Chat-app", signin);
// setTimeout(() => {
// 	signin.setProps({
// 		titleText: 'NEW TITLE',
// 	});
// }, 4000);
