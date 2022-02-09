import { ChangeUserInfo } from './ChangeUserInfo';

const App = document.getElementById('Chat-app');

const changeUserInfo = new ChangeUserInfo().render();
App.append(changeUserInfo);
