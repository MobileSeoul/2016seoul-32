import React,{ Component} from 'react';
import Tab from './Tab';
import ItemList from './ItemList';


class ItemContainer extends Component{
	render(){
		return(
			<div className="list-group">
				<Tab searchData={this.props.searchData}
				     callback={this.props.callback}/>
				<ItemList items={this.props.items}/>
			</div>

		);
	}
}

export default ItemContainer;