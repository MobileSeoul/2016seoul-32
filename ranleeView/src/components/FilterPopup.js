import React, { Component } from 'react';
import { connect } from 'react-redux';


import styles from './FilterPopup.css';


let filter;
class FilterPopup extends Component{

	//Todo-확인누르면 체크된 검색필터 props 바꿔서 다시 랜더링
	
	filterClick(){
		let keyword = this.props.searchData.keyword;
		let page = this.props.searchData.page;
		let mallType = this.props.searchData.mallType;

		this.props.callback.search(keyword,page,filter,mallType);
		this.props.clickCallback();
		
	}

	onFilterChanged(e){
      	filter = e.currentTarget.value;
  	}



	
	render(){
		
		return(
			<div className={this.props.style}>
				<h4>검색</h4>
				<input type="radio" name="filtering" value="rank" onChange={this.onFilterChanged}/><span className={styles.inputStyle}>추천순</span><br/>
				<input type="radio" name="filtering" value="desc" onChange={this.onFilterChanged}/><span className={styles.inputStyle}>높은가격순</span><br/>
				<input type="radio" name="filtering" value="asc" onChange={this.onFilterChanged}/><span className={styles.inputStyle}>낮은가격순</span><br/><br/>
				<span onClick={this.filterClick.bind(this)} className={styles.btnOK}>확인</span>
			</div>
		);
	}
}


export default FilterPopup;