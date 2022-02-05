export const template = `
	<div class="inner">
		<input 
			class="input {% className %}" 
			{% attributes %} 
			name="{% name %}" 
			{% value %} 
		/>
		<label 
		class="label" 
		for="{% labelId %}" 
		>
			{% labelText %}
		</label>
	</div>
`;