import  Surface from "../entities";
import  Point  from "../entities";
import  Edge from "../entities";
import  Polygon  from "../entities";

class Tor extends Surface {
    constructor(options = {}) {
    const { count = 20, R = 10, r = 5 } = options;
    const points = [];
    const edges = [];
    const polygons = [];
    const da = Math.PI * 2 / count;
    for (let phi = 0; phi < Math.PI * 2; phi += da) {
        for (let psi = -Math.PI; psi < Math.PI; psi += da) {
            const x = (R + r * Math.cos(psi)) * Math.cos(phi);
            const y = (R + r * Math.cos(psi)) * Math.sin(phi);
            const z = r * Math.sin(psi);
            points.push(new Point(x, y, z));
        }
    }
    for (let i = 0; i < points.length; i++) {
        if (points[i + 1]) {
            if ((i + 1) % count === 0) {
                if (i + 1 - count >= 0) {
                    edges.push(new Edge(i, i + 1 - count));
                }
            } else {
                edges.push(new Edge(i, i + 1));
            }

        }
        if (points[i + count]) {
            edges.push(new Edge(i, i + count));
        } else {
            edges.push(new Edge(i, i % count));
        }
    }

    for (let i = 0; i < points.length; i++) {
        if (points[i + 1 + count]) {
            polygons.push(new Polygon([
                i,
                i + 1,
                i + 1 + count,
                i + count
            ], '#ffff00'));
        } else {
            if (points[i + 1]) {
                polygons.push(new Polygon([
                    i,
                    i + 1,
                    i + count - points.length + 2,
                    i + count - points.length + 1,
                ], '#00ff00'));
            }
        }
    }
        super(points, edges, polygons);
    }
}

export default Tor;
