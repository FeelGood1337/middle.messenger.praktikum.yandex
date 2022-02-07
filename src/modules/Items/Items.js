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
			items.map((el, i) => {
				liList.push(
					itemsTmpl.getNode({
						className,
						items: el
					})
				)
			});
			console.log(liList);
			return liList;
		}

	};
}

export { Items };
