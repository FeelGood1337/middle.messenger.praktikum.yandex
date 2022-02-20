import { ServerErrorPage } from './ServerErrorPage';
import { render } from '../../../utils/renderDOM';

import '../../../index.css';

const serverError = new ServerErrorPage();
render("#body", serverError);
