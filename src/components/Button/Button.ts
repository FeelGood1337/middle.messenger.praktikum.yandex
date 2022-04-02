import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './button.tmpl';

import './button.css';

type TProps = {
	text: string;
	className: string;
	isDisabled: boolean;
	events?: {
		click?: (arg?: any) => any;
	};
};

interface IButton {
	props: TProps;
	render(): DocumentFragment;
}

const btnTmpl = new Templator(template);
class Button extends Block implements IButton {
	props: TProps;

	constructor(props: TProps) {
		super(props);
	}

	render() {
		const { isDisabled } = this.props;
		return this.compile(btnTmpl, {
			...this.props,
			disabled: isDisabled ? 'disabled' : '',
		});
		// return btnTmpl
		// 	.compile({
		// 		text,
		// 		className,
		// 		disabled: isDisabled ? 'disabled' : '',
		// 	})
		// 	.getNode();
	}
}

export { Button };
