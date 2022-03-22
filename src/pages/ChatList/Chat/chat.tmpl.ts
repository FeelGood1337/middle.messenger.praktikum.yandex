// export const template = `
// 	<main class="main">
// 		<div class="chat">
// 			<div class="chat__content">
// 				<section class="section-chat-list">
// 					<div class="chat-list__controlls">
// 						<button class="chat-add-btn">
// 							<img class="chat-add-btn__img" src="{% linkButtonAddChat %}" alt="add new chat"/>
// 						</button>
// 						<div class="modal" id="createChatModal">
// 							<div class="modal-wrapper modal-wrapper__chat-create">
// 								<form class="auth__form auth__form_chat" novalidate="true">
// 									{% modalTitle %}
// 									{% modalInput %}
// 									{% modalBtn %}
// 								</form>
// 							</div>
// 						</div>
// 						{% linkButton %}
// 					</div>
// 					<input type="text" class="input search" placeholder="Поиск">
// 					<div id="chats-wrapper">
// 						<ul class="chat-items" id="list">
// 							{% chatItems %}
// 						</ul>
// 					</div>
// 				</section>
// 				<section class="message">
// 					<div class="message-main">
// 						<div class="message-header">
// 							<div class="avatar-wrapper">
// 								{% avatarMini %}
// 								<span class="message-header__name">{% name %}</span>
// 							</div>
// 							<button class="message-header__menu">
// 								<img
// 									class="kebab-img"
// 									src="{% kebab %}"
// 									alt="kebab menu"
// 								/>
// 							</button>
// 						</div>
// 						<div class="message-body"></div>
// 						<div class="message-footer">
// 							<form class="message-form">
// 								<button class="message-form__clip">
// 									<img
// 										class="clip-img"
// 										src="{% clip %}"
// 										alt="clip btn"
// 									/>
// 								</button>
// 								<input
// 									type="text"
// 									name="message"
// 									class="input control-panel__input"
// 									placeholder="Сообщение"
// 								/>
// 								<button class="message-form__send">
// 									<img
// 										class="send-img"
// 										src="{% send %}"
// 										alt="send message"
// 									/>
// 								</button>
// 							</form>
// 						</div>
// 					</div>
// 				</section>
// 			</div>
// 		</div>
// 	</main>
// `;

export const template = `
	<div class="message-main">
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
`;
