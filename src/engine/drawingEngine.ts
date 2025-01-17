import { Point } from 'paper';
import { Path } from 'paper';
import paper from 'paper';

export interface NumberPair {
    x: number,
    y: number
}

export interface VisualElement {
    type: string,
}

export interface SketchoPath extends VisualElement {
    type: 'path',
    lineWeight: number,
    color: string,
    points: NumberPair[];
}

export interface CanvasState {
    elements: VisualElement[];
}

export class CanvasEngine {
    private static inst: CanvasEngine;
    private canvas: HTMLCanvasElement;
    private paperInstance: typeof paper;
    private canvasState: CanvasState;
    
    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.paperInstance = paper;
        this.paperInstance.setup(canvas);
        this.canvasState = {elements: []};
    }

    public static initialize(canvas: HTMLCanvasElement): void {
        this.inst = new CanvasEngine(canvas);
    }

    public static getInstance(): CanvasEngine {
        if (!this.inst) {
            throw new Error("CanvasEngine not initialized. Call initialize(canvas) first.");
        }
        return CanvasEngine.inst;
    }


    public loadCanvasState(state: CanvasState): void {
        for (let element of state.elements) {
            this.addToCanvas(element, false);
        }
    }

    public addPath(path: SketchoPath) {
        const canvasDimensions: NumberPair = {x: this.canvas.width, y: this.canvas.height};
        const paperPath = new Path({
            strokeColor: path.color,
            strokeWidth: path.lineWeight,
        });
        for (let pathPoint of path.points) {
            paperPath.add(new Point(pathPoint.x * canvasDimensions.x, pathPoint.y * canvasDimensions.y));
        }
        paperPath.simplify();
    }

    public addToCanvas(element: VisualElement, updateState = true): void {
        if (updateState) {
            this.canvasState.elements.push(element);
        }

        if (this.isPath(element)) {
            this.addPath(element);
        } else {
            console.log("Failed to add " + element + " to canvas: type doesn't match any");
        }
    }



    public getPaper(): typeof paper {
        return this.paperInstance;
    }

    public isPath(element: VisualElement): element is SketchoPath {
        return element.type === 'path';
    }

    public getCanvasState(): CanvasState {
        return this.canvasState;
    }

}