<script lang="ts">

    import { Canvas } from '$lib';

</script>

<div class="game-display fixed top-0 left-0 h-dvh w-dvw flex justify-center items-center">
    <div class="game-content m-auto">
        <Canvas />
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