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
					<ul class="chat-items">
						
					</ul>
				</section>
				<section class="message">
					<div class="message__wrapper"><p class="message__hello">{% startMessage %}</p></div>
				</section>
			</div>
		</div>
	</main>
`;
