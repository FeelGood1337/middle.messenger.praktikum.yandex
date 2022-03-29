export const template = `
	<div class="message-main" style="display: {% mainDisplay %};">
		<div class="message-header">
			<div class="avatar-wrapper">
				{% avatarMini %}
				{% chatName %}
			</div>
			{% addUserKebab %}
			<div class="modalFly" id="kebabMenuModal">
				<div class="modalFly-wrapper modalFly-wrapper__kebab-menu">
					<form class="auth__form auth__form_menu" novalidate="true">
						{% addUser %}
						{% removeUser %}
					</form>
				</div>
			</div>
			<div class="modal" id="searchUserModal">
				<div class="modal-wrapper modal-wrapper__chat-create">
					<form class="auth__form auth__form_search" novalidate="true">
						{% modalInputSearch %}
						{% serchedUserList %}
						{% modalAddUsetToChatBtn %}
					</form>
				</div>
			</div>
		</div>
		<div class="message-body"></div>
		<div class="message-footer">
			<form class="message-form">
				{% clipBtn %}
				<input
					type="text"
					name="message"
					class="input control-panel__input"
					placeholder="Сообщение"
				/>
				{% sendBtn %}
			</form>
		</div>
	</div>
`;
