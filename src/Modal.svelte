<script>
    export let showModal = false;
    export let message = "default";
</script>
{#if showModal}
    <div class="backdrop" >
        <div class="modal">
            <p>{message}</p>
        </div>
    </div>
{/if}

<style>

</style>