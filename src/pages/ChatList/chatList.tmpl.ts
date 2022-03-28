export const template = `
	<main class="main">
		<div class="chat">
			<div class="chat__content">
				<section class="section-chat-list">
					<div class="chat-list__controlls">
						{% btnAddChat %}
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
						{% chatItems %}
					</div>
				</section>
				<section class="message">
					{% startMessage %}
					{% currentChat %}
				</section>
			</div>
		</div>
	</main>
`;
