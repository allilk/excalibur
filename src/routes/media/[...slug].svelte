
<script context="module">
	export async function preload(page, media_id) {
		const { slug } = page.params;
		media_id = slug;
		return { media_id };
	}
</script>
<script>
    export let media_id;
	import axios from 'axios';

	const localAPIURL = 'http://localhost:8080';

	let promise = [];
	async function getObjects(){
		axios.get(`${localAPIURL}/api/media/${media_id}`,{
			method: 'get',
			credentials: 'same-origin',
		}).then((resp) => {
			promise = [...promise, resp.data]
		});
	}
	getObjects()
</script>

<svelte:head>
	<title>milkbox</title>
</svelte:head>

<div class="grid grid-cols-5 h-full">
	{#await promise}
    	<p>awaiting...</p>
	{:then promise}
		{#each promise as item}
			<div class="place-self-center invisible md:visible md:col-span-1">
				<img src="{item.cover_picture}" alt="No resource found." >
			</div>
			<div class="col-span-5 md:col-span-4">
				<div class="text-xl py-6">
					{item.name} ({item.year})
				</div>
				<div>
					<b>Format Type:</b> {item.type} <br>
					<b>UPC:</b> {item.upc}
				</div>
	
				<!-- Video Properties -->
				<div>
					<b>Resolution:</b> {item.video.resolution} <br>
					<b>Codec:</b> {item.codec} <br>
				</div>
				<!-- Audio Properties -->
				<div>
					<b>Audio Tracks:</b>
					<div class="ml-4 mt-0">
						{#each item.audio as audio}
							{audio}<br>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	{:catch error}
		<p>error</p>
	{/await}
</div>