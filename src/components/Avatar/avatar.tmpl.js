export const template = `
	<div class="avatar">
		<a class="avatar__link" aria-label="Сменить аватар" href="{% link %}">
			<img 
				class="avatar__img" 
				src="{% imgPath %}"
				alt="Avatar" 
				width="130"
				height="130"
			/>
		</a>
	</div>
`;