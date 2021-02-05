<script>
	import axios from 'axios';

	const localAPIURL = 'http://localhost:8080';

	let promise = [];
	async function getObjects(){
		axios.get(`${localAPIURL}/api/media`,{
			method: 'get',
			credentials: 'same-origin',
		}).then((resp) => {
			for (let i = 0; i < resp.data.length; i++){
				promise = [...promise, resp.data[i]]
			}
		});

	}
	getObjects()
</script>

<svelte:head>
	<title>milkbox</title>
</svelte:head>

<ul>
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
</ul>