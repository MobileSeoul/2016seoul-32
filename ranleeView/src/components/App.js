import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import RanLeeContainer from './RanLeeContainer';





import {Link} from 'react-router';

class App extends Component{
	
				// <Link to="detail" className="test">Hello</Link>
				// {this.props.children}


	render(){
		
		return(
			<div className="height-100 width-100">
				{this.props.children}
			</div>
		);
	}	


}



export default App;