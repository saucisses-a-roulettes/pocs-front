<script>
	import Modal from './Modal.svelte';
	let people = [
		{name: 'Gael', beltcolour: 'black', age: 17, id: 1},
		{name: 'William', beltcolour: 'black', age: 24, id: 2},
		{name: 'Martin', beltcolour: 'black', age: 18, id: 3}
	];
	let num = 5;
// used in Inline function
const handleClick = (e,id) => {
	people = people.filter((person) => person.id != id)
	console.log(e);
}
//   let firstName = 'Julien';
//   let lastName = 'Grob';
//   let beltColour = 'black'

//   $: fullName = `${firstName} ${lastName}`;
//   $: {
// 	console.log(beltColour);
// 	console.log(fullName);
//   };
//   const handleClick =() => {
// 	if (beltColour =='orange'){
// 		beltColour ='black';
// 	}
// 	else{
// 	beltColour='orange';
// 	}
//   };
//   const handleInput=(e)=> {
// 	beltColour = e.target.value ;
//   };
</script>
<!-- Import the content of the Modal component -->
<Modal/>
{#if num > 5}
	<p>Greater than 20</p>
{/if}
<main>
	{#each people as person (person.name)}
		
	<div>
		<h4>{person.name}</h4>
		<!-- Conditionals -->
		{#if person.age < 18}
			<p>Attention mineur</p>
		{/if}
		<p>{person.age} years old, {person.beltcolour} belt.</p>
		<!-- In line function in the button click event -->
		<button on:click={(e)=>
			handleClick(e,person.id)
		}>Delete</button>
	  </div>
	{:else}
	<p>They are no people to show...</p>
	  {/each}
	<!-- <h1>Hello {name}!</h1> -->
	<!-- <p style ="color: {beltColour}">{firstName} {lastName} - {beltColour} belt</p>
	<input type="text" bind:value={beltColour}>
	<input type="text" bind:value={firstName}>
	<input type="text" bind:value={lastName}> -->
	<!-- <button on:click={handleClick}>update belt colour</button> -->
	<!-- <input type="text" on:input={handleInput} value={beltColour}>-->
	
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h4 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>