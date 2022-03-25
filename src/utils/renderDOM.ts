import { Block } from './Block/Block';

export function render(query: string, block: Block): void {
	const root = document.querySelector(query) as Element;
	root.innerHTML = '';
	root.appendChild(block.getContent());
}
