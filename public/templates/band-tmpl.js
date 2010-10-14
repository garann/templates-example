<div class="band-info">
	<img src="/images/${photo}" alt="${bandName}" />
	<h2>${bandName}</h2>
	{{each members}}
		<span class="band-member">
			${$value.name} - ${$value.instrument}
		</span>
	{{/each}}
	{{if single}}
		<a href="${single.url}">Download "${single.title}"</a>
	{{/if}}
</div>	