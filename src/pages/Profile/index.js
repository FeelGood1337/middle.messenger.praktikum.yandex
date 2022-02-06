import { ProfilePage } from "./ProfilePage";

import '../../index.css';

const App = document.getElementById('Chat-app');

const profile = new ProfilePage().render();
App.append(profile);
