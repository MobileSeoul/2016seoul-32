import React, {Component} from 'react';


class Tab extends Component{

	constructor(){
		super(...arguments);
		this.state={
			select:{
				c:'tab-selected',
				n: 'tab-unselected'
			}
		}
	}

	clickTab(index){
		let select={};

		let searchData = this.props.searchData;
		let keyword, page, filter, mallType;
			
			keyword = searchData.keyword === '' ? '선물' : searchData.keyword;
			page = searchData.page === '' ? 1 : searchData.page;
			filter = searchData.filter === '' ? 'asc' : searchData.filter ;

			
		if(index===1){
			select = { c:'tab-selected', n: 'tab-unselected' };
			mallType = 'c';

			this.props.callback.search(keyword,page,filter,mallType);
		}else if(index===2){
			select = { c:'tab-unselected', n:'tab-selected'};
			mallType = 'n';

			this.props.callback.search(keyword,page,filter,mallType);
		}
		this.setState({select: select});
	}




	render(){
		return(
			<div className="tab-group">
				<div className={'tab '+this.state.select.c} onClick={()=>this.clickTab(1)}>
					쿠팡
				</div>
				<div className={'tab '+this.state.select.n} onClick={()=>this.clickTab(2)}>
					네이버
				</div>
			</div>
		);
	}
}

export default Tab;