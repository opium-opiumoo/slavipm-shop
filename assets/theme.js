if ((typeof ShopifyAPI) === 'undefined') { ShopifyAPI = {}; }

ShopifyAPI.money_format = "{{amount}}";
ShopifyAPI.formatMoney = function(cents, sign) {
  var format ;
  this.money_format = sign + "{{amount}}";
  if (typeof cents == 'string') { cents = cents.replace('.',''); }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = (format || this.money_format);

  function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal   = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    number = (number/100.0).toFixed(precision);

    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch(formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};


function addToCartButtonStatus(button, status){
  if(status === true){
    button.removeClass('is-added').addClass('is-adding');
    button.attr('disabled', true);
  }
  else if (status === 'clear') {
    button.removeClass('is-adding is-added');
    button.attr('disabled', false)
  }
  else{
    button.removeClass('is-adding').addClass('is-added');
    button.attr('disabled', false)
  }
}
 
function addToCartDrawer(e) {
  e.preventDefault();

  const $addToCartButton = $(`#AddToCartMultiple`);

  addToCartButtonStatus($addToCartButton, true)

  const variantQuantity = $(e.target).find('[name="quantity"]');
  let items = [];
  let frequency = '';

  if($(e.target).find('input[name="purchase-type"][value="Recurring"]:checked').length > 0){
    frequency = $(e.target).find('select#shipping_interval_frequency').val();      
  }

  variantQuantity.each(function(){
    const variantRID = $(this).data('recharge-id');
    const variantID = $(this).data("id")
    const quantity = $(this).val();

    const item = {
      id: frequency.length ? variantRID : variantID,
      quantity,
      properties: frequency.length ? { "shipping_interval_frequency": frequency, "shipping_interval_unit_type": 'weeks' } : ""
    }

    items.push(item)
  })

  items = items.filter(item => item.quantity > 0);

  if(!items.length) {
    addToCartButtonStatus($addToCartButton, false)
    return;
  };
  
  var params = {
    type: "POST",
    url: "/cart/add.js",
    data: { items: items },
    dataType: 'json',
    success: function ({ items }) {
      addToCartButtonStatus($addToCartButton, false)

      items.forEach(lineItem => $addToCartButton.trigger("addItemAddToCartBtn", lineItem));
    },
    error: function (XMLHttpRequest, textStatus) {
      addToCartButtonStatus($addToCartButton, 'clear')
      console.error(XMLHttpRequest, textStatus);
    }
  };

  $.ajax(params);
}



function returnSinglePrice(type){
  let price, discountedPrice, discountedPriceCompare, priceCompare, qty;
  if($('.product_quan_main_right:not(.notify-message-holder)').length <= 0 ){
    qty = 1 ; 
  }
  else {
    qty = getTotalQuantity();
  }
   if($('.main-price').data('price-recharge') == "true"){
    //console.log("recharge-price");
    price = ShopifyAPI.formatMoney(qty*$('.main-price').attr('data-rc-price'), $('.main-price').html().charAt(0)).substr(1);
    priceCompare =  qty*$('.main-price').attr('data-rc-price');
  }
  else { 
    //console.log("onetime-price");
    price = ShopifyAPI.formatMoney(qty*$('.main-price').attr('data-onetime-price'), $('.main-price').html().charAt(0)).substr(1);
    priceCompare = qty*$('.main-price').attr('data-onetime-price'); 
  }



  if(type == "discounted"){
    if($(".discounted-price").attr('data-compare-price') && $(".discounted-price").attr('data-compare-price') != "0" ){
      //console.log('compare-price');
      discountedPrice = ShopifyAPI.formatMoney(qty*$(".discounted-price").attr('data-compare-price'),  $('.main-price').html().charAt(0)).substr(1);
      discountedPriceCompare = qty*$(".discounted-price").attr('data-compare-price');
    }
    else { 
      //console.log('custom-compare-price');
      discountedPrice = ShopifyAPI.formatMoney(qty*$(".discounted-price").attr('data-compare-custom-price'),  $('.main-price').html().charAt(0)).substr(1);
      discountedPriceCompare =  qty*$(".discounted-price").attr('data-compare-custom-price');
    }

    if(discountedPriceCompare > priceCompare){
      $(".discounted-price").removeClass('hide'); 
      $(".discounted-price-currency").removeClass("hide")
    }
    else { 
      $(".discounted-price").addClass('hide'); 
      $(".discounted-price-currency").addClass("hide")
    } 

    return discountedPrice;

  }
  else { 
    if($('.main-price').data('price-recharge') == "true"){
      //console.log($price.html().charAt(0));
      return ShopifyAPI.formatMoney(qty*$('.main-price').attr('data-rc-price'), $('.main-price').html().charAt(0)).substr(1);
    }
    else { 
      //console.log($price.data('onetime-price'));
      return ShopifyAPI.formatMoney(qty*$('.main-price').attr('data-onetime-price'), $('.main-price').html().charAt(0)).substr(1);
    }
  }
}
  


function getTotalQuantity(){ 
  let totalCount = 0;
  $('.product-variant input[name="quantity"]').each(function(){
    totalCount = parseInt(totalCount) + parseInt($(this).val()); 
  })
  //console.log(totalCount);
  $('.main-price').attr('data-quantity', totalCount);
  return totalCount;
}
  

$(document).ready(function() {
  
///
/// Add to cart event
///
$("#AddToCartForm .multiple-product-form").submit(function(e){ addToCartDrawer(e) })
 
///
/// Delivery every field.
///
$("input[name='purchase-type']").on('change', function(){
  //console.log('purchase type');
  switch ($(this).val()) {
    case "Recurring": 
      $('.delivery-every-holder').show();
      $('.main-price').data('price-recharge','true');
      $('.main-price').html(returnSinglePrice());
      $(".discounted-price").html(returnSinglePrice('discounted'));

      break;
    case "One Time":
      $('.delivery-every-holder').hide();
      $('.main-price').data('price-recharge','false');
      $('.main-price').html(returnSinglePrice());
      $(".discounted-price").html(returnSinglePrice('discounted'));

      break; 
  }
})

///
/// Product quantity fields.
///
$('.product-variant input[name="quantity"]').on('change',function(){
  $('.main-price').html(returnSinglePrice());
  $(".discounted-price").html(returnSinglePrice('discounted'));
})
 
/* JOIN THE CIRCLE - loginform checkbox fun*/  
  if($('input[type=checkbox]').prop("checked") == true){
     $('.selc_btns').prop("disabled", false);
   }
  else if($('input[type=checkbox]').prop("checked") == false){  
     $('.selc_btns').prop("disabled", true);
  } 

$('input[type=checkbox]').click(function(){
  if($(this).prop("checked") == true){
     $('.selc_btns').prop("disabled", false);
   }
  else if($(this).prop("checked") == false){  
     $('.selc_btns').prop("disabled", true);
  }
});
  
/* remove "From" text in collection page */
 $(".product_image_caption").each(function(i,v){ 
  	var orgtxt =$(this).html(); 
     var remfrom =orgtxt.replace("From","");
     $(this).html(remfrom);
  });

  
  var speedGet = $(".sliderspeed").attr("value");

  $('.featured-blog_grids').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: speedGet,  
    infinite: true,
    responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
  		autoplaySpeed: speedGet,  
   		infinite: true,
      }
    }
   
  ]
});

  
  /*$('.okeReviews-reviews-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: speedGet,  
    infinite: true,
    responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
  		autoplaySpeed: speedGet,  
   		infinite: true,
      }
    }   
  ]
});*/

 
   $(window).scroll(function() {
      if ($(this).scrollTop() > 32) {
         $("header").addClass("header_fixed_nav");
      }
      else
      {
         $("header").removeClass("header_fixed_nav");
      }
  });

  
  $(".blog-filters-mob-category").click(function(){
    
  	
    $(".blog-filters-mob .blog_lists_main").toggleClass("testclasss");
    
    if($(".blog-filters-mob .blog_lists_main").hasClass("testclasss")){
      $(".blog_lists_main").show()
   
      $(".fa-angle_up").hide();
      $(".fa-angle_down").show();
      
    }
    else
    { 
      $(".blog_lists_main").hide();
      $(".fa-angle_down").hide();
      $(".fa-angle_up").show();
    
    }
   
  });



});


function formatReviewSliderItem(review_item){
    var score = parseInt(review_item.find('.jdgm-rev__rating').data('score'));
    if( score < 5 ){
      review_item.remove();
    }
  	if (!$('#index-reviews-wrapper-nootropics')) {
      var product_link = review_item.find('.jdgm-rev__prod-link');
      var product_link_href = review_item.find('.jdgm-rev__prod-link').attr('href');
      if(typeof product_link != "undefined" && typeof product_link_href != "undefined"){
        product_link_href = product_link_href.substr(0, product_link_href.indexOf('#'));
        product_link.removeAttr('target');
        product_link.attr('href', product_link_href);
      }
    }
   
}

function cbFormatDate(date_item){
  // d is type Date
  var dd = date_item.getDate();
  var mm = date_item.getMonth()+1; 
  var yyyy = date_item.getFullYear();
  if(dd<10){
    dd='0'+dd;
  }
  if(mm<10){
    mm='0'+mm;
  } 
  return dd+'/'+mm+'/'+yyyy;
}

let ajax_products = [];


function initPReviewsSlider() {
  if ($(".index-section-multiple_products").length < 1) {
    return false;
  }
  var pdp_reviews_slider_section = $(".index-section-multiple_products");
  
  pdp_reviews_slider_section.find(".cb-slide-arrow-next").hide();
  pdp_reviews_slider_section.find(".cb-slide-arrow-prev").hide();
  
  var product_ids = [];
  

  document
    .querySelectorAll(".nootrop.trop.grid__item")
    .forEach((element) =>
      product_ids.push(element.getAttribute("data-product-id"))
    );

  var page = 1;
  var per_page = 20;

  let api_links = [];

  for (let i = 0; i < product_ids.length; i++) {
      let url2call =
    "https://judge.me/reviews/reviews_for_widget?url=liveinnermost.myshopify.com&shop_domain=liveinnermost.myshopify.com&platform=shopify&page=" +
    page +
    "&per_page=" +
    per_page +
    "&product_id=" +
    product_ids[i];
    api_links.push(url2call);
  }
  
  ajaxCall(api_links);
 
}


function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function ajaxCall(api_links, loop=0) {
  const pdp_reviews_slider_section = $('.index-section-multiple_products')
  $.ajax({
    url: api_links[loop],
    context: document.body,
  }).done(function(response) {
    loop += 1;
    ajax_products.push(response.html)
    if (api_links.length > loop) {
      ajaxCall(api_links, loop);
    } else {
      let review_items_array = [];
      for (let i = 0; i < ajax_products.length; i++) {
        let response_html_pseudo_div = $(ajax_products[i]).find('.jdgm-rev');
        response_html_pseudo_div.each(function(index,val){
          var review_item = $(this);
          review_items_array.push(review_item);
          formatReviewSliderItem(review_item);
      })
      }
                                      
      shuffle(review_items_array);
        
      for (let i = 0; i < review_items_array.length; i++) {
        if ($('#index-reviews-wrapper-nootropics')) {
            let title = review_items_array[i].data('product-title');
          	let span = document.createElement("span")
            span.classList.add("jdgm-rev__prod-info-wrapper")
            let span_two = document.createElement("span")
            span_two.classList.add("jdgm-rev__prod-link-prefix")
            span.append(span_two);
            let href_value = review_items_array[i].data('product-url')
          	let a = `<a href=${href_value} class=jdgm-rev__prod-link>${title}</a>`
          	span.insertAdjacentHTML("beforeend", a);
          	let timestamp = $(review_items_array[i]).find('.jdgm-rev__timestamp')
            $(review_items_array[i]).find('.jdgm-rev__timestamp').remove();
          	$(review_items_array[i]).find('.jdgm-rev__buyer-badge-wrapper').append(timestamp)
            review_items_array[i].prepend(span);
          }
          pdp_reviews_slider_section.find('#index-reviews-wrapper-nootropics').append(review_items_array[i]);
          

          //special formating
          var review_item_author_full_name = $(review_items_array[i]).find('.jdgm-rev__author-wrapper').data('fullname');
          if(review_item_author_full_name){
            $(review_items_array[i]).find('.jdgm-rev__author').text(review_item_author_full_name);
            /*move author in the beginning of the div*/
            //review_item.find('.jdgm-rev__header').prepend( review_item.find('.jdgm-rev__author') );
          }

          var review_item_date =  $(review_items_array[i]).find('.jdgm-rev__timestamp');
          if(review_item_date.hasClass('jdgm-spinner')){
            review_item_date.removeClass('jdgm-spinner');
            var d = review_item_date.data('content')
            if(typeof d != "undefined" && d){
              d = d.split(' ')[0];
              if(d){
                d = new Date(d);
                review_item_date.text( cbFormatDate(d) );
              }
            }
          }
        } 
                                      
      if(ajax_products.length > 0){
        initIndexReviewsSlider(pdp_reviews_slider_section.find('#index-reviews-wrapper-nootropics'));
      }
    }
  });     
}



function initPDPReviewsSlider(){
  if( $('.index-section-reviews__per_product').length < 1 ){
    return false;
  }
  var pdp_reviews_slider_section = $('.index-section-reviews__per_product');
  
  var product_id = pdp_reviews_slider_section.data('product-id');
  if(typeof product_id == "undefined" || !product_id){
    return false;
  }
  var page = 1;
  var per_page = pdp_reviews_slider_section.data('reviews-to-show');
  if(typeof per_page == 'undefined' || !per_page){
    per_page = 20;
  }
  var url2call = 'https://judge.me/reviews/reviews_for_widget?url=liveinnermost.myshopify.com&shop_domain=liveinnermost.myshopify.com&platform=shopify&page='+ page +'&per_page='+ per_page +'&product_id='+ product_id;
   
  $.ajax({
    url: url2call,
    context: document.body
  }).done(function(response) {
    if(typeof response.html != "undefined" && response.html){
      var response_html_pseudo_div = $(response.html).find('.jdgm-rev');
      var loop_counter = 0;
      response_html_pseudo_div.each(function(index,val){
        var review_item = $(this);
        formatReviewSliderItem(review_item);
        pdp_reviews_slider_section.find('#index-reviews-wrapper').append(review_item);
        loop_counter++;
        
        //special formating
        var review_item_author_full_name = review_item.find('.jdgm-rev__author-wrapper').data('fullname');
        if(review_item_author_full_name){
          review_item.find('.jdgm-rev__author').text(review_item_author_full_name);
          /*move author in the beginning of the div*/
          //review_item.find('.jdgm-rev__header').prepend( review_item.find('.jdgm-rev__author') );
        }
        
        var review_item_date = review_item.find('.jdgm-rev__timestamp');
        if(review_item_date.hasClass('jdgm-spinner')){
          review_item_date.removeClass('jdgm-spinner');
          var d = review_item_date.data('content')
          if(typeof d != "undefined" && d){
            d = d.split(' ')[0];
            if(d){
              d = new Date(d);
              review_item_date.text( cbFormatDate(d) );
            }
          }
        }
      });
      if(loop_counter > 0){
        initIndexReviewsSlider(pdp_reviews_slider_section.find('#index-reviews-wrapper'));
      }
    }
  });
  
}


function initIndexReviewsSlider(index_reviews_slider){
  index_reviews_slider.find('.jdgm-rev').each(function(){
    formatReviewSliderItem($(this));
    /*
    var score = parseInt($(this).find('.jdgm-rev__rating').data('score'));
    if( score < 5 ){
      $(this).remove();
    }
    var product_link = $(this).find('.jdgm-rev__prod-link');
    var product_link_href = $(this).find('.jdgm-rev__prod-link').attr('href');
    if(typeof product_link != "undefined" && typeof product_link_href != "undefined"){
      product_link_href = product_link_href.substr(0, product_link_href.indexOf('#'));
      product_link.removeAttr('target');
      product_link.attr('href', product_link_href);
    }
    */
  });
      var index_reviews_slider__slidesToShow = 3;
      var index_reviews_slider__ap_speed = 3000;
      var index_reviews_slider__ap_speed_mobile = 3000;
      if(typeof index_reviews_slider.data('autoplay-speed') != 'undefined' && index_reviews_slider.data('autoplay-speed')){
        index_reviews_slider__ap_speed = index_reviews_slider.data('autoplay-speed');
        index_reviews_slider__ap_speed_mobile = index_reviews_slider.data('autoplay-speed');
      }
  
      if(typeof index_reviews_slider.data('slides-to-show') != "undefined" && index_reviews_slider.data('slides-to-show')){
        index_reviews_slider__slidesToShow = index_reviews_slider.data('slides-to-show')
      }

  
      /*defaults*/
      var index_reviews_slider_config = {
        slidesToShow: index_reviews_slider__slidesToShow,
        slidesToScroll: 1,
        autoplaySpeed: index_reviews_slider__ap_speed,
        autoplay: true,
        infinite: true,
        pauseOnHover: true,
        pauseOnFocus: true,
        draggable: true,

        //centerMode: true,
        //centerPadding: '120px',
        //arrows: false,
        prevArrow: $(".index-products-wrapper-arrows").find('.cb-slide-arrow-prev'),
        nextArrow: $(".index-products-wrapper-arrows").find('.cb-slide-arrow-next'),
        responsive: [
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplaySpeed: index_reviews_slider__ap_speed_mobile,
              speed: 300,
              draggable: true
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              autoplaySpeed: index_reviews_slider__ap_speed_mobile,
              speed: 300,
              draggable: true
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplaySpeed: index_reviews_slider__ap_speed_mobile,
              speed: 300,
              draggable: true
            }
          }
        ]
      };
      
  
      if( typeof index_reviews_slider.data('continuously') != 'undefined' && index_reviews_slider.data('continuously') ){
        //settings for continuosly sliding desctop
        /*
    	  the real scrolling speed is = slidesToScroll X (animation)speed
          for continuosly sliding with no delay at pauseOnHover -> the slidesToScroll is 0.X
          so to speed up -> increase 'slidesToScroll' OR decrease animation 'speed' (when slidesToScroll is < 1)
        */
        index_reviews_slider_config['slidesToScroll'] = 0.1; //0.1 to not have delay on hover
        index_reviews_slider_config['speed'] = 400;
        index_reviews_slider_config['autoplaySpeed'] = 0;
        index_reviews_slider_config['cssEase'] = 'linear';
        index_reviews_slider_config['draggable'] = false;
        index_reviews_slider_config['prevArrow'] = false;
        index_reviews_slider_config['nextArrow'] = false;
        //for mobile - the pause on hover does not work correcty , so in the index_reviews_slider_config we define the values that differs from the continuosly settings for desctop
      }
  
      index_reviews_slider.slick(index_reviews_slider_config);
  
      if(index_reviews_slider.find('.slick-slide').length <= index_reviews_slider__slidesToShow){
        index_reviews_slider.closest('.section-has-slider').find('.index-products-wrapper-arrows').hide();
      }
}

$(document).on("click", ".cb-slide-arrow-continuously a", function(e){
 //when the ReviewsSlider is on continuously play
 if($(window).width() > 1100){
  e.preventDefault();
  
  var default_speed = 400;
  var speed_acceleration = 50;
  
  var this_trigger = $(this);
  var this_trigger_wrapper = this_trigger.closest('.cb-slide-arrow-continuously');
  var this_slider = this_trigger.closest('.section-has-slider').find('.slick-slider');
  //this_slider[0].slick('slickSetOption', 'slidesToScroll', 1);
  //speed up
  /*
    	the real scrolling speed is = slidesToScroll X (animation)speed
        for continuosly sliding with no delay at pauseOnHover -> the slidesToScroll is 0.X
        so to speed up -> increase 'slidesToScroll' OR decrease animation 'speed' (when slidesToScroll is < 1)
  */
  var cur_speed = this_slider.slick('slickGetOption', 'speed');
  var cur_slidesToScroll = 0.1;//this_slider.slick('slickGetOption', 'slidesToScroll');
  

  //moves by 1 slide
  if( this_trigger.hasClass('cb-slide-arrow-prev') ){
    this_slider.slick('slickSetOption', 'slidesToScroll', -1);
  }
  else if( this_trigger.hasClass('cb-slide-arrow-next') ){
    this_slider.slick('slickSetOption', 'slidesToScroll', 1);
  }
  setTimeout(function(){
    this_slider.slick('slickSetOption', 'slidesToScroll', 0.1);
  }, default_speed); //400
  /*
  this_slider.slick('slickPause');
  this_slider.slick('slickSetOption', 'slidesToScroll', 1);
  setTimeout(function(){
    if( this_trigger.hasClass('cb-slide-arrow-prev') ){
      this_slider.slick('slickPrev');
      console.log(329);
    }
    else if( this_trigger.hasClass('cb-slide-arrow-next') ){
      console.log(331);
      this_slider.slick('slickNext');
    }
    
    setTimeout(function(){
      console.log(34,cur_slidesToScroll);
      this_slider.slick('slickSetOption', 'slidesToScroll', cur_slidesToScroll);
      this_slider.slick('slickPlay');
    }, 500);
  }, 200);
*/
  
  /*
  if(this_trigger.hasClass('active')){
    //speed up
    cur_speed = cur_speed - speed_acceleration;
    if(cur_speed < 50) cur_speed = 50;
  } else {
    //slow down
    cur_speed = cur_speed + speed_acceleration;
    if(cur_speed > default_speed){
      cur_speed = default_speed;
   
      //change direction
      this_trigger_wrapper.find('.active').removeClass('active');
      this_trigger.addClass('active');
      this_slider.slick('slickSetOption', 'speed', default_speed);
      //switch the 'minus' sign to switch the arrows direction
      if(this_trigger.hasClass('cb-slide-arrow-prev')){
        this_slider.slick('slickSetOption', 'slidesToScroll', 0.1);
      }
      if(this_trigger.hasClass('cb-slide-arrow-next')){
        this_slider.slick('slickSetOption', 'slidesToScroll', -0.1);
      }
    }
  }
  this_slider.slick('slickSetOption', 'speed', cur_speed);
  */
 }
});


if ($('#index-reviews-wrapper')) {
	$(document).on("click", "#index-reviews-wrapper .jdgm-rev", function(e){
      //whole review slide is link
      e.preventDefault();
      e.stopPropagation();
      var url = $(this).find('.jdgm-rev__prod-link').attr('href');
      window.location = url.split('#')[0];
    });
}
 else if ($('#index-reviews-wrapper-nootropics')) {
	$(document).on("click", "#index-reviews-wrapper-nootropics .jdgm-rev", function(e){
      //whole review slide is link
      e.preventDefault();
      e.stopPropagation();
      var url = $(this).find('.jdgm-rev__prod-link').attr('href');
      window.location = url.split('#')[0];
    });
}

function initIndexProductsSlider(){
  var index_products_slider = $('#index-products-wrapper');
  var index_products_slidesToShow = index_products_slider.data('slides-to-show');
  var part_to_show_from_siblings = 63; // [%] how much percents to be shown from the prev/next element
  var index_products_slider_side_padding = $( document ).width() * part_to_show_from_siblings / (2*part_to_show_from_siblings + index_products_slidesToShow*100);

  if( index_products_slider.length > 0 ){
    index_products_slider.slick({
      slidesToShow: index_products_slidesToShow,
      //slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: index_products_slider.data('autoplay-speed'),  
      infinite: true,
      centerMode: true,
      centerPadding: index_products_slider_side_padding + 'px',
      //arrows: false,
      prevArrow: index_products_slider.closest('.shopify-section').find('.cb-slide-arrow-prev') || $(".index-section-reviews__per_product").find('.cb-slide-arrow-prev') ,
      nextArrow: index_products_slider.closest('.shopify-section').find('.cb-slide-arrow-next') || $(".index-section-reviews__per_product").find('.cb-slide-arrow-next'),
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 2,
            centerPadding: ($( document ).width() * 60/320) + 'px',
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            centerPadding: '60px',
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            centerPadding: '0px',
          }
        }
      ]
    });
  }
}

function resizeIndexSectionDifferences(){
  if( $('.index-section-differences').length < 1 ){
    return false;
  }
  
  var responsive_breakpoint = 1361;
  var el = $('.index-section-differences').find('.custom--two-thirds .label-wrapper');
  if($( document ).width() >= responsive_breakpoint){
    var new_w = $('header .main-navigation').first().find('ul > li:first > a').offset().left;
    el.css('margin-left',new_w);
  } else {
    el.css('margin-left','');
  }

}

$(window).resize(function(){
  if( $('#index-products-wrapper.slick-initialized').length > 0 ){
    /*
//     $('#index-products-wrapper').slick('unslick');
//     setTimeout(function(){
//       initIndexProductsSlider();
//     }, 1000);
//     */
//     //$('#index-products-wrapper').slick('refresh')
  }
  
  resizeIndexSectionDifferences();
});



$(document).ready(function() {
  resizeIndexSectionDifferences();

  $( ".nav_name" ).each(function() { 
    
    if($(this).next('div').find('.dropdown-third-level').attr('class') =='dropdown-third-level')
    {
      $( this ).parent().removeClass('not-menu-item');
      $( this ).next('div').removeClass('not-mega-menu');
    }
    
  });
  
    initIndexProductsSlider();
    
    var index_reviews_slider = false;
    if ( $('#index-reviews-wrapper').length > 0){	
      index_reviews_slider = $('#index-reviews-wrapper');	
    }
  
    if ( $('#index-reviews-wrapper-nootropics').length > 0) {
      index_reviews_slider =  $('#index-reviews-wrapper-nootropics');
    }
  
    else if( $('#judgeme_product_reviews .jdgm-rev-widg__reviews').length > 0 ){	
      var index_reviews_slider = $('#judgeme_product_reviews .jdgm-rev-widg__reviews');	
    }
  
    if( index_reviews_slider ){
      var wait_for_reviews = setInterval(function(){
        if( index_reviews_slider.find('.jdgm-rev').length > 3 ){
          clearInterval(wait_for_reviews);
          initIndexReviewsSlider(index_reviews_slider);
        }
      }, 500);
    }
  
  	
  if ($(".index-section-multiple_products")) {
  	initPReviewsSlider();
  } if ($('.index-section-reviews__per_product')) {
  	initPDPReviewsSlider();
  }

    


   var count = 0;
  /***Js code ***/
var triggered = false;

function ScrollExecute() {
  
  count += 1
  // Locate loadmore button
  var moreButon = $('#more').last();
  var a= $('#more').attr("data-href");
  var b=a.substr(0, a.length-1); 
  var c=b+(count+1);
  // Get URL from the loadmore button
  var nextUrl = c;
   
  // Button position when AJAX call should be made one time
  if ((($(moreButon).offset().top - $(window).scrollTop()) < 800) && (triggered == false)) {
  
    // Trigger shortcircuit to ensure AJAX only fires once
    triggered = true;

    // Make ajax call to next page for load more data
    $.ajax({
      url: nextUrl,
      type: 'GET',
      beforeSend: function() {
        //moreButon.remove();
        $('.loading').show();
      }
    })
    .done(function(data) {
  	  var item = $(data).find('.ambassadors_bottom-blog').html();
      var $items = $(item);
   if(item.length < 100)
     {
        moreButon.remove();
       
     }
      
  // append items to grid
  	$('.ambassadors_bottom-blog').append($items);
    // add and lay out newly appended items
   //.masonry( 'appended',  $items );

      // $grid.masonry('reloadItems');
  
    
      triggered = false
    });
  }
}/***Js code end ***/


   
     $(document).on("click","#more",function(event){
          event.preventDefault();
          ScrollExecute();
      });  

    $( ".dropdown-third-level" ).mouseenter(function() {
      $(".catalog-menu-default-image").hide();
    });
   $( ".dropdown-third-level" ).mouseleave(function() {
      $(".catalog-menu-default-image").show();
    });

  
});
/* Start Cookie Homepage */

$(document).ready(function() {

$('.subscribe_home').click(function(){	
 
  $.cookie('agreeageomini', 'omnienterpage', { expires: 1 }); 
 });
  var news = $.cookie('agreeageomini');

  $('.exit-intent-overlay').click(function(e){

    $.cookie('agree', 'agree1', { expires: 1 });
    
     if (e.target !== this)
         return;
       setTimeout(function(){
         $('.exit-intent-overlay').addClass('show');

       }, 600000);

  });
    var news1 = $.cookie('agree');
	
  if((news == null || news == undefined) && (news1 == undefined || news1 == null)){
    setTimeout(function(){
      $('.exit-intent-overlay').addClass('show');
      $.cookie('agreenew', 'agreepage', { expires: 1 }); 
      agreepage1 = $.cookie('agreenew');
    }, 120000);
  

  } else{
    $('.exit-intent-overlay').removeClass('show');
  }
 	var agreepage1 = $.cookie('agreenew');   
  
   if((news == null || news == undefined) && (news1 != undefined || news1 != null) && (agreepage1 != undefined || agreepage1 != null))
    {
      setTimeout(function(){
        $('.exit-intent-overlay').addClass('show');
 
      }, 600000);
    }
 
});
/*  End Cookie Homepage */

/* Start Sign up popup validation */

$(document).ready(function(){
 
  $(document).on("click",".exit-intent__content .klaviyo-form-MFbG3B .kNHevG",function(e) {
    
		$(".radio_bt1").attr("checked","checked");
  });
  
});

/*  End Sign up popup validation */

/* Start home Sign up popup validation */

$(document).ready(function(){
 
  $(document).on("click",".home_email .klaviyo-form-MFbG3B .kNHevG",function(e) {
    
		$(".radio_bt").attr("checked","checked");
  });
});

/*  End home Sign up popup validation */


function scrollTopAnimated() { 
  $("html, body").animate({ scrollTop: "0" }); 
} 
