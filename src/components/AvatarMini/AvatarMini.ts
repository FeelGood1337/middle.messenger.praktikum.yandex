import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './avatarMini.tmpl';

// import './avatarMini.css';

type TProps = {
	imgPath: string;
	width: string;
	height: string;
}

interface IAvatarMini {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const avatarMiniTmpl = new Templator(template);

class AvatarMini extends Block implements IAvatarMini {
	props: TProps;

	constructor(props: TProps) {
		super(props);
		this.props = props;
	}

	render() {
		return avatarMiniTmpl.compile({ ...this.props }).getNode();
	}
}

export { AvatarMini };
