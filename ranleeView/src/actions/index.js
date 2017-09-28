/*
	검색관련 action

	1. 필터링 검색
		-(사이트)추천순
		-높은 가격순
		-낮은 가격순
	2. 키워드 검색
	3. 쇼핑몰 타입 검색
*/

//1. 필터링검색******************************
export const RECOMMEND = 'RECOMMEND';
export const ASCEND = 'ASC';
export const DESCEND = 'DES';

export const setRecommend = ()=>({
	type: RECOMMEND
})
export const setAscend = ()=>({
	type: ASCEND
})
export const setDescend = ()=>({
	type: DESCEND
})





//2. 키워드 검색**********************************
export const ADD_KEYWORD = 'ADD_KEYWORD';

export const addKeyword = (keyword)=>({
	type: ADD_KEYWORD,
	keyword
})







//3. 쇼핑몰 타입검색*******************************
export const TYPE_C = 'COUPANG';
export const TYPE_N = 'NAVER';

export const setMallTypeCoupang = ()=>({
	type: TYPE_C
})
export const setMallTypeNaver = ()=>({
	type: TYPE_N
})

