export const template = `
	<main class="main">
		<div class="signup-wrapper">
			<div class="auth">
				<h2 class="auth__title signup__title">{% titleText %}</h2>
				<form class="auth__form">
					<div class="form__wrapper">{% inputs %}</div>
					{% button %}
					{% linkButton %}
				</form>
			</div>
		</div>
	</main>
`;