import React from 'react';

class Header extends React.Component {
	constructor(props){
		super(props);
		this.setPageName = props.setPageName;
	}

	render(){
		return (
			<>
				<h1>Хедер!</h1>
				<button onClick={() => this.setPageName('Graph2D')}>Графика 2D</button>
				{/* (more buttons) */}
			</>
		);
	}
}

export default Header;

