var request = require('request');
var cheerio = require('cheerio');
var urlencode = require('urlencode');
var phantom = require('phantom');

function getCoupangDetail(searchURL,callback){

	phantom.create().then(function(ph) {
	  ph.createPage().then(function(page) {
	    page.open(searchURL).then(function(status) {
	      console.log(status);
	      page.property('content').then(function(body) {
	      	callback(body)
	        // console.log(body);

			// var product_contents = page.evaluate(function(){			
			// 	return document.getElementById('product-contents-placeholder').textContent;
			// });
			
			// console.log('dd',product_contents);
			// var $ = cheerio.load(body);
		 //    var row_prod_item_info = $('#prod-item-info')
		 //    var prod_item_detail = row_prod_item_info['0'].children[3]
		 //    var prod_band_items = prod_item_detail.children[1].children[3]
		 //    // console.log(prod_item_detail.children[1].children[3])
		 //    var prod_vendor_items =prod_item_detail.children[1].children[3].children[1];
		 //    console.log(prod_vendor_items.children[1])
		 //    // callback(prod_vendor_items)
		    
		    // console.log(rows['0'])
	  //  		var datas = new Array();


	        page.close();
	        ph.exit();
	      });
	    });
	  });
	});	

}

exports.coupangDetail = function(req,res){
	// console.log(coupangDetail)
	var searchURL = req.param('searchURL');	
	console.log(searchURL)


	getCoupangDetail(searchURL,function(body){
		
		console.log('getCoupnDetail')
		var datas = new Array();


		var $ = cheerio.load(body);

	    var row_prod_item_info = $('#prod-item-info');
	    var prod_item_detail = row_prod_item_info['0'].children[3];
	    var prod_band_items = prod_item_detail.children[1].children[3];	   
	 	var prod_vendor_items =prod_item_detail.children[1].children[3].children[1];
	    
	    for(var i = 1 ; i<prod_vendor_items.children[1].children.length ; i+=2){	    		    	
	    	// console.log(i)
			var detail = new Object();
			var prod_img_info = prod_vendor_items.children[1].children[i].children[1].children[1];	    
	    	var imagee = prod_img_info['attribs']['src'];		
	    	detail.image = imagee.slice(2,imagee.length);
	    	datas.push(detail)
		}		
			console.log('end Calling')

		res.status(200).json({		
			"code":200,
			"data":datas
		});		
	})

	
	// getCoupangDetailPic(function(data){
	// 	console.log(data)
	// })
	// console.log(coupangDetail)


// var phantom = require('phantom');

// phantom.create(function(ph) {
//   return ph.createPage(function(page) {
//     return page.open(searchURL, function(status) {
//   		var html = page.content;
//   		console.log(html)
//       // return page.evaluate((function() {
//       //   return document.getElementById('side_today_count').textContent;
//       // }), function(side_today_count) {
//       //   console.log("오늘의 방문자 수 : " + side_today_count);
//       //   return ph.exit();
//       // });

//     });
//   });
// });



console.log('coupang detail')


};




// function getCoupangDetailPic(callback){
// 	var phantom = require('phantom');

// 	phantom.create().then(function(ph) {
// 	  ph.createPage().then(function(page) {
// 	    page.open(searchURL).then(function(status) {
// 	      console.log(status);
// 	      page.property('content').then(function(body) {
// 	        // console.log(body);
// 				    console.log('body has')

// 			// var product_contents = page.evaluate(function(){			
// 			// 	return document.getElementById('product-contents-placeholder').textContent;
// 			// });
			
// 			// console.log('dd',product_contents);
// 			var $ = cheerio.load(body);
// 	  // 		// var baseUrl = 'http://www.coupang.com'
// 		    // var rows = $('#product-contents-placeholder')
// 		    var row_prod_item_info = $('#prod-item-info')
// 		    var prod_item_detail = row_prod_item_info['0'].children[3]
// 		    var prod_band_items = prod_item_detail.children[1].children[3]
// 		    // console.log(prod_item_detail.children[1].children[3])
// 		    var prod_vendor_items =prod_item_detail.children[1].children[3].children[1];
// 		    console.log(prod_vendor_items)
// 		    // callback(prod_vendor_items)
		    
// 		    // console.log(rows['0'])
// 	  //  		var datas = new Array();


// 	        page.close();
// 	        ph.exit();
// 	      });
// 	    });
// 	  });
// 	});	
// }
exports.coupang = function(req,res){

console.log('coupang)');
var item = req.param('item');
var filter = req.param('filter'); 
var page = req.param('page');

console.log(item)
console.log(filter)
console.log(page)

var searchURL =  ''

if(filter == null){
// https://www.coupang.com/np/search?q=사과&listSize=36&brand=&filterType=&isPriceRange=true&minPrice=1&maxPrice=30000&page=1&channel=user&filterKey=113136&filter=&rating=0&sorter=scoreDesc
}else if(filter == 'desc'){
	searchURL = 'http://www.coupang.com/np/search?q='+urlencode(item)+'&listSize=36&brand=&filterType=&isPriceRange=true&minPrice=5000&maxPrice=30000&channel=user&filter=&rating=0&sorter=salePriceDesc&page='+page
}else if(filter ==	'asc'){
	searchURL = 'http://www.coupang.com/np/search?q='+urlencode(item)+'&listSize=36&brand=&filterType=&isPriceRange=true&minPrice=5000&maxPrice=30000&channel=user&filter=&rating=0&sorter=salePriceAsc&page='+page
}else if(filter == 'rank'){	
	// console.log(rank)
	searchURL = 'http://www.coupang.com/np/search?q='+urlencode(item)+'&listSize=36&brand=&filterType=&isPriceRange=true&minPrice=5000&maxPrice=30000&channel=user&filter=&rating=0&sorter=scoreDesc&page='+page
}
console.log(searchURL);
// searchURL = http://www.coupang.com/np/search?q='+urlencode(item)+'&channel=user'
request(searchURL, function (error, response, body) {
  if (!error && response.statusCode == 200) {

		var $ = cheerio.load(body);
  		var baseUrl = 'http://www.coupang.com'
	    var rows = $('.search-content ').children('ul').children('li');
   		var datas = new Array();


		for (var i = 0 ;i<rows.length;i++){
			var detail = new Object();
			var data  = rows[i].children[0].next.children[0].next.children[0].next.children[0].next.children					
			
			var price = null;
			var delivery = null;
			var rating  = null;
				
			//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@			
			//FOR JUST TEST 
			//TESTBAD
			if(i==0){
				// console.log(rows[i].children[0].next.children[0].next.children[5].next.next.children[1].children[1].children[1].children[2].next["children"][0]['data'])	
				// console.log(rows[i].children[0].next.children[0].next.children[3]['children'][4].next.children[1].children[1].children[1].children[1].children[0]['data'])	
				// price = rows[i].children[0].next.children[0].next.children[3]['children'][4].next.children[1].children[1].children[1].children[1].children[0]['data'];

				//delivery

				// console.log(rows[i].children[0].next.children[0].next.children[5].next.next.children[1].children[1].children[1].children[2].next["children"][0]['data'])
				// console.log(rows[i].children[0].next.children[0].next.children[3].children[1].children[0].next.children[0]['data']);

				// console.log(rows[i].children[0].next.children[0].next.children[3]['children'][7].children[3]);
				// var rating = rows[i].children[0].next.children[0].next.children[3]['children'][7].children[3].children[1].children[0].children[0]['data'];
				// console.log(rating)
			}else if(i==1){
				// console.log(rows[i].children[0].next.children[0].next.children[3]['children'][7]);

				// console.log(rows[i].children[0].next.children[0].next.children[3]['children'][1]['children'][0]['data'])	
			}

			try{
				console.log('price1');
				price = rows[i].children[0].next.children[0].next.children[3]['children'][4].next.children[1].children[1].children[1].children[1].children[0]['data'];
				// console.log(rating)
				//##@@@
				// console.log(rows[i].children[0].next.children[0].next.children[3]['children'][4].next.children[1].children[1].children[1].children[1].children[0]['data'])	
			}catch(err){
				// console.log(rows[i].children[0].next.children[0].next.children[5]['children'][1].children[1].children[1].children[1].children[0]['data'])	
				try{
					console.log('price2');
					price = rows[i].children[0].next.children[0].next.children[3]['children'][6].next.children[1].children[1].children[1].children[1].children[0]['data'];	

				}catch(err){
					console.log('price3');
					price = rows[i].children[0].next.children[0].next.children[5]['children'][1].children[1].children[1].children[1].children[0]['data'];
				}

				
				// console.log(rows[i].children[0].next.children[0].next.children[3]['children'][6].next.children[1].children[1].children[1].children[1].children[0]['data'])	
			}

			try{
				console.log('rating')
				rating = rows[i].children[0].next.children[0].next.children[3]['children'][7].children[3].children[1].children[0].children[0]['data'];
			}catch(err){
				console.log('rating2')
				// console.log(rows[i].children[0].next.children[0].next.children[3].children[9]);
				try{
					// rating=0;
					rating = rows[i].children[0].next.children[0].next.children[3].children[9].children[3].children[1].children[0].children[0]['data'];
					console.log(rating)	
				}catch(err){
					rating=0;
					console.log('no rating!!')
				}

				// if(i==2){
				// 	console.log('2')
				// 	rows_descriptions = rows[i].children[0].next.children[0].next.children[3].children
				// 	console.log(rows_descriptions)

				
				

			}


			try {
				
				// delivery = rows[i].children[0].next.children[0].next.children[5].next.next.children[1].children[1].children[1].children[2].next["children"][0]['data'];
				delivery = rows[i].children[0].next.children[0].next.children[3].children[1].children[0].next.children[0]['data'];
				console.log('gibon')
			}catch(err){
				try{
					console.log('rocket')

					delivery = rows[i].children[0].next.children[0].next.children[3]['children'][1]['children'][1]['data']
				}
				catch(err){
					// console.log(rows[i].children[0].next.children[0].next.children[3].next.next)
					delivery =  '배송비 기본'

				}
				
			}

			//http://www.coupang.com/np/search?q=사과&listSize=36&brand=&filterType=&isPriceRange=true&minPrice=1&maxPrice=30000&page=1&channel=user&filter=&rating=0&sorter=salePriceDesc
			
			//위링크와같은경우 415 상품보기같은 이미지가끼어져있는 경우가있따.
			//그럴경우 data.length가 존재하지만.
			//일반 이미지 등은 data.length가 0 로 됨으로 다시 일반이미지용으로 파싱해줘야한다.

			if(data.length!=0){
				console.log('addingBlock')
				data = rows[i].children[0].next.children[0].next.children[0].next.children[0].next.children					

				for(var j= 0;j<data.length;j++){
					if(data[j]["name"]=='img'){
						imagee = data[j].attribs["src"]		
						detail.marketType = 'coupang'			
						detail.dataLink = baseUrl+data[j].attribs["href"]
						detail.image = imagee.slice(2,imagee.length);
						detail.title = data[j].attribs["alt"];
						detail.price = price
						detail.rating = rating
						datas.push(detail)				
					}
				}				

			}else{
	  			
				console.log('general!')
				data = rows[i].children[0].next.children[0].next.children[0].next.children[1]
				imagee =data.attribs["src"]
				detail.marketType = 'coupang'
				detail.dataLink = baseUrl+rows[i].children[0].next.attribs["href"]
				detail.image = imagee.slice(2,imagee.length);
				detail.title = data.attribs["alt"];
				detail.price = price
				detail.delivery = delivery
				detail.rating = rating
				datas.push(detail)

			}	

		}
		res.status(200).json({
			"ok":true,
			"code":200,
			"data":datas
		})		

  }
  else{
		res.status(400).json({		
			"code":400,
			"data":error
		})		

  }
})

};


exports.naverShop = function(req,res){

console.log('coupang)');
var item = req.param('item');
var filter = req.param('filter'); 
var page = req.param('page');

console.log(item)
console.log(filter)
console.log(page)
var row_delivery;

var searchURL =  ''

if(filter == null){
}else if(filter == 'desc'){
	console.log('filter =>desc')
	searchURL = 'http://shopping.naver.com/search/all.nhn?query='+urlencode(item)+'&pagingSize=40&productSet=total&viewType=list&sort=price_dsc&minPrice=5000&maxPrice=50000&frm=NVSHPRC&sps=N&pagingIndex='+page
}else if(filter ==	'asc'){
	console.log('filter =>asc')
	searchURL = 'http://shopping.naver.com/search/all.nhn?query='+urlencode(item)+'&pagingSize=40&productSet=total&viewType=list&sort=price_asc&minPrice=5000&maxPrice=50000&frm=NVSHPRC&sps=N&pagingIndex='+page
}else if(filter == 'rank'){	
	console.log('filter =>rank')
	searchURL = 'http://shopping.naver.com/search/all.nhn?query='+urlencode(item)+'&pagingSize=40&productSet=total&viewType=list&sort=rel&minPrice=5000&maxPrice=50000&frm=NVSHPRC&sps=N&pagingIndex='+page
}
console.log(searchURL);
// searchURL = http://www.coupang.com/np/search?q='+urlencode(item)+'&channel=user'
request(searchURL, function (error, response, body) {
  if (!error && response.statusCode == 200) {

		var $ = cheerio.load(body);
		
		var datas = new Array();


	    var row_search_list = $('#_search_list')
	    var row_search_list_basis = row_search_list['0'].children[1];
	    // console.log(row_search_list_basis.children[1])
	    
	    // var row_product_list = row_search_list_basis.children[1].children[15];

	    // console.log(row_product_list.children[5].children[3].children[1].children[1].children[0]['data'])
	    
	    for(var i = 7 ; i<row_search_list_basis.children[1].children.length ; i+=8){
	    	//7, 15 ... => 하나하나 긁어나간다 리스트를.
	    	row_product_list = row_search_list_basis.children[1].children[i];
	    	row_delivery = row_product_list.children[5].children[3].children[1].children[1].children[0]['data']
	    
			var detail = new Object();
		    //img
		    row_img_area = row_product_list.children[1];
		    row_img_area_href = row_img_area.children[1]
		    row_img_area_href_src = row_img_area_href.children[1]['attribs']['data-original'];

		    row_info = row_product_list.children[3]
		    row_info_href =  row_info.children[1]

		    row_info_href_link = row_info_href['attribs']['href']
		    row_info_href_title = row_info_href['attribs']['title']


			row_info_price =  row_info.children[3]
			row_info_price_span = row_info_price.next.children[1].children[0].children[0]
			row_info_price_realPrice = row_info_price_span['data'];		

			

			detail.dataLink = row_info_href_link;
			detail.marketType = 'naver'
			detail.image = row_img_area_href_src.slice(7,row_img_area_href_src.length)
			// imagee.slice(2,imagee.length);


			detail.title = row_info_href_title
			detail.price = row_info_price_realPrice
			detail.delivery = row_delivery;
			datas.push(detail)
			


			// //show log
			// console.log(row_info_price_realPrice)
			// console.log(row_info_href_link)
			// console.log(row_info_href_title)
			// console.log(row_img_area_href_src)

		}
		// console.log(datas)
		res.status(200).json({
			"ok":true,
			"code":200,
			"data":datas
		})		
	}else{
		res.status(400).json({
			"code":400,
			"data":error
		})		
	}

})




};