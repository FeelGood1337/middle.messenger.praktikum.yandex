export const template = `
	<div class="inner">
		<label 
			class="label {% labelClassName %}" 
			for="{% labelId %}" 
		>
			{% labelText %}
		</label>
		{% input %}
		<span class="auth__error"></span>
	</div>
`;
