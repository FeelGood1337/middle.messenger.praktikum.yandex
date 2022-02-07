import { Templator } from "../../utils/Template-engine/templater";
import { template } from "./avatar.tmpl";

const avatarTmpl = new Templator(template);

class Avatar {

	constructor(props) {
		this.props = props;
	}

	render() {
		const { link, imgPath } = this.props;

		return avatarTmpl.getNode({
			link,
			imgPath
		});
	}

}

export { Avatar };
