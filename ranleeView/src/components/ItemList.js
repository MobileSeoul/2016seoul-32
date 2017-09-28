import React, { Component, propTypes } from 'react';
import Item from './Item';

class ItemList extends Component{
	render(){

		var items = this.props.items.map((item)=>{
			return <Item item={item}/>
						 
		});


		return(
			<div className="width-100 item-group">
				{items}
			</div>
		);
	}
}

export default ItemList;