import { SignupPage } from './SignupPage';

const App = document.getElementById('Chat-app');

const signup = new SignupPage().render();
App.append(signup);
