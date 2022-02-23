import { Block } from "./Block/Block";

export function render(query: string, block: Block): Element {
	const root = document.querySelector(query) as Element;
	root.appendChild(block.getContent());
	block.dispatchComponentDidMount();

	return root;
}
