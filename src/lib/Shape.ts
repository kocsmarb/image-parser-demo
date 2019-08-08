export interface Coordinate {
  x: number;
  y: number;
}

class Shape {
  topLeft: Coordinate;
  topRight: Coordinate;
  bottomLeft: Coordinate;
  bottomRight: Coordinate;

  constructor(
    topLeft: Coordinate,
    topRight: Coordinate,
    bottomLeft: Coordinate,
    bottomRight: Coordinate,
  ) {
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
  }
}

export default Shape;
