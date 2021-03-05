<script>
    export let promise;
</script>
<div class="grid grid-cols-5 h-full">
	{#await promise}
    	<p>awaiting...</p>
	{:then promise}
		{#each promise as item}
			<a href="/media/{item._id}">
				{item.name}
			</a>
			<br>
		{/each}
	{:catch error}
		<p>error</p>
	{/await}
</div>