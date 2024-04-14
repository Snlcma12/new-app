import Point from './Points.js'; // Импорт класса Point из файла Points.js
import Surface from './surface.js'; // Подключение класса Surface
import Edge from './edge';
import Polygon from './Polygon.js';

class Surfaces {
    cube() {
        const points = [
            new Point(1 * 5, 1 * 5, 1 * 5),
            new Point(1 * 5, -1 * 5, 1 * 5),
            new Point(-1 * 5, -1 * 5, 1 * 5),
            new Point(-1 * 5, 1 * 5, 1 * 5),
            new Point(1 * 5, 1 * 5, -1 * 5),
            new Point(1 * 5, -1 * 5, -1 * 5),
            new Point(-1 * 5, -1 * 5, -1 * 5),
            new Point(-1 * 5, 1 * 5, -1 * 5),
          ];
          return new Surface(points);
    }

    sphere() {
        // Implement sphere creation logic here
    }

    torus() {
        // Implement torus creation logic here
    }

    // Add methods for other surfaces as needed
}

export default Surfaces;
