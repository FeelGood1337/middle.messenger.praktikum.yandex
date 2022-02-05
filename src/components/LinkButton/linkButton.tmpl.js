export const template = `
	<a class="link-btn {% className %}" href="#{% link %}">
		<span class="link-btn__text">{% text %}</span>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M4 10.707L18 10.707L18 12.707L4 12.707L4 10.707Z" fill="#26A69A"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5859 11.7071L12.293 7.41421L13.7072 6L19.4143 11.7071L13.7072 17.4142L12.293 16L16.5859 11.7071Z" fill="black"/>
		</svg>
	</a>
`;