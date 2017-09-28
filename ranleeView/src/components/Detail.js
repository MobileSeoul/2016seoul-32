import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './Detail.css';

const API_URL = 'http://139.59.236.13:53364';
const API_HEADERS = {
	'Content-Type' : 'application/x-www-form-urlencoded'
}


class Detail extends Component{

	queryStringCutting(queryString){
		
		let item = {
			dataLink:'',
			image:'',
			title:'',
			price:'',
			delivery:'',
			rating:''
		};

		const DELIMITER_S = String.fromCharCode(228);
		const DELIMITER_Q = String.fromCharCode(229);

		let queryArr = queryString.split(DELIMITER_S);

		item.dataLink = queryArr[0].split("@").join("/").split(DELIMITER_Q).join("?");
		item.image = queryArr[1].split("@").join("/");
		item.title = queryArr[2].split("@").join("/");
		item.price = queryArr[3].split("@").join("/");
		item.delivery = queryArr[4].split("@").join("/");
		item.rating = queryArr[5].split("@").join("/");

		return item;
	}


	fetchItemDetail(dataLink){
		
		
		let API_URL = 'http://139.59.236.13:53364/markets/coupangDetail?searchURL='+dataLink;

		fetch(`${API_URL}`,{
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
			console.log("detail fetch----------->");
			console.log(responseData);

		})
		.catch((error)=>{
			console.log("error :"+error);
		})
	}

	

	render(){

		const URL_HTTP = 'http://';

		let item = this.queryStringCutting(this.props.params.queryString);

		this.fetchItemDetail(item.dataLink);


		let rootElement = document.getElementById('root');
		let test = (
					<div>
	            		<div>
	            			<h4 className={styles.textAlignCenter}>상세페이지</h4>
			                <div className={styles.detailImageDiv}>
			                	<img src={URL_HTTP+item.image}/>
			                </div>
			                <div className={styles.detailContent}>
			                	<p>제목 : {item.title}</p>
			                	<p>가격 : {item.price}</p>
			                	<p>별점 : {item.rating} / 5.0</p>
			                </div>
		            	</div>
		            	<div>
		            		
		            		<img src=""/>
		            	</div>
		            	<a href={item.dataLink}>
			            	<div className={styles.btnBUY}>구매하러가기</div>
		            	</a>
	            	</div>

	            	);

		ReactDOM.render(test, rootElement);		
	}
}
export default Detail;
