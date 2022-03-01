import { Chat } from './Chat';
import { render } from '../../utils/renderDOM';

const chat = new Chat();
render("#Chat-app", chat);
