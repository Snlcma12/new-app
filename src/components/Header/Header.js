import React from "react";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.setPageName = props.setPageName;
    }

    render() {
        return(<div>
            <button onClick={() => this.setPageName('Graph3D')}>Графика 3D</button>
            <button onClick={() => this.setPageName('Graph2D')}>Графика 2D</button>
            <button onClick={() => this.setPageName('Calc')}>Калькулятор</button>
        </div>);
    }
}

export default Header;