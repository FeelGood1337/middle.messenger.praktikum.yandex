import { Templator } from "../../utils/Template-engine/templater";
import { template } from "./profile.tmpl";

import { Title } from "../../components/Title/Title";

import './profile.css';

const profileTmpl = new Templator(template);

class ProfilePage {

	getTitle() {
		return new Title({
			tag: 'h2',
			className: 'profile-title',
			text: 'Сергей'
		}).render();
	}

	render() {
		return profileTmpl.getNode({
			profileSvgClass: 'profile-svg',
			title: this.getTitle()
		});
	}
}

export { ProfilePage };
