import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './element.tmpl';

type TProps = {
	tag: string;
	className: string;
	content: boolean;
}

interface IElement {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const elementTmpl = new Templator(template);

class Element extends Block implements IElement {
  props: TProps;

  constructor(props: TProps) {
    super(props.tag, props);
    this.props = props;
  }

  render() {
    const { tag, className, content } = this.props;

    return elementTmpl.compile({
      tag,
      className,
      content,
    }).getNode();
  }
}

export { Element };
