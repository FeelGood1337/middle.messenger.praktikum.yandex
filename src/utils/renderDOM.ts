import { IBlock } from "./Block/Block";

export function render(query: string, block: IBlock): Element {
	const root = document.querySelector(query) as Element;
	root.appendChild(block.getContent());

	block.dispatchComponentDidMount();

	return root;
}
