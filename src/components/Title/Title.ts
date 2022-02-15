import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './title.tmpl';

const titleTmpl = new Templator(template);

type TProps = {
	text: string;
	className: string;
	tag: string;
}

interface ITitle {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

class Title extends Block implements ITitle {
	props: TProps;
	constructor(props: TProps) {
		super(props.tag, props);
		this.props = props;
	}

	render() {
		const { tag, className, text } = this.props;
		return titleTmpl.compile({
			tag,
			className,
			text,
		}).getNode();
	}

}

export { Title };
