import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './avatar.tmpl';

import './avatar.css';

type TProps = {
	link: string;
	imgPath: string;
}

interface IAvatar {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const avatarTmpl = new Templator(template);
class Avatar extends Block implements IAvatar {
	props: TProps;

	constructor(props: TProps) {
		super(props);
		this.props = props;
	}

	render() {
		return avatarTmpl.compile({ ...this.props }).getNode();
	}

}

export { Avatar };
