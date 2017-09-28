import 'whatwg-fetch';


const API_URL = 'http://139.59.236.13:53364';
const API_HEADERS = {
	'Content-Type' : 'application/x-www-form-urlencoded'
}


let RanLeeAPI ={
	fetchItems(keyword){

		let PARAMS = 'item='+keyword+'&page=1&filter=asc';

		fetch(`${API_URL}/markets/coupang?${PARAMS}`,{
		//return fetch('./testData.json',{
			headers: API_HEADERS
		}).then((response)=>response.json())
	}
}


export default RanLeeAPI;