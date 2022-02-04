import { Button } from './components/Button/Button';

const App = document.getElementById('Chat-app');
const div = document.createElement('div');
const btn = new Button({
	text: 'Войти',
	className: 'btn btn__main',
}).render();

App.append(btn);
