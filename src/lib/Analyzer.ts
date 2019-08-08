import ndarray from 'ndarray';
import Shape from './Shape';

type FindEdge = (x: number, y: number) => { x: number; y: number };

export default class Analyzer {
  foundShapes: Shape[] = [];
  sourcePixels: ndarray;

  constructor(pixels: ndarray) {
    this.sourcePixels = pixels;
  }

  /**
   * Iterate on pixels
   */
  public parse = () => {
    for (let y = 0; y < 1000; y = y + 10) {
      for (let x = 0; x < 1000; x = x + 10) {
        if (this.isImagePixel(x, y)) {
          this.findShape(x, y);
        }
      }
    }
    return this.foundShapes;
  };

  /**
   * Find edges and calc corner coordinates
   */
  private findShape = (x: number, y: number) => {
    const top = this.findTop(x, y);
    const right = this.findRight(x, y);
    const bottom = this.findBottom(x, y);
    const shape = new Shape(
      { x, y: top.y },
      { x: right.x, y: top.y },
      { x, y: bottom.y },
      { x: right.x, y: bottom.y },
    );
    this.foundShapes.push(shape);
    this.setKnownPixels(shape);
  };

  /**
   * Set found shape pixels to white
   */
  private setKnownPixels = (shape: Shape) => {
    for (let y = shape.topLeft.y; y <= shape.bottomLeft.y; y = y + 1) {
      for (let x = shape.topLeft.x; x <= shape.topRight.x; x = x + 1) {
        this.sourcePixels.set(x, y, 0, 255);
        this.sourcePixels.set(x, y, 1, 255);
        this.sourcePixels.set(x, y, 2, 255);
        this.sourcePixels.set(x, y, 3, 255);
      }
    }
  };

  /**
   * Check pixels in the given direction
   * Stop at first white pixel
   */
  private findEdge = (x: number, y: number, xDiff = 0, yDiff = 0) => {
    if (this.isWhitePixel(x + xDiff, y + yDiff)) {
      return { x, y };
    }
    return this.findEdge(x + xDiff, y + yDiff, xDiff, yDiff);
  };

  private findTop: FindEdge = (x, y) => this.findEdge(x, y, 0, -1);

  private findRight: FindEdge = (x, y) => this.findEdge(x, y, 1, 0);

  private findBottom: FindEdge = (x, y) => this.findEdge(x, y, 0, 1);

  /**
   * Check by RGB with a minimal tolerance
   */
  private isWhitePixel = (x: number, y: number): boolean => {
    const r = this.sourcePixels.get(x, y, 0);
    const g = this.sourcePixels.get(x, y, 1);
    const b = this.sourcePixels.get(x, y, 2);
    return r + g + b >= 750; // tolerance: 15 unit
  };

  /**
   * Which is not white pixel
   */
  private isImagePixel = (x: number, y: number) => !this.isWhitePixel(x, y);
}
