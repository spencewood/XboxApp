<td>
	{{title}}
</td>
<td>
	{{votes}}
</td>
<td>
	{{#unless owned}}
	<button class="btn vote-action">Vote</button> 
	<button class="btn owned-action">Mark as owned</button>
	<div class="error help-block">

	</div>
	{{/unless}}
</td>