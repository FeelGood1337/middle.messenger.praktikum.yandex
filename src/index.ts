import { SigninPage } from './pages/AuthPage/SigninPage/SigninPage';
import { render } from './utils/renderDOM';

import './index.css';

const signin = new SigninPage();
render("#body", signin);
