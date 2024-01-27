<script lang="ts">
	import { onMount } from "svelte";
	import { loggedIn, userEmail, userId } from "./stores";

	import Nav from "./components/Nav.svelte";
	import checkLogin from "./utils/check-login";

	onMount(async () => {
		const data = await checkLogin();

		loggedIn.set(data.loggedIn);
		console.log("Checking login", data);
		if (data.loggedIn) {
			userEmail.set(data.data.email);
			userId.set(data.data.id);
		}
	});
</script>

<Nav />
