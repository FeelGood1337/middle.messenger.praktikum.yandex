import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './items.tmpl';

type TProps = {
	items: any;
	className: string;
}

interface IItems {
	props: TProps;
	render(): ChildNode | HTMLElement | HTMLElement[];
}


const itemTmpl = new Templator(template);
class Items extends Block implements IItems {
	props: TProps;

	constructor(props: TProps) {
		super(props);
		this.props = props;
	}

	render() {
		const { className, items } = this.props;

		if (Array.isArray(items)) {
			const liList: HTMLElement[] = [];
			items.map(el => {
				liList.push(
					itemTmpl.compile({
						className,
						items: el,
					}).getNode()
				)
			});
			return liList;
		}

		return itemTmpl.compile({
			className,
			items,
		}).getNode();
	};
}

export { Items };
