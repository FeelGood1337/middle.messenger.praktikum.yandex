import { SigninPage } from './pages/AuthPage/SigninPage/SigninPage';
import { SignupPage } from './pages/AuthPage/SignupPage/SignupPage';

import './index.css';

const App = document.getElementById('Chat-app');

const signin = new SigninPage().render();
App.append(signin);

// const signup = new SignupPage().render();
// App.append(signup);
