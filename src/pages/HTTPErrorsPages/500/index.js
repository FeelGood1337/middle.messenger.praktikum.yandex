import { ServerErrorPage } from './ServerErrorPage';

import '../../../index.css';

const App = document.getElementById('Chat-app');

const serverError = new ServerErrorPage().render();
App.append(serverError);
