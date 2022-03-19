export const template = `
	<main class="main signup-main">
		<div class="signup-wrapper">
			<div class="auth">
				{% title %}
				<form class="auth__form">
					<div class="form__wrapper">{% inputs %}</div>
					{% button %}
					{% linkButton %}
				</form>
			</div>
		</div>
	</main>
`;
