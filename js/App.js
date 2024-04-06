import React from 'react';
import Graph2D from './components/Graph2D/Graph2D';
import Header from './components/Header/Header';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageName: 'Graph2D'
        };
    }

    setPageName(name){
        this.setState({pageName: name});
    }

    render(){
        return (
            <div className='app'>
                <Header setPageName={name => this.setPageName(name)} />
                {this.state.pageName === 'Graph2D' ? <Graph2D /> : <></>}
            </div>
        );
    }
}

export default App;
