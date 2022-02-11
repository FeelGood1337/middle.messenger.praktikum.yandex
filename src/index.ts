import { SigninPage } from './pages/AuthPage/SigninPage/SigninPage';

import './index.css';

const App: HTMLDivElement = document.getElementById('Chat-app') as HTMLDivElement;

const signin: HTMLElement = new SigninPage().render() as HTMLElement;
App.append(signin);
