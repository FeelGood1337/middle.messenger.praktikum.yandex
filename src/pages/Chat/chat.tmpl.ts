export const template: string = `
	<main class="main">
		<div class="chat">
			<div class="chat__content">
				<section class="section-chat-list">
					{% linkButton %}
					{% serch %}
					<ul class="chat-items">{% items %}</ul>
				</section>
				<section class="message">
					<div class="message-header">
						<div class="avatar-wrapper">
							{% avatarMini %}
							<span class="message-header__name">{% name %}</span>
						</div>
						<button class="message-header__menu">{% menu %}</button>
					</div>
					<div class="message-body"></div>
					<div class="message-footer">
						<form class="message-form">
							<button class="message-form__more">{% more %}</button>
							{% input %}
							<button class="message-form__send">{% send %}</button>
						</form>
					</div>
				</section>
			</div>
		</div>
	</main>
`;