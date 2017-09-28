import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addKeyword } from '../actions/index';

import NavigationBar from './NavigationBar';
import SearchBar from './SearchBar';
import ItemContainer from './ItemContainer';
import Detail from './Detail';




class RanLee extends Component{


	render(){
		return(
			<div className="height-100">
				<NavigationBar callback={this.props.callback}
							   searchData={this.props.searchData}/>

				<SearchBar callback={this.props.callback} 
						   searchData={this.props.searchData}/>
				
				<ItemContainer items={this.props.items}
							   callback={this.props.callback}
							   searchData={this.props.searchData}/>
			</div>
		);
		
	}

}

let filtering = (state)=>{
	return{
		searchCondition:{
			filterType: state.searcher.filtering,
			searchKeyword: state.searcher.keyword,
			mallType: state.searcher.mallType
		}
	}
}

export default connect(filtering)(RanLee);
