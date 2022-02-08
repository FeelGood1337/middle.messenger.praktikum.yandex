import { ChangeUserPassword } from "./ChangeUserPassword";

const App = document.getElementById('Chat-app');

const changeUserPassword = new ChangeUserPassword().render();
App.append(changeUserPassword);
