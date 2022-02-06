import { Templator } from "../../utils/Template-engine/templater";
import { template } from "./profile.tmpl";

import './profile.css';

const profileTmpl = new Templator(template);

class ProfilePage {

	render() {
		return profileTmpl.getNode({
			profileSvgClass: 'profile-svg'
		});
	}
}

export { ProfilePage };
