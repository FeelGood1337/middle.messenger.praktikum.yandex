// export const template = `
// 	<main class="main">
// 		<div class="chat">
// 			<div class="chat__content">
// 				<section class="section-chat-list">
// 					{% linkButton %}
// 					<input type="text" class="input search" placeholder="Поиск">
// 					<ul class="chat-items">
// 						<li class="item">
// 							<img
// 								class="avatar-svg__item"
// 								src="{% avaChatPath %}"
// 								alt="avatar chat list"
// 								width="48px"
// 								height="48px"
// 							/>
// 							<div class="item__content-wrapper">
// 								<div class="item__name">Sergey Vlasov</div>
// 								<p class="item__para">
// 									Cегодня проходил курс по JS и столкнулся с проблемой, но...
// 								</p>
// 							</div>
// 							<div class="item__date-wrapper">
// 								<div class="date">1 мая 2021</div>
// 							</div>
// 						</li>
// 					</ul>
// 				</section>
// 				<section class="message">
// 					<div class="message-header">
// 						<div class="avatar-wrapper">
// 							{% avatarMini %}
// 							<span class="message-header__name">{% name %}</span>
// 						</div>
// 						<button class="message-header__menu">
// 							<img
// 								class="kebab-img"
// 								src="{% kebab %}"
// 								alt="kebab menu"
// 							/>
// 						</button>
// 					</div>
// 					<div class="message-body"></div>
// 					<div class="message-footer">
// 						<form class="message-form">
// 							<button class="message-form__clip">
// 								<img
// 									class="clip-img"
// 									src="{% clip %}"
// 									alt="clip btn"
// 								/>
// 							</button>
// 							<input
// 								type="text"
// 								name="message"
// 								class="input control-panel__input"
// 								placeholder="Сообщение"
// 							/>
// 							<button class="message-form__send">
// 								<img
// 									class="send-img"
// 									src="{% send %}"
// 									alt="send message"
// 								/>
// 							</button>
// 						</form>
// 					</div>
// 				</section>
// 			</div>
// 		</div>
// 	</main>
// `;

export const template = `
	<main class="main">
		<div class="chat">
			<div class="chat__content">
				<section class="section-chat-list">
					<div class="chat-list__controlls">
						<button class="chat-add-btn">
							<img class="chat-add-btn__img" src="{% linkButtonAddChat %}" alt="add new chat"/>
						</button>
						{% linkButton %}
					</div>
					<input type="text" class="input search" placeholder="Поиск">
					<ul class="chat-items">
						
					</ul>
				</section>
				<section class="message">
					<p>{% startMessage %}</p>
				</section>
			</div>
		</div>
	</main>
`;
