const template = `
	<input 
		class="input {% className %}"
		{% attributes %}
		placeholder={% placeholder %}
      	name="{% name %}"
      	value="{% value %}"
	/>
`;

export {
	template
};