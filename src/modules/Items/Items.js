import { Templator } from "../../utils/Template-engine/templater";
import { template } from "./items.tmpl";

const itemsTmpl = new Templator(template);

class Items {
	constructor(props) {
		this.props = props;
	}

	render() {

		const { className, items } = this.props;

		if (Array.isArray(items)) {
			const liList = [];
			items.map(el => {
				liList.push(
					itemsTmpl.getNode({
						className,
						items: el
					})
				)
			});
			return liList;
		}

		return itemsTmpl.getNode({
			className,
			items
		});

	};
}

export { Items };
