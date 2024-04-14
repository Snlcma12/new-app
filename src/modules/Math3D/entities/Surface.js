import Point from './Point';

class Figure {
  constructor(points = [], edges = [], polygons = [], center = new Point()) {
    this.points = points;
    this.edges = edges;
    this.polygons = polygons;
  }

}

export default Figure;
