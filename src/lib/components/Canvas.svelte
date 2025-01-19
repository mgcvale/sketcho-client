<script lang="ts">
    import { onMount } from "svelte";
    import { CanvasEngine, type NumberPair } from "../../engine/drawingEngine";
    import ColorSelector from "./ColorSelector.svelte";


    let { color = 'black', size = 2 } = $props();

    let canvasContainer: HTMLDivElement;
    let canvas: HTMLCanvasElement;
    let drawing: boolean = false;

    onMount(() => {
        CanvasEngine.initialize(canvas);

        CanvasEngine.getInstance().getPaper().view.onMouseDown = (e: paper.MouseEvent) => {
            drawing = true;
            CanvasEngine.getInstance().startPath(color, size, e.point);
        }

        CanvasEngine.getInstance().getPaper().view.onMouseUp = (e: paper.MouseEvent) => {
            drawing = false;
            e.point.x += 0.1;
            CanvasEngine.getInstance().endPath(e.point);
        }

        CanvasEngine.getInstance().getPaper().view.onMouseMove = (e: paper.MouseEvent) => {
            CanvasEngine.getInstance().addPointToPath({
                x: e.point.x / canvas.width,
                y: e.point.y / canvas.height
            });
        }

        function resizeCanvas() {
            CanvasEngine.getInstance().resize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        }

        const resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(canvasContainer);

        return (() => {
            resizeObserver.disconnect();
        });
    });

</script>
<div bind:this={canvasContainer} class="h-full w-full">
    <canvas bind:this={canvas}>
    </canvas>
</div>
