import { Button } from './components/Button/Button';
import { Input } from './components/input/Input';

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

App.append(btn);
App.append(input);
