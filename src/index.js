import { Button } from './components/Button/Button';
import { Input } from './components/input/Input';

const App = document.getElementById('Chat-app');
const btn = new Button({
	text: 'Войти',
	className: 'btn btn__main',
}).render();
const input = new Input({
	placeholder: 'Login',
	className: 'input__auth',
	name: 'login',
	value: '1',
}).render();

App.append(btn);
App.append(input);
