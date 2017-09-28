import React, { Component} from 'react';
import ButtonFilter from './ButtonFilter';


class NavigationBar extends Component{

	render(){
		return(
			<div className="nav-bar">
				<span className="nav-title">라니셋트</span>
				<ButtonFilter callback={this.props.callback}
							  searchData={this.props.searchData}/>
			</div>
		);
	}


}


export default NavigationBar;