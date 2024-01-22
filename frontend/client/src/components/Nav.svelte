<script lang="ts">
	import page from "page";
	import Home from "../pages/Home.svelte";
	import Account from "../pages/Account.svelte";
	import About from "../pages/About.svelte";
	import Error from "../pages/Error.svelte";

	let current = Home;

	page("/", () => (current = Home));
	page("/about", () => (current = About));
	page("/account", () => (current = Account));
	page("*", () => (current = Error));

	page.start();

</script>

<div id="nav">
	<nav class="navbar-menu">
		<a class="navbar-item" href="/">home</a>
		<a class="navbar-item" href="/about">about</a>
		<a class="navbar-item" href="/account">account</a>
	</nav>
	<svelte:component this={current} />
</div>

<style>
	.navbar-item {
		padding-right: 2em;
	}
</style>
