import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
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

const elTmpl = new Templator(template);
class Element extends Block implements IElement {
  props: TProps;

  constructor(props: TProps) {
    super(props);
    this.props = props;
  }

  render() {
    // return this.compile(template, { ...this.props });
    return elTmpl.compile({ ...this.props }).getNode();
  }
}

export { Element };
