import { ChangeUserPassword } from "./ChangeUserPassword";
import { render } from "../../../../utils/renderDOM";

const changeUserPassword = new ChangeUserPassword();
render("#Chat-app", changeUserPassword);
