export const template = `
	<main class="main signin-main">
		<div class="auth-wrapper">
			<div class="auth">
				<h2 class="auth__title">{% titleText %}</h2>
				<form class="auth__form">
					<div class="form__wrapper">{% inputs %}</div>
					{% button %}
					{% linkButton %}
				</form>
			</div>
		</div>
	</main>
`;