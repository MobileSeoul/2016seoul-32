//search reducer 파일
import { RECOMMEND, ASCEND, DESCEND } from '../actions';
import { SET_KEYWORD } from '../actions';
import { TYPE_C, TYPE_N } from '../actions';
import styles from '../components/FilterPopup.css';

import { combineReducers } from 'redux';



const searchConditionInitialState = { //default 검색조건
	keyword : '사과',
	filtering: DESCEND,
	mallType: TYPE_C

}

//검색 reducer
const searcher = (state = searchConditionInitialState, action) => {
	switch(action.type){
		case RECOMMEND: return Object.assign({}, state, {
			filtering: RECCOMEND
		});
		case ASCEND: return Obejct.assign({}, state, {
			filtering: ASCEND
		});
		case DESCEND: return Object.assign({}, state, {
			filtering: DESCEND
		});
		case SET_KEYWORD: return Object.assign({}, state,{
			keyword: action.keyword
		});
		case TYPE_C: return Object.assign({}, state, {
			mallType: TYPE_C
		});
		case TYPE_N: return Object.assign({}, state, {
			mallType: TYPE_N
		});
		default:
			return state;
	}
}

const searcherApp = combineReducers({
    searcher
});


export default searcherApp;