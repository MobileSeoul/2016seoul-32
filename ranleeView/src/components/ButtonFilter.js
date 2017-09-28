import React, { Component } from 'react';

import FilterPopup from './FilterPopup';
import styles from './FilterPopup.css';



class ButtonFilter extends Component{

	constructor(){
		super(...arguments);
		this.state={
			isVisible: false
		}
	}

	clickPopup(){
		this.setState({isVisible: !this.state.isVisible});
	}

	render(){

		return(
			<div>
				<i onClick = {this.clickPopup.bind(this)} 
				   className="fa fa-filter fa-2x BTN-FILTER" 
				   aria-hidden="true"></i>
				<FilterPopup style={this.state.isVisible ? styles.display : styles.displayNone}
							 callback={this.props.callback}
							 searchData={this.props.searchData}
							 clickCallback={this.clickPopup.bind(this)}/>
			</div>
		);
	}
}


export default ButtonFilter;