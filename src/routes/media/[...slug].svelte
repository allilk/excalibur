
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
	import RenderSingle from '../../components/RenderSingle.svelte';

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

<RenderSingle promise={promise}></RenderSingle>