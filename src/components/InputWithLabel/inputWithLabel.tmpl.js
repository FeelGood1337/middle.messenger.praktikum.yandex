export const template = `
	<div class="inner">
		<label for="{% labelId %}" class="label signup-label">{% labelText %}</label>
		<input 
			class="input {% className %}" 
			{% attributes %} 
			name="{% name %}" 
			{% value %} 
		/>
	</div>
`;