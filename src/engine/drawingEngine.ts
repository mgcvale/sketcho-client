import paper from 'paper';

export interface NumberPair {
    x: number,
    y: number,
};

export interface VisualElement {
    type: string,
};

export interface SketchoPath extends VisualElement {
    type: "path",
    color: string,
    size: number,
    points: NumberPair[],
};

export interface CanvasState {
    elements: VisualElement[],
};

export class CanvasEngine {
    private static inst: CanvasEngine;
    private canvasState: CanvasState;
    private canvas: HTMLCanvasElement;
    private paperInstance: typeof paper;
    private currentPath: {sketchoPath: SketchoPath, paperPath: paper.Path} | null;

    private constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.paperInstance = paper;
        this.paperInstance.setup(canvas);
        this.canvasState = {elements: []};
        this.currentPath = null;
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

    public startPath(color: string, size: number): void {
        this.currentPath = {
            sketchoPath: {
                type: "path",
                color: color,
                size: size,
                points: [],
            },
            paperPath: new paper.Path({
                strokeWidth: size,
                strokeColor: color,
                strokeCap: 'round',
            })
        };
    }

    public addPointToPath(point: NumberPair): void {
        if (this.currentPath) {
            this.currentPath.sketchoPath.points.push(point);
            this.currentPath.paperPath.add(new paper.Point(point.x * this.canvas.width, point.y * this.canvas.height));
        }
    }

    public endPath(): void {
        if (this.currentPath) {
            this.canvasState.elements.push(this.currentPath.sketchoPath);
            this.currentPath.paperPath.simplify();
            this.currentPath = null;
        }
    }

    
    public getPaper(): typeof paper {
        return this.paperInstance;
    }

}