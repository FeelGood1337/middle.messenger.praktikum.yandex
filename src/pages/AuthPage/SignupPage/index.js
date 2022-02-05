import { SignupPage } from "./SignupPage";

const App = document.getElementById('signup');

const signup = new SignupPage().render();
App.append(signup);
