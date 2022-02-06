import { NotFoundPage } from './NotFoundPage';

import '../../../index.css';

const App = document.getElementById('Chat-app');

const notFoundError = new NotFoundPage().render();
App.append(notFoundError);
