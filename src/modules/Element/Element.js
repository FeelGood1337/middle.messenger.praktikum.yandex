import { Templator } from "../../utils/Template-engine/templater";
import { template } from "./element.tmpl";

const elementTmpl = new Templator(template);

class Element {
	constructor(props) {
		this.props = props;
	}

	render() {
		const { tag, className, content } = this.props;

		return elementTmpl.getNode({
			tag,
			className,
			content
		});
	}
}

export { Element };