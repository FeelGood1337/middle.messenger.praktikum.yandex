import { NotFoundPage } from './NotFoundPage';
import { render } from '../../../utils/renderDOM';

import '../../../index.css';

const notFoundError = new NotFoundPage();
render("#Chat-app", notFoundError);
