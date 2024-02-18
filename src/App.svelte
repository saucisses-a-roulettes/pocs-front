
<script >
	import Chart from "./Chart.svelte";
	let showChart = false
	let monthlyBudget;
	let pubBudget;
	const toggleChart =() =>{
	showChart= !showChart
}
</script>

<button on:click={() => toggleChart()}>Display chart</button>
<label for="monthlyBudget">Monthly Budget:</label>
<input type="number" id="monthlyBudget" bind:value={monthlyBudget}>
<label for="pubBudget">Pub Budget:</label>
<input type="number" id="pubBudget" bind:value={pubBudget}>
{#if showChart}
	<Chart {monthlyBudget} {pubBudget}/>
{/if}
