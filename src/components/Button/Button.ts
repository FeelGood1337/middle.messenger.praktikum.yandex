import { Block } from '../../utils/Block/Block';
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
class Button extends Block implements IButton {
	props: TProps;

	constructor(props: TProps) {
		super(props);
		this.props = props;
	}

	render() {
		// const {
		// 	text,
		// 	className,
		// 	isDisabled,
		// } = this.props;

		return this.compile(template, { ...this.props });
	}

}

export {
	Button
};