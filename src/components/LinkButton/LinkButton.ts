import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './linkButton.tmpl';

import './linkButton.css';

type TProps = {
	text: string;
	className: string;
}

interface ILinkButton {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const linkBtnTmpl = new Templator(template);

class LinkButton extends Block implements ILinkButton {
	props: TProps;
	constructor(props: TProps) {
		super(props);
		this.props = props;
	}

	render() {
		return linkBtnTmpl.compile({ ...this.props }).getNode();
	}
}

export {
	LinkButton
};