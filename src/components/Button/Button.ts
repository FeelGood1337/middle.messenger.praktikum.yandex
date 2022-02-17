import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './button.tmpl';

import './button.css';

type TProps = {
	text: string;
	className: string;
	isDisabled: boolean;
}

interface IButton {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const button = new Templator(template);

class Button extends Block implements IButton {
	props: TProps;

	constructor(props: TProps) {
		super('button', props);
		this.props = props;
	}

	render() {
		const {
			text,
			className,
			isDisabled,
		} = this.props;

		return button.compile({
			text,
			className,
			disabled: isDisabled ? 'disable' : '', // бага при фелсе
		}).getNode();
	}

}

export {
	Button
};