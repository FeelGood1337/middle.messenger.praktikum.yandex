import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { LinkButton } from './components/LinkButton/LinkButton';

const App = document.getElementById('Chat-app');
const btn = new Button({
	text: 'Войти',
	className: 'btn btn__main',
}).render();
const input = new Input({
	className: 'input__auth',
	attributes: 'placeholder="Login"',
	name: 'login',
	value: '',
}).render();
const linkButton = new LinkButton({
	text: 'Регистрация',
	className: '',
}).render();

App.append(btn);
App.append(input);
App.append(linkButton);
