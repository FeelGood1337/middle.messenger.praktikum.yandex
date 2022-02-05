export const template = `
	<div class="inner">
		<label for="{% labelId %}" class="label">{% labelText %}</label>
		<input 
			class="input {% className %}" 
			{% attributes %} 
			name="{% name %}" 
			{% value %} 
		/>
	</div>
`;