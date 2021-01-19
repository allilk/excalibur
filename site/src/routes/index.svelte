<script>
	
	import { afterUpdate, beforeUpdate } from 'svelte';
	import axios from 'axios';

	afterUpdate(() => {
		axios.get('/api/media').then((resp) => {
			console.log(resp)
		});
	});
</script>

<svelte:head>
	<title>milkbox</title>
</svelte:head>

test