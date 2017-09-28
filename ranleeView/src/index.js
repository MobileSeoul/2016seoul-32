import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import App from './components/App';
import RanLeeContainer from './components/RanLeeContainer';
import Detail from './components/Detail';	
import searcher from './reducers';



//searcher리듀서가 반환한 액션객체로 store생성
const store = createStore(searcher); 
const rootElement = document.getElementById('root');


ReactDOM.render(
	<Provider store = {store}>
		<Router history = {browserHistory}>
			<Router path="/" component={App}>
				<IndexRoute component={RanLeeContainer}/>	
				<Route path="detail/:queryString" component={Detail}/>
			</Router>
		</Router>
	</Provider>, rootElement);