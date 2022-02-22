import { Block } from '../../utils/Block/Block';
import { template } from './title.tmpl';

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
		super(props);
		this.props = props;
	}

	render() {
		// const { tag, className, text } = this.props;
		
		return this.compile(template, { ...this.props });
	}

}

export { Title };
