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

class Button implements IButton {

	props: TProps;

	constructor(props: TProps) {
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
			disabled: isDisabled ? 'disabled' : '',
		}).getNode() as HTMLButtonElement;
	}

}

export {
	Button
};