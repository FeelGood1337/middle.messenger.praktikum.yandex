import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './button.tmpl';

import './button.css';

type TProps = {
	text: string;
	className: string;
	isDisabled: boolean;
	events?: any;
}

interface IButton {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const btnTmpl = new Templator(template);
class Button extends Block implements IButton {
	props: TProps;

	constructor(props: TProps) {
		super(props);
		this.props = props;
	}

	render() {
		const { text, className, isDisabled } = this.props;
		return btnTmpl.compile({ 
			text,
			className,
			disabled: isDisabled ? 'disabled' : '',
		 }).getNode();
	}

}

export {
	Button
};