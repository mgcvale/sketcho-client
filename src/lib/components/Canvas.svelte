<script lang="ts">
    import { onMount } from "svelte";
    import { CanvasEngine, type NumberPair } from "../../engine/drawingEngine";
    import paper from 'paper';


    let { color = 'black', size = 2 } = $props();

    let canvasContainer: HTMLDivElement;
    let canvas: HTMLCanvasElement;
    let drawing: boolean = false;

    onMount(() => {
        CanvasEngine.initialize(canvas);

        CanvasEngine.getInstance().getPaper().view.onMouseDown = () => {
            drawing = true;
            CanvasEngine.getInstance().startPath(color, size);
        }

        CanvasEngine.getInstance().getPaper().view.onMouseUp = () => {
            drawing = false;
            CanvasEngine.getInstance().endPath();
        }

        CanvasEngine.getInstance().getPaper().view.onMouseMove = (e: paper.MouseEvent) => {
            CanvasEngine.getInstance().addPointToPath({
                x: e.point.x / canvas.width,
                y: e.point.y / canvas.height
            });
        }
    });

</script>

<div bind:this={canvasContainer} class="min-h-dvh">
    <canvas bind:this={canvas} width="800px" height="600px">

    </canvas>
</div>