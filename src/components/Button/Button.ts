import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './button.tmpl';

import './button.css';

type TProps = {
	text: string;
	className: string;
	disabled: string;
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
		// return this.compile(template, { ...this.props });
		return btnTmpl.compile({ ...this.props }).getNode();
	}

}

export {
	Button
};