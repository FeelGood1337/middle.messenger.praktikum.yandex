export const template = `
	<main class="main">
		<div class="profile">
			<div class="profile__content">
				<section class="section">
					{% backBtn %}				
				</section>
				<div class="profile-paper">
					<div class="profile-paper__content">
						<div class="profile-paper__avatar-wrapper">
							{% avatar %}
						</div>
						<div class="profile-paper__fields-wrapper">
							<div class="signup-wrapper">
								<div class="auth">
									{% title %}
									{% form %}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
`;
