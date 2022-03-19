import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './linkButton.tmpl';

import './linkButton.css';

type TProps = {
	text: string;
	className: string;
	href: string;
	svgIcon?: string;
	hasSvgIcon: boolean;
};

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
		const { text, className, href, svgIcon, hasSvgIcon } = this.props;
		return linkBtnTmpl
			.compile({
				text,
				className,
				href,
				svgIcon: hasSvgIcon
					? `<img class="link-btn__svg" src="${svgIcon}" alt="go to settings" />`
					: '<div class="hiden"></div>',
			})
			.getNode();
	}
}

export { LinkButton };
