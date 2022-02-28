export const template: string = `
	<main class="main">
		<div class="chat">
			<div class="chat__content">
				<section class="section-chat-list">
					{% linkButton %}
					<input type="text" class="input search" placeholder="Поиск">
					<ul class="chat-items">{% items %}</ul>
				</section>
				<section class="message">
					<div class="message-header">
						<div class="avatar-wrapper">
							{% avatarMini %}
							<span class="message-header__name">{% name %}</span>
						</div>
						<button class="message-header__menu">
							<img 
								class="kebab-img"
								src="{% kebab %}"
								alt="kebab menu"
							/>
						</button>
					</div>
					<div class="message-body"></div>
					<div class="message-footer">
						<form class="message-form">
							<button class="message-form__clip">
								<img 
									class="clip-img"
									src="{% clip %}"
									alt="clip btn"
								/>
							</button>
							<input
								type="text"
								class="input control-panel__input"
								placeholder="Сообщение"
							/>
							<button class="message-form__send">
								<img 
									class="send-img"
									src="{% send %}"
									alt="send message"
								/>
							</button>
						</form>
					</div>
				</section>
			</div>
		</div>
	</main>
`;