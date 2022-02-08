import { SigninPage } from './pages/AuthPage/SigninPage/SigninPage';

import './index.css';

const App = document.getElementById('Chat-app');

const signin = new SigninPage().render();
App.append(signin);
