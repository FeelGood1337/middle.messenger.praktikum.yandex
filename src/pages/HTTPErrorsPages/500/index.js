import { ServerErrorPage } from "./ServerErrorPage";

const App = document.getElementById('Chat-app');

const serverError = new ServerErrorPage().render();
App.append(serverError);
