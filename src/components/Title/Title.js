import { Templator } from "../../utils/Template-engine/templater";
import { template } from "./title.tmpl";

const titleTmpl = new Templator(template);

class Title {
	constructor(props) {
		this.props = props;
	}

	render() {

		const { tag, className, text } = this.props;

		return titleTmpl.getNode({
			tag,
			className,
			text
		});
	}

}

export { Title };