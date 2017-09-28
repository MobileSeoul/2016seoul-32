import React,{ Component } from 'react';

import RanLee from './RanLee';

import 'whatwg-fetch';

const API_URL = 'http://139.59.236.13:53364';
const API_HEADERS = {
	'Content-Type' : 'application/x-www-form-urlencoded'
}

class RanLeeContainer extends Component{


	constructor(){
		super(...arguments);
		this.state = {
			keyword:'사과',
			page:'1',
			filter:'asc',
			mallType:'c',
			items:[]
		};
	}


	componentDidMount(){		
		this.searchItem();
    }

    searchItem(keyword='사과',page=1, filter='asc', mallType='c'){
    	
    	let PARAMS = mallType === 'c' ? 'markets/coupang?' : 'markets/naverShop?';
    	PARAMS += 'item='+keyword+'&page='+page+'&filter='+filter;

    	fetch(`${API_URL}/${PARAMS}`,{
		//fetch('./testData.json',{
			headers:API_HEADERS,
			method:'get'
		}).then((response)=>{
			if(response.ok){
				return response.json();
			}else{
				throw new Error("server reponse wasnt OK");
			}
		}).then((responseData)=>{
			this.setState({items: responseData.data});
			this.setState({keyword:keyword});
			this.setState({page:page});
			this.setState({filter:filter});

		})
		.catch((error)=>{
			console.log("error :"+error);
		})
    }

    
    
	render(){

		return(
			
				<RanLee className="height-100 width-100" 
						items={this.state.items} 
						callback={{search: this.searchItem.bind(this)}} 
						searchData={this.state}/>
			
		);
		
	}
}


export default RanLeeContainer;