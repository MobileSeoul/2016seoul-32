import React, {Component} from 'react';
import { Link } from 'react-router';

import Detail from './Detail';

class Item extends Component{

	//util로 빼기****
	nullCheck(item,value){
		if(item==null){
			return value;
		}else{
			return item;
		}
	}

	makeString(str, length){
		//배송여부 문자열 길이 조정..
		let formattedItem = '';
		let filledItem = this.nullCheck(str,'');

		if(filledItem.length !== length){
			if(filledItem.length > length){
				formattedItem = filledItem.substring(0,length)+'...';
			}else{
				let preLen  = length;
				formattedItem = filledItem;
				let diff = preLen - formattedItem.length;
				let filler = '\u00A0';

				for(var i=0 ; i < diff ; i++){
				  formattedItem += filler;
				}
			}
		}else{
			formattedItem = filledItem;
		}
		return formattedItem;
	}










	getQueryString(item){

		const DELIMITER_S = String.fromCharCode(228);
		const DELIMITER_Q = String.fromCharCode(229);

		let queryString ='/detail/';

		queryString += this.nullCheck(item.dataLink,'').split("/").join("@").split("?").join(DELIMITER_Q);
		queryString += DELIMITER_S +this.nullCheck(item.image,'').split("/").join("@");
		queryString += DELIMITER_S +this.nullCheck(item.title,'').split("/").join("@");
		queryString += DELIMITER_S +this.nullCheck(item.price,'').split("/").join("@");
		queryString += DELIMITER_S +this.nullCheck(item.delivery,'').split("/").join("@");
		queryString += DELIMITER_S +this.nullCheck(item.rating,'').toString().split("/").join("@");


		return queryString;
	}

	render(){

		let item = this.props.item;


		let URL_HTTP = 'http://';
		return(	
			<div className="item">
				<Link to={this.getQueryString(item)}>
					<img src={URL_HTTP+item.image}/>
				</Link>
				<p className="title">{this.makeString(item.title,15)}</p>
				<p className="price">{item.price+'원'}</p>
				<p className="delivery">{this.makeString(item.delivery,7)}</p>
			</div>
		);
	}
}

export default Item;