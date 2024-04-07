import React from 'react';

class Graph2D extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Двухмерный графоний!
            </div>
        );
    }
}

export default Graph2D;

function Graph(options) {
    options = options || {};
    var id = options.id;
    var width = options.width || 300;
    var height = options.height || 300;
    var WIN = options.WIN || {};
    var canvas;
    if (id) {
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(canvas);
    }
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    var callbacks = options.callbacks;
    canvas.addEventListener('wheel', callbacks.wheel);
    canvas.addEventListener('mousemove', callbacks.mousemove);
    canvas.addEventListener('mousedown', callbacks.mousedown);
    canvas.addEventListener('mouseup', callbacks.mouseup);
    canvas.addEventListener('mouseout', callbacks.mouseout);


    const PI2 = Math.PI * 2;

    function xs(x) {
        return (x - WIN.left) / WIN.width * canvas.width;
    }

    function ys(y) {
        return canvas.height - (y - WIN.bottom) / WIN.height * canvas.height;
    }
    
    this.clear = function () {
        context.fillStyle = '#ffe';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    this.line = function (x1, y1, x2, y2, color, width, isDash) {
        context.beginPath();
        context.strokeStyle = isDash ? color + '3' : color;
        context.lineWidth = width || 1;
        if (isDash) {
            context.setLineDash([12, 10]);
        } else { 
            context.setLineDash([]);
        }
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.stroke();
        context.closePath();
    }

    this.point = function (x, y, color, size) {
        context.beginPath();
        context.strokeStyle = color || '#f00';
        context.arc(xs(x), ys(y), size || 2, 0, PI2, false);
        context.stroke();
        context.closePath();
    }

    this.text = function (text, x, y, color) {
        context.fillStyle = color || '#000';
        context.font = "20px Arial";
        context.fillText(text, xs(x), ys(y));
    }
}

// Основной код из main.js
window.onload = function () {
    const funcs = [];

    var WIN = {
        left: -9.5,
        bottom: -10.8,
        width: 20,
        height: 20
    };
    var zoomStep = 0.2;

    let useInterpolation = false;
    const interPoints = [{ x: 10, y: 20 }, { x: 20, y: 10 }, { x: 30, y: 25 }, { x: 40, y: 15 }, { x: 50, y: 20 }];

  
    const mousedown = () => {
        canMove = true;
    }

    const mouseup = () => {
        canMove = false;
    }

    const mouseout = () => {
        canMove = false;
    }

    const mousemove = (event) => {
        if (canMove) {
            WIN.left -= event.movementX/(canvas.width/WIN.width);
            WIN.bottom += event.movementY/(canvas.height/WIN.height);
            render();
        }
    }
    const graph = new Graph({
        id: 'canvas',
        width: 600,
        height: 600,
        WIN: WIN,
        callbacks: {
            wheel,
            mousemove,
            mousedown,
            mouseup,
            mouseout
        }
    });

    const addFunction = (f, num) => {
        funcs[num] = {
            f,
            color: '#000',
            width: 3
        };
        render();
    }

    const delFunction = (num) => {
        funcs[num] = null;
        render();
    };

    const ui = new UI({
        addFunction,
        delFunction
    });

    function wheel(event) {
        var delta = (event.wheelDelta > 0) ? -zoomStep : zoomStep;
        WIN.width += delta;
        WIN.height += delta;
        WIN.left -= delta / 2;
        WIN.bottom -= delta / 2;
        render();
    }

    const clickButton = () => {
        let f =  function (x) { return eval(document.getElementById('funcInputs').value)};
        let color = document.getElementById('inputFuncColor').value;
        let size = document.getElementById('inputFuncSize').value*1;
    
        let name = 'Функция ' + (funcList.length + 1);
    
        let template = '<span> '+ name + '</span> <input type="color" id="' + 'inputFuncColor' + funcList.length + '"></input>';
        console.log(template)
        document.getElementById('funcList').innerHTML += template;
    
        funcList.push(funcList.length);
    
        funcList[funcList.length] = new Func(
            f,
            color,
            size,
            name
        );
        render();
    }

    const resize = () => {
        let size = Math.min(window.innerHeight, window.innerWidth) * 0.8;
        canvas.width = size;
        canvas.height = size;
        render();
    }

    let canMove = false;
    const button = document.getElementById('inputButton');
    button.addEventListener('click', clickButton);
    window.addEventListener('resize', resize);

    function printOXY() {
        // OX 
        graph.line(WIN.left, 0, WIN.left + WIN.width, 0, 'black');
        // OY 
        graph.line(0, WIN.bottom, 0, WIN.bottom + WIN.height, 'black');
        // клеточки, как в тетради 
        for (var i = Math.ceil(WIN.left); i < WIN.left + WIN.width; i++) {
            graph.line(i, WIN.bottom, i, WIN.bottom + WIN.height, '#0003');
        }
        for (var i = Math.floor(WIN.left); i > WIN.left; i--) {
            graph.line(i, WIN.bottom, i, WIN.bottom + WIN.height, '#0003');
        }
        for (var i = Math.ceil(WIN.bottom); i < WIN.bottom + WIN.height; i++) {
            graph.line(WIN.left, i, WIN.left + WIN.width, i, '#0003');
        }
        for (var i = Math.floor(WIN.bottom); i > WIN.bottom; i--) {
            graph.line(WIN.left, i, WIN.left + WIN.width, i, '#0003');
        }
    }

    const getDerivative = (f, x0, dx = 0.0001) => {
        return (f(x0 + dx) - f(x0)) / dx;
    }

    const getAsymptote = (f, x0) => {
        const k = getDerivative(f, x0);
        const b = f(x0) - k * x0;
        return x => k * x + b;
    }

    function getFunctionName(f) {
        var str = f.toString();
        var index = str.indexOf('return');
        return str.substr(index, str.length)
            .replace(/return/g, '')
            .replace(/ /g, '')
            .replace(';}', '')
            .replace('}', '')
            .replace(';', '');
    }

    function printFunction(f, color, width, n = 200) {
        var x = WIN.left;
        var dx = WIN.width / n;
        while (x <= WIN.left + WIN.width) {
            // Рисуем линию только при выполнении условия
            var isDash = Math.abs(f(x) - f(x + dx)) >= WIN.height;
            graph.line(x, f(x), x + dx, f(x + dx), color, width, isDash);
            x += dx;
        }
        graph.text('y=' + getFunctionName(f), 4.2, f(4));
    }
    function render() {
        graph.clear();
        //flipImage();
        printOXY();
        funcs.forEach(func => {
            if (func) {
                printFunction(func.f, func.color, func.width);
                printFunction(getAsymptote(func.f, 2), func.color, func.width);
            }
        });

        if (useInterpolation) {
            interPoints.forEach((point, index) => {
                graph.point(point.x, point.y, 'red');
                if (index > 0) {
                    graph.line(interPoints[index - 1].x, interPoints[index - 1].y, point.x, point.y, 'blue');
                }
            });
        }
    }
    document.getElementById('setInterpolation')
        .addEventListener('click', (event) => {
            useInterpolation = event.target.checked;
        });
    render();
}

function UI({ addFunction, delFunction }) {
	let num = 0;
	document.getElementById('addFunction').addEventListener('click', addClickHandler);

	function addClickHandler() {
		const input = document.createElement('input');
		input.setAttribute('placeholder', 'Функция №' + num);
		input.dataset.num = num;
		input.addEventListener('keyup', keyupHandler);

		const button = document.createElement('button');
		button.innerHTML = 'Удалить';
		button.addEventListener('click', () => {
			delFunction(input.dataset.num - 0);
			funcInputs.removeChild(input);
			funcInputs.removeChild(button);
		});

		const funcInputs = document.getElementById('funcInputs');
		funcInputs.appendChild(input);
		funcInputs.appendChild(button);
		num++;
	}

	function keyupHandler() {
		try {
			let f;
			eval(`f=function(x){ return ${this.value} ;}`);
			addFunction(f, parseInt(this.dataset.num));
		} catch (e) {
			console.log('Ошибка ввода', e);
		}
	}
}

// HTML-разметка из index.html
document.querySelector('body').innerHTML = `
    <div>
        <input type="checkbox" id="setInterpolation" />
        <label for="setInterpolation">Режим интерполяции</label>
    </div>
    
    <canvas id="canvas" width="600" height="600"></canvas> 
    <button id="addFunction">+</button> 
    <button id="inputButton">ок</button>
    <div id="funcInputs"></div><div id="funcList"></div>
    <div>
        <input type="color" id="inputFuncColor">
        <input type="range" id="inputFuncSize" value="3" min="1" max="11" step="2" list="marks">
        <datalist id="marks">
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="9">9</option>
            <option value="11">11</option>
        </datalist>
</div>`;
