<script lang="ts">

    import { Canvas } from '$lib';
    import ColorSelector from './ColorSelector.svelte';

    let color = $state('black');

</script>

<div class="game-display fixed top-0 left-0 h-dvh w-dvw flex justify-start items-center">
    <ColorSelector bind:currentColor={color} ></ColorSelector>
    <div class="game-content m-auto">
        <Canvas {color} />
    </div>
</div>

<style lang="scss">
    .game-content {
        width: calc(100% - 6vw);
        height: calc(100% - 6vw);
        @media (max-width: 480px) {
            width: 100%;
            height: 100%;
        }
    }
</style>