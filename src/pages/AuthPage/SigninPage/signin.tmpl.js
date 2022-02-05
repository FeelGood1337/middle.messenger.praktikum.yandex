export const template = `
	<main class="main">
		<div class="auth-wrapper">
			<div class="auth">
				<h2 class="auth__title">{% titleText %}</h2>
				<form class="auth__form">
					{% inputs %}
					{% button %}
					{% linkButton %}
				</form>
			</div>
		</div>
	</main>
`;