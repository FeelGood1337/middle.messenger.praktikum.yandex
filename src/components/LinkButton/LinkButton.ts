import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './linkButton.tmpl';

import './linkButton.css';
import isEqual from '../../utils/isEqualProps';

type TProps = {
	text: string;
	className: string;
	href: string;
	svgIcon?: string;
	hasSvgIcon: boolean;
	events?: {
		click?: (arg?: any) => any;
	};
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
	}

	componentDidUpdate(
		oldProps: Record<string, any>,
		newProps: Record<string, any>,
	): boolean {
		return !isEqual(oldProps, newProps);
	}

	render() {
		const { text, className, href, svgIcon, hasSvgIcon } = this.props;
		return this.compile(linkBtnTmpl, {
			text,
			className,
			href,
			svgIcon: hasSvgIcon
				? `<img class="link-btn__svg" src="${svgIcon}" alt="go to settings" />`
				: '<div class="hiden"></div>',
		});
	}
}

export { LinkButton };
