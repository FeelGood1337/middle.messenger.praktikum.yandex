export const template = `
	<main class="main signin-main">
		<div class="auth-wrapper">
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
