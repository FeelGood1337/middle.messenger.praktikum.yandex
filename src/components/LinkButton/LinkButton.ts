import { Block } from '../../utils/Block/Block';
import { template } from './linkButton.tmpl';

import './linkButton.css';

type TProps = {
	text: string;
	className: string;
	link: string;
}

interface ILinkButton {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

class LinkButton extends Block implements ILinkButton {
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
	LinkButton
};