export const template: string = `
	<main class="main">
		<div class="profile">
			<div class="profile__content">
				<section class="section">
					<svg class="{% profileSvgClass %}" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle r="16" transform="matrix(-1 0 0 1 16 16)" fill="#26A69A"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M24 14.707L10 14.707L10 16.707L24 16.707L24 14.707Z" fill="black"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4141 15.7071L15.707 11.4142L14.2928 10L8.58571 15.7071L14.2928 21.4142L15.707 20L11.4141 15.7071Z" fill="white"/>
					</svg>				
				</section>
				<div class="profile-paper">
					<div class="profile-paper__content">
						<div class="profile-paper__avatar-wrapper">
							{% avatar %}
							{% title %}
						</div>
						<div class="profile-paper__fields-wrapper">
							<ul class="fields-items">{% items %}</ul>
							<ul class="btns-items">{% btnItems %}</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
`;