import React from "react";
import Calculator from '../../modules/calculator/Calculator';

class Calc extends React.Component {
    constructor(props) {
        super(props);

        this.aRef = React.createRef();
        this.bRef = React.createRef();
    }

    operandHandler(operand) {
        const calc = new Calculator();
        const a = calc.getValue(this.aRef.current.value);
        const b = calc.getValue(this.bRef.current.value);
        const result = calc[operand](a, b);
        document.getElementById('c').value = result.toString();
        if (document.getElementById('c').value.includes('NaN')) {
            document.getElementById('c').value = 'Ошибка';
        }
    }

    getValueHandler = () => {
        const calc = new Calculator;
        let x = document.getElementById('point').value;
        let polynomial = document.getElementById('c').value;
        document.getElementById('value').value = calc.getValueAtPoint(polynomial, x);
    }

    changeStyle = () => {
        document.querySelector('body').style.backgroundColor = 'rgb(17, 17, 17)';
        document.getElementById('showCalculator').style.borderBottomStyle = 'none';
    }

    addEventListeners() {

        document.getElementById('showCalculator').addEventListener(
            'click',
            () => this.changeStyle()
        );
        
        document.getElementById('getValueButton')
            .addEventListener(
                'click',
                () => this.getValueHandler());

    }

    render() {
        return (<>
            <h1 class="title" id="partOne">Calculator</h1>
            <div class="inputBlock">
                <textarea ref={this.aRef} placeholder="a" class="input"></textarea>
                <textarea ref={this.bRef} placeholder="b" class="input"></textarea>
                <textarea id="c" placeholder="result" class="input"></textarea>
                <div class='operandBlock'>
                    <button onClick={() => this.operandHandler('add')}>+</button>
                    <button onClick={() => this.operandHandler('sub')}>-</button>
                    <button onClick={() => this.operandHandler('mult')}>*</button>
                    <button onClick={() => this.operandHandler('div')}>/</button>
                    <button onClick={() => this.operandHandler('prod')}>scal</button>
                    <button onClick={() => this.operandHandler('pow')}>^</button>
                </div>
                <input id="point" placeholder="Найти значение в точке" class="input" />
                <button id='getValueButton' class="findButton">Искать</button>
                <div></div>
                <input id="value" placeholder="Значение" class="input" />
                <div class="operands" />
            </div>
        </>);
    }
}

export default Calc;