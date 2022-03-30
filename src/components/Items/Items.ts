import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
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

	componentDidUpdate(
		oldProps: Record<string, any>,
		newProps: Record<string, any>,
	): boolean {
		return !isEqual(oldProps, newProps);
	}

	render() {
		return this.compile(itemTmpl, { ...this.props });
	}
}

export { Items };
