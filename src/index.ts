import { SigninPage } from './pages/AuthPage/SigninPage/SigninPage';
import { render } from './utils/renderDOM';

import './index.css';

const signin = new SigninPage();
render("#Chat-app", signin);
// setTimeout(() => {
// 	signin.setProps({
// 		titleText: 'NEW TITLE',
// 		events: {
// 			// Названия события точно такие же, как и у первого аргумента addEventListener: 
// 			// click, mouseEnter, ...
// 			click: (event: any) => {
// 			  console.log(event);
// 			},
// 		  },
// 	});
// }, 4000);
