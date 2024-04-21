import React from "react"
import Func from "./Func/Func";

class UI2D extends React.Component {
    constructor(props) {
        super(props);
        this.funcs = props.funcs;
        this.changeFunction = props.changeFunction;

        this.state = {
            funcs: props.funcs
        }
    }

    addFunctionHandler() {
        const funcs = [].concat(this.state.funcs);
        const func = {
            f: () => 0,
            color: 'black',
            width: 2
        };
        funcs.push(func);
        this.funcs.push(func);
        this.setState({ funcs });
    }

    render() {
        return (<>
            <button
                className="beautyButton"
                onClick={() => this.addFunctionHandler()}
            >+</button>
            <div>{
                this.state.funcs.map((func, index) =>
                    <Func
                        key={index}
                        func={func}
                        changeFunction={() => this.changeFunction()}
                    />
                )
            }</div>
        </>);
    }
}

export default UI2D