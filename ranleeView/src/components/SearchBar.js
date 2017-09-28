import React ,{  Component }from 'react';
import RanLeeContainer from './RanLeeContainer';

class SearchBar extends Component{

	handleKeyDown(e){
		
		if(e.which===13){
			let keyword = this.refs.input.value;
			let page = this.props.searchData.page;
			let mallType = this.props.searchData.mallType;
			let filter = this.props.searchData.filter;

			this.props.callback.search(keyword, page, filter, mallType);
				
		}
	}


	render(){
		return(
			<div className="height-30 bar-wrapper">
				<input className="search-bar" 
					   type="text" name="" placeholder="검색"
					   onKeyDown={this.handleKeyDown.bind(this)} 
					   ref='input'/>
			</div>
		);
	}
}

export default SearchBar;