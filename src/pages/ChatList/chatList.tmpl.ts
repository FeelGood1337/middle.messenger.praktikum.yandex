export const template = `
	<main class="main">
		<div class="chat">
			<div class="chat__content">
				<section class="section-chat-list">
					<div class="chat-list__controlls">
						<button class="chat-add-btn">
							<img class="chat-add-btn__img" src="{% linkButtonAddChat %}" alt="add new chat"/>
						</button>
						<div class="modal" id="createChatModal">
							<div class="modal-wrapper modal-wrapper__chat-create">
								<form class="auth__form auth__form_chat" novalidate="true">
									{% modalTitle %}
									{% modalInput %}
									{% modalBtn %}
								</form>
							</div>
						</div>
						{% linkButton %}
					</div>
					<input type="text" class="input search" placeholder="Поиск">
					<div id="chats-wrapper">
						<ul class="chat-items" id="list">
							{% chatItems %}
						</ul>
					</div>
				</section>
				<section class="message">
					<div class="message__wrapper" style="display: {% msgDisplay %};"><p class="message__hello">{% startMessage %}</p></div>
					<div class="message-main" style="display: {% mainDisplay %};">
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
							<div class="modalFly" id="kebabMenuModal">
								<div class="modalFly-wrapper modalFly-wrapper__kebab-menu">
									<form class="auth__form auth__form_menu" novalidate="true">
										<button class="add-user__btn">
											<img 
												class="add-user__img"
												src="{% modalAddBtn %}"
												alt="add user"
											/>
											<span class="text">Добавить пользователя</span>
										</button>
										<button class="remove-user__btn">
											<img 
												class="remove-user__img"
												src="{% modalRemoveBtn %}"
												alt="remove user"
											/>
											<span class="text">Удалить пользователя</span>
										</button>
									</form>
								</div>
							</div>
							<div class="modal" id="searchUserModal">
								<div class="modal-wrapper modal-wrapper__chat-create">
									<form class="auth__form auth__form_search" novalidate="true">
										{% modalInputSearch %}
										{% modalAddUsetToChatBtn %}
									</form>
								</div>
							</div>
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
									name="message"
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
					</div>
				</section>
			</div>
		</div>
	</main>
`;
