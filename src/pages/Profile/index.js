import { ProfilePage } from './ProfilePage';

const App = document.getElementById('Chat-app');

const profile = new ProfilePage().render();
App.append(profile);
