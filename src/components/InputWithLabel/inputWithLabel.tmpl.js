export const template = `
	<div class="inner">
		<label 
			class="label {% labelClassName %}" 
			for="{% labelId %}" 
		>
			{% labelText %}
		</label>
		<input 
			class="input {% className %}" 
			{% attributes %} 
			name="{% name %}" 
			{% value %} 
		/>
	</div>
`;