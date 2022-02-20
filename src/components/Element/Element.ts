import { Block } from '../../utils/Block/Block';
import { template } from './element.tmpl';

type TProps = {
  tag: string;
  className: string;
  content: string;
}

interface IElement {
  props: TProps;
  render(): ChildNode | HTMLElement;
}

class Element extends Block implements IElement {
  props: TProps;

  constructor(props: TProps) {
    super(props.tag, props);
    this.props = props;
  }

  render() {
    const { tag, className, content } = this.props;

    return this.compile(template, {
      tag,
      className,
      content,
    });
  }
}

export { Element };
