import Point from './Points.js'; // Импорт класса Point из файла Points.js


class Light extends Point {
    constructor(x, y, z, lumen = 1000) {
        super(x, y, z);
        this.lumen = lumen;
    }
}

export default Light;