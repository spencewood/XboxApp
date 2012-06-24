<form class="well">
	<label class="checkbox">
		<input type="checkbox" data-setting="voteweekend" {{#if voteweekend}}checked="checked"{{/if}}/> Allow voting and adding games on weekends
	</label>
	<label class="checkbox">
		<input type="checkbox" data-setting="votedaily" {{#if votedaily}}checked="checked"{{/if}} /> Allow voting and adding games more than once per day
	</label>
	<button href="#" id="clearGames" class="confirm btn btn-danger" data-confirm-message="Are you sure you want to clear the game list?">Clear Game List</button>
</form>