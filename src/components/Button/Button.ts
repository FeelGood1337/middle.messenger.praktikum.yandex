import { Block } from '../../utils/Block/Block';
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

		return this.compile(template, {
			text,
			className,
			disabled: isDisabled ? 'disable' : '', // бага при фелсе
		});
	}

}

export {
	Button
};