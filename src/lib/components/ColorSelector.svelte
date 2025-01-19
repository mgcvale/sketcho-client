<script lang="ts">
    let { currentColor = $bindable("black") } = $props();

    const colors = [
        'red',
        'blue',
        'yellow',
        'green',
        'limegreen',
        'organe',
        'purple',
        'black',
        '#888888',
        'white',
        'bisque',
        'SaddleBrown',
        'turquoise',
        'skyblue',
    ];

</script>

<div class="grid grid-cols-2">

    {#each colors as color}
        <button class="rounded-full border-none outline-none w-4 h-4"
            aria-label="Change color to {color}" 
            style="background-color: {color}"
            onclick={() => currentColor = color}
        >
        </button>
    {/each}

</div>