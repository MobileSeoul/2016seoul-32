import { REQUEST_Q_ITEMS } from '../constants';
import RanLeeAPI from '../api/RanLeeApi';


let ItemActionCreators = {
	fetchItems(){
		return(dispatch)=>{
			dispatch({type:REQUEST_Q_ITEMS});
			RanLeeAPI.fetchItems().then(
				(items) => dispatch({type:RECEIVE_C_ITEMS, items})
			)
		}
	}
}


export default ItemActionCreators;