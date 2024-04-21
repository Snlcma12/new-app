import React from "react";
import './Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.setPageName = props.setPageName;
    }

    render() {
        return (<>
            <button onClick={() => this.setPageName('TargetShooter')} className='HeaderBtn'
            >Мишени</button>
            <button onClick={() => this.setPageName('StudentSimulator')} className='HeaderBtn'
            >Игра</button>
            <button onClick={() => this.setPageName('Graph2D')} className='HeaderBtn'
            >Графика 2д</button>
            <button onClick={() => this.setPageName('UniversalCalculator')} className='HeaderBtn'
            >Калькулятор</button>
            <button onClick={() => this.setPageName('Graph3D')} className='HeaderBtn'
            >Графика 3Д</button>
        </>);
    }
}

export default Header;