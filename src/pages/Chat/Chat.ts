import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './chat.tmpl';

import { LinkButton } from '../../components/LinkButton/LinkButton';

const chatTmpl = new Templator(template);
class Chat extends Block {

	render() {
		
	}
}

export { Chat };
