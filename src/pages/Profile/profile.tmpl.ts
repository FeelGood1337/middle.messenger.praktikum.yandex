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
							<div class="modal" id="avatarModal">
								<div class="modal-wrapper">
									<form class="auth__form auth__form_avatar" novalidate="true">
										{% modalTitle %}
										<div class="file-input">
											{% modalInputAvatar %}
											<label 
												class="input-avatar__label" 
												for="avatarInput"
											>
												Выбрать файл на компьютере
												<p class="file-name"></p>
											</label>
										</div>
										{% modalBtn %}
									</form>
								</div>
							</div>
							{% title %}
						</div>
						<div class="profile-paper__fields-wrapper">
							<ul class="fields-items">{% items %}</ul>
							<ul class="btns-items">
								<li class="fields-items__item item">{% btnChangeInfo %}</li>
								<li class="fields-items__item item">{% btnChangePassword %}</li>
								<li class="fields-items__item item">{% btnLogout %}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
`;
