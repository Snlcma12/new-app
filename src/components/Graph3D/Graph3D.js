import React, { Component } from 'react';
import Point from './Points.js'; // Импорт класса Point из файла Points.js
import Polygon from './Polygon.js';
import Math3D from './math3D';
import Surfaces from './Surfaces';
import Light from './Light';
import Edge from './edge';

class Graph3D extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FPS: 0
        };
        this.dx = 0;
        this.dy = 0;
        this.WIN = {
            LEFT: -5,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -40)
        };
        this.graphRef = React.createRef();
        this.math3D = new Math3D(this.WIN);
        this.surfaces = new Surfaces();
        this.zoomStep = 1.5;
        this.canMove = false;
        this.color = "#ff2a00";
        this.polygonsOnly = true;
        this.pointOnly = true;
        this.edgesOnly = true;
        this.animationActive = true;
        this.LIGHT = new Light(-30, 30, -40, 1000);
    }

    


    mouseup = () => {
        this.canMove = false;
    };

    mousedown = () => {
        this.canMove = true;
    };

    wheel = event => {
        event.preventDefault();
        const delta = event.deltaY > 0 ? 1 / this.zoomStep : this.zoomStep;
        const matrix = this.math3D.zoom(delta);
        this.scene.forEach(surface => {
            surface.points.forEach(point => this.math3D.transform(matrix, point));
            this.math3D.transform(matrix, surface.center);
        });
    };

    mousemove = event => {
        if (this.canMove) {
            const gradus = Math.PI / 180 / 4;
            const matrix = this.math3D.getTransform(
                this.math3D.rotateOx((this.dy - event.clientY) * gradus),
                this.math3D.rotateOy((this.dx - event.clientX) * gradus)
            );
            this.scene.forEach(surface => {
                surface.points.forEach(point => {
                    this.math3D.transform(this.math3D.rotateOx((this.dy - event.clientY) * gradus), point);
                    this.math3D.transform(this.math3D.rotateOy((this.dx - event.clientX) * gradus), point);
                });
                this.math3D.transform(matrix, surface.center);
            });
        }
        this.dx = event.clientX;
        this.dy = event.clientY;
    };

    renderScene = () => {
        const ctx = this.graphRef.current.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const FPS = this.state.FPS;
        const polygons = [];
        this.scene.forEach((surface, index) => {
            this.math3D.calcCenter(surface);
            this.math3D.calcRadius(surface);
            this.math3D.calcDistance(surface, this.WIN.CAMERA, "distance");
            this.math3D.calcDistance(surface, this.LIGHT, "lumen");
            surface.polygons.forEach(polygon => {
                polygon.index = index;
                polygons.push(polygon);
            });
        });

        if (this.pointOnly) {
            this.scene.forEach(surface =>
                surface.points.forEach(point => {
                    ctx.beginPath();
                    ctx.strokeStyle = "black";
                    ctx.arc(this.math3D.xs(point), this.math3D.ys(point), 2, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.closePath();
                })
            );
        }

        if (this.edgesOnly) {
            this.scene.forEach(surface =>
                surface.edges.forEach(edge => {
                    const point1 = surface.points[edge.p1];
                    const point2 = surface.points[edge.p2];
                    ctx.beginPath();
                    ctx.strokeStyle = this.color;
                    ctx.moveTo(this.math3D.xs(point1), this.math3D.ys(point1));
                    ctx.lineTo(this.math3D.xs(point2), this.math3D.ys(point2));
                    ctx.stroke();
                    ctx.closePath();
                })
            );
        }

        if (this.polygonsOnly) {
            polygons.forEach(polygon => {
                const points = polygon.points.map(index => new Point(
                    this.math3D.xs(this.scene[polygon.index].points[index]),
                    this.math3D.ys(this.scene[polygon.index].points[index])
                ));
                let { r, g, b } = polygon.color;
                const { isShadow, dark } = this.math3D.calcShadow(polygon, this.scene, this.LIGHT);
                const lumen = this.math3D.calcIllumination(polygon.lumen, this.LIGHT.lumen) * (isShadow ? dark : 1);
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                ctx.beginPath();
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.moveTo(points[0].x, points[0].y);
                points.slice(1).forEach(point => {
                    ctx.lineTo(point.x, point.y);
                });
                ctx.closePath();
                ctx.fill();
            });
            ctx.fillStyle = 'red';
            ctx.fillText('FPS:' + FPS, 10, 20);
            ctx.beginPath();
            ctx.arc(this.math3D.xs(this.LIGHT), this.math3D.ys(this.LIGHT), 3, 0, Math.PI * 2);
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.closePath();
        }
    };

    render() {
        return (
            <canvas
                id="graph3"
                width="600"
                height="600"
                ref={this.graphRef}
                onMouseMove={this.mousemove}
                onMouseUp={this.mouseup}
                onMouseDown={this.mousedown}
                onWheel={this.wheel}
            ></canvas>
        );
    }
}

export default Graph3D;
