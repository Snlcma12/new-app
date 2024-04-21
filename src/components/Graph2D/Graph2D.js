import React, { useEffect, useState } from "react";
import Graph from '../../modules/Graph/Graph';
import UI2D from "./UI2D/UI2D";

import './Graph2D.css';

let graph = null;

const Graph2D = () => {
    const [funcs, setFuncs] = useState([]);
    const [canMove, setCanMove] = useState(false);

    const WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    };

    useEffect(() => {
        graph = new Graph({
            WIN: WIN,
            id: 'canvas',
            width: 500,
            height: 500,
            callbacks: {
                wheel: (event) => wheelHandler(event),
                mousemove: (event) => mousemoveHandler(event),
                mouseup: () => mouseupHandler(),
                mousedown: (event) => mousedownHandler(event),
                mouseout: () => mouseoutHandler()
            }
        });
        
        return () => {
            graph = null;
        }
    }, []);

    const wheelHandler = (event) => { }
    const mouseupHandler = () => { }
    const mousedownHandler = (event) => { }
    const mousemoveHandler = (event) => { }
    const mouseoutHandler = () => { }

    const changeFunction = () => {
        renderFrame(funcs);
    }

    const printFunction = (f, color, strWidth, n = 200) => {
        console.log(f);

        var x = WIN.LEFT;
        var dx = WIN.WIDTH / n;
        while (x <= WIN.WIDTH + WIN.LEFT) {
            graph.line(x, f(x), x + dx, f(x + dx), color, strWidth, Math.abs(f(x) - f(x + dx)) >= WIN.HEIGHT)
            x += dx;
        };
    };

    const renderFrame = (funcs) => {
        funcs.forEach(func =>
            func && printFunction(func.f, func.color, func.width)
        );
        graph.renderFrame();
    }

    return (
        <div className="beautyDiv">
            <div>
                <canvas id='canvas' width='300' height='300'></canvas>
            </div>
            <UI2D
                funcs={funcs}
                changeFunction={() => changeFunction()}
            />
        </div>
    );
}

export default Graph2D;
