import { Block } from '../../utils/Block/Block';
import { template } from './items.tmpl';

type TProps = {
	items: any;
	className: string;
}

interface IItems {
	props: TProps;
	render(): ChildNode | HTMLElement | HTMLElement[];
}

class Items extends Block implements IItems {
	props: TProps;

	constructor(props: TProps) {
		super('li', props);
		this.props = props;
	}

	render() {
		const { className, items } = this.props;

		return this.compile(template, {
			className,
			items,
		});

	};
}

export { Items };
