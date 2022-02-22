import { Block } from '../../utils/Block/Block';
import { template } from './inputWithLabel.tmpl';

import './inputWithLabel.css';


type TProps = {
	className: string;
	labelClassName: string;
	labelText: string;
	labelId: string;
	attributes: string;
	name: string;
	value: string;
}

interface IInputWithLabel {
	props: TProps;
	render(): ChildNode | HTMLElement;
}
class InputWithLabel extends Block implements IInputWithLabel {
	props: TProps;

	constructor(props: TProps) {
		super(props);
		this.props = props;
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

export {
	InputWithLabel
};