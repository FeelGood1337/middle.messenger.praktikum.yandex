import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
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

const linkButton = new Templator(template);

class LinkButton extends Block implements ILinkButton {
	props: TProps;
	constructor(props: TProps) {
		super('a', props);
		this.props = props;
	}

	render() {
		const {
			text,
			className,
			link,
		} = this.props;

		return linkButton.compile({
			text,
			className,
			link,
		}).getNode();
	}
}

export {
	LinkButton
};