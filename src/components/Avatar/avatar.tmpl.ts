export const template: string = `
	<div class="avatar">
		<a class="avatar__link" href="{% link %}">
			<img 
				class="avatar__img" 
				src="{% imgPath %}"
				alt="Avatar" 
				width="130"
				height="130"
			/>
		</a>
		<div class="avatar-edit">
			<div class="avatar-icon">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.9998 15.2C13.7671 15.2 15.1998 13.7673 15.1998 12C15.1998 10.2327 13.7671 8.8 11.9998 8.8C10.2325 8.8 8.7998 10.2327 8.7998 12C8.7998 13.7673 10.2325 15.2 11.9998 15.2Z" fill="white"/>
					<path d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z" fill="white"/>
				</svg>			
			</div>
		</div>
	</div>
`;