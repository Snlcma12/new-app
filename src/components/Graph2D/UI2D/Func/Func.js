import React from "react";

class Func extends React.Component {
    constructor(props) {
        super(props);
        this.func = props.func;
        this.changeFunction = props.changeFunction;
    }

    keyupHandler(event) {
        try {
            let f;
            eval(`f = function(x) {return ${event.target.value};}`);
            this.func.f = f;
            this.changeFunction();
        } catch (e) {
            console.log('ошибка ввода', e);
        }
    }

    render() {
        return(<div>
            <input onKeyUp={(event) => this.keyupHandler(event)} placeholder="f(x)" />
            <input placeholder="color" />
            <input placeholder="width" />
        </div>);
    }
}

export default Func