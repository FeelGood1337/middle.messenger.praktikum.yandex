import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './items.tmpl';

type TProps = {
	items: any;
	className: string;
	events?: {
		click?: (arg?: any) => any;
	};
};

const itemTmpl = new Templator(template);
class Items extends Block {
	props: TProps;

	constructor(props: TProps) {
		super(props);
	}

	render() {
		const { className, items }: TProps = this.props;

		if (Array.isArray(items)) {
			const liList: any[] = [];
			items.map((el) => {
				liList.push(
					this.compile(itemTmpl, {
						className,
						items: el,
					}),
				);
			});
			return liList;
		}

		return this.compile(itemTmpl, {
			className,
			items,
		});
	}
}

export { Items };
