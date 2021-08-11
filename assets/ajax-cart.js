/*============================================================================
  Ajax the add to cart experience by revealing it in a side drawer
  Plugin Documentation - http://shopify.github.io/Timber/#ajax-cart
  (c) Copyright 2015 Shopify Inc. Author: Carson Shold (@cshold). All Rights Reserved.

  This file includes:
    - Basic Shopify Ajax API calls
    - Ajax cart plugin

  This requires:
    - jQuery 1.8+
    - handlebars.min.js (for cart template)
    - modernizer.min.js
    - snippet/ajax-cart-template.liquid

  Customized version of Shopify's jQuery API
  (c) Copyright 2009-2015 Shopify Inc. Author: Caroline Schnapp. All Rights Reserved.
==============================================================================*/
if ((typeof ShopifyAPI) === 'undefined') { ShopifyAPI = {}; }

/*============================================================================
  API Helper Functions
==============================================================================*/
function attributeToString(attribute) {
  if ((typeof attribute) !== 'string') {
    attribute += '';
    if (attribute === 'undefined') {
      attribute = '';
    }
  }
  return jQuery.trim(attribute);
};

/*============================================================================
  API Functions
==============================================================================*/
ShopifyAPI.onCartUpdate = function(cart) {  	 
     console.info('There are now ' + cart.item_count + ' items in the cart.');
      window.location.href="/cart";      
};


ShopifyAPI.money_format = "";
ShopifyAPI.formatMoney = function(cents, sign) {
  var format ;
  this.money_format = sign + "";
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

ShopifyAPI.updateCartNote = function(note, callback) {
  var params = {
    type: 'POST',
    url: '/cart/update.js',
    data: 'note=' + attributeToString(note),
    dataType: 'json',
    success: function(cart) {
      if ((typeof callback) === 'function') {
        callback(cart);
      }
      else {
        ShopifyAPI.onCartUpdate(cart);
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      ShopifyAPI.onError(XMLHttpRequest, textStatus);
    }
  };
  jQuery.ajax(params);
};

ShopifyAPI.onError = function(XMLHttpRequest, textStatus) {
  var data = eval('(' + XMLHttpRequest.responseText + ')');
  if (!!data.message) {
    alert(data.message + '(' + data.status  + '): ' + data.description);
  }
};

/* adding the queue for async adding of multiple products */ 

ShopifyAPI.queue  = [];
ShopifyAPI.queueR = [];



ShopifyAPI.moveAlong = function(callback) {
    if (ShopifyAPI.queue.length) {
      var request = ShopifyAPI.queue.shift();
     // ShopifyAPI.addItemFromForm(request.form, ShopifyAPI.moveAlong);
      
	 ShopifyAPI.addItem(request.variantId, request.quantity, request.properties);
     //console.log('One Time length is ' + ShopifyAPI.queue.length);
    }
    else {
    }
  };


ShopifyAPI.moveAlongR = function(callback) {
    if (ShopifyAPI.queueR.length) {
      var request = ShopifyAPI.queueR.shift();
     // ShopifyAPI.addItemFromForm(request.form, ShopifyAPI.moveAlong);
      //console.log(request.variantId);
	 ShopifyAPI.addItemToCart(request.variantId, request.quantity, request.frequency, request.unit_type);
     //console.log('Multiple length is ' + ShopifyAPI.queueR.length);
    }
    else {
    }
  };

/*

  function push_to_queue(form, callback) {
    ShopifyAPI.queue.push({
      form: form
    });
     if(typeof callback === 'function'){
          callback();
     }
  }
  
  */


function push_to_queue(variantID, quantity, properties,callback) {
    ShopifyAPI.queue.push({
      variantId: variantID,
      quantity: quantity,
      properties: properties
    });
     if(typeof callback === 'function'){
          callback();
     }
  }

function push_to_queue_recharge(variantID, quantity,frequency,unit_type, properties,callback) {
  
    ShopifyAPI.queueR.push({
      variantId: variantID,
      quantity: quantity,
      frequency: frequency,
      unit_type: unit_type,
      properties: properties
    });
     if(typeof callback === 'function'){
          callback();
     }
  }




// -------------------------------------------------------------------------------------
// POST to cart/add.js returns the JSON of the line item associated with the added item.
// -------------------------------------------------------------------------------------
ShopifyAPI.addItem = function(variant_id, quantity, callback) {
  var quantity = quantity || 1;
  var params = {
    type: 'POST',
    url: '/cart/add.js',
    data: 'quantity=' + quantity + '&id=' + variant_id,
    dataType: 'json',
    success: function(line_item) {
      ShopifyAPI.moveAlong();
      if ((typeof callback) === 'function') {
        callback(line_item);
        //console.log('moving');
      }
      else {
        //ShopifyAPI.onItemAdded(line_item);
        //console.log('finished');
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      ShopifyAPI.onError(XMLHttpRequest, textStatus);
    }
  };
  jQuery.ajax(params);
};

ShopifyAPI.addItemToCart = function(variant_id, qty, frequency, unit_type) {
    data = {
      "id": variant_id,
      "quantity": qty,
      "properties": {
        "shipping_interval_frequency": frequency,
        "shipping_interval_unit_type": unit_type
      }
    }
    jQuery.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: data,
      dataType: 'json',
      success: function() { 
        ShopifyAPI.moveAlongR(); 
      },
      error: function(req, err){
        //console.log('my message' + err);
      }

        
    });
  }



/*============================================================================
  POST to cart/add.js returns the JSON of the cart
    - Allow use of form element instead of just id
    - Allow custom error callback
==============================================================================*/
ShopifyAPI.addItemFromForm = function(form, callback, errorCallback) {
  var params = {
    type: 'POST',
    url: '/cart/add.js',
    data: jQuery(form).serialize(),
    dataType: 'json',
    success: function(line_item) {
      if ((typeof callback) === 'function') {
        callback(line_item, form);
        //console.log('we here');
      }
      else {
        ShopifyAPI.onItemAdded(line_item, form);
        //console.log('we here 2');
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      if ((typeof errorCallback) === 'function') {
        errorCallback(XMLHttpRequest, textStatus);
      }
      else {
        ShopifyAPI.onError(XMLHttpRequest, textStatus);
      }
    }
  };
  jQuery.ajax(params);
};

// Get from cart.js returns the cart in JSON
ShopifyAPI.getCart = function(callback) {
  jQuery.getJSON('/cart.js', function (cart, textStatus) {
    if ((typeof callback) === 'function') {
      callback(cart);
    }
    else {
      ShopifyAPI.onCartUpdate(cart);
    }
  });
};

// POST to cart/change.js returns the cart in JSON
ShopifyAPI.changeItem = function(variant_id, quantity, line, callback) {
  var params = {
    type: 'POST',
    url: '/cart/change.js',
    data:  'quantity='+quantity+'&id='+variant_id+'&line='+line,
    dataType: 'json',
    success: function(cart) {
      if ((typeof callback) === 'function') {
        callback(cart);
      }
      else {
        ShopifyAPI.onCartUpdate(cart);
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      ShopifyAPI.onError(XMLHttpRequest, textStatus);
    }
  };
  jQuery.ajax(params);
};

/*============================================================================
  Ajax Shopify Add To Cart
==============================================================================*/
/* For IE11 */
$.ajaxSetup({ cache: false });

var ajaxCart = (function(module, $) {

  'use strict';

  // Public functions
  var init, loadCart;

  // Private general variables
  var settings, $body, onCartPage;

  // Private plugin variables
  var $formContainer, $form, $addToCart, $cartCountSelector, $cartCostSelector, $cartContainer, $drawerContainer, $addToCartMultiple, $multipleForm, $qtySelectorMulti, $addToCartType, $purchaseType, $deliverEvery, $purchaseTypeHolder, $qtySelector, $price, $discountedPrice;

  // Private functions
  var updateCountPrice, formOverride, itemAddedCallback, itemCheckIfAddToCartComplete, itemErrorCallback, cartUpdateCallback, buildCart, cartCallback, adjustCart, adjustCartCallback, createQtySelectors, qtySelectors, validateQty, removeItem, addCustomItems, showDeliverEvery, showPurchaseType, getTotalQuantity, dynamicCalculations, returnSinglePrice;

  /*============================================================================
    Initialise the plugin and define global options
  ==============================================================================*/
    init = function (options) {
    onCartPage = window.location.pathname === "/cart";

    // Default settings
    settings = {
      formContainerSelector: "#AddToCartForm",
      formSelector: 'form[action^="/cart/add"]',
      multipleForm: '.multiple-product-form',
      cartContainer: '#CartContainer',
      addToCartSelector: '#AddToCart',
      addToCartMultiple: '#AddToCartMultiple',
      qtySelector : "input[name='quantity']",
      purchaseType: "input[name='purchase-type']",
      purchaseTypeHolder: '.purchase-type',
      deliverEvery: ".delivery-every-holder",
      qtySelectorMulti: '.product-variant input[name="quantity"]',
      price: '.main-price',
      discountedPrice: ".discounted-price",
      cartCountSelector: null,
      cartCostSelector: null,
      moneyFormat: '$',
      disableAjaxCart: false,
      enableQtySelectors: onCartPage
      
    };

    // Override defaults with arguments
    $.extend(settings, options);

    // Select DOM elements
    $formContainer     = $(settings.formContainerSelector);
    $form              = $formContainer.find(settings.formSelector);
    $cartContainer     = $(settings.cartContainer);
    $addToCart         = $formContainer.find(settings.addToCartSelector);
    $cartCountSelector = $(settings.cartCountSelector);
    $cartCostSelector  = $(settings.cartCostSelector);
    $addToCartMultiple = $(settings.addToCartMultiple);
    $multipleForm	   = $(settings.multipleForm);
    $qtySelector 	   = $(settings.qtySelector);
    $purchaseType      = $(settings.purchaseType);
    $deliverEvery 	   = $(settings.deliverEvery);
    $purchaseType	   = $(settings.purchaseType);
    $qtySelectorMulti  = $(settings.qtySelectorMulti);
    $price			   = $(settings.price);
    $discountedPrice   = $(settings.discountedPrice);

    // General Selectors
    $body = $('body');
    
       
    // Setup ajax quantity selectors on the any template if enableQtySelectors is true
    if (settings.enableQtySelectors) {
      qtySelectors();
    }

    // Take over the add to cart form submit action if ajax enabled
    if (!settings.disableAjaxCart) {
      if($addToCartMultiple.length || $addToCart.length){
      //console.log('here');
     // formOverride();
      addCustomItems();
      }
    }

    // Run this function in case we're using the quantity selector outside of the cart
    adjustCart();
    removeItem();
    showDeliverEvery();
    dynamicCalculations();
  };


  loadCart = function () {
    $body.addClass('drawer--is-loading');
    ShopifyAPI.getCart(cartUpdateCallback);
   
    //CartItems();
  };
  
  dynamicCalculations = function () { 
    //console.log('dynamic calcluations');
    $('.product-variant input').change(function(){
      //console.log('change detected');
    })
    
    $qtySelectorMulti.on('change',function(){
      $price.html(returnSinglePrice());
      $discountedPrice.html(returnSinglePrice('discounted'));
      
    })
    
  };
  
  returnSinglePrice = function(type){
    let price, discountedPrice;
    
    if($price.data('price-recharge') == "true"){
      price = ShopifyAPI.formatMoney(getTotalQuantity()*$price.attr('data-rc-price'), $price.html().charAt(0));
    }
    else { 
      price = ShopifyAPI.formatMoney(getTotalQuantity()*$price.attr('data-onetime-price'), $price.html().charAt(0));
    }
      
    
    
    if(type == "discounted"){
      if($discountedPrice.attr('data-compare-price') && $discountedPrice.attr('data-compare-price') != "0" ){
       //console.log('compare-price');
       discountedPrice = ShopifyAPI.formatMoney(getTotalQuantity()*$discountedPrice.attr('data-compare-price'),  $price.html().charAt(0));
      }
      else { 
      //console.log('custom-compare-price');
      discountedPrice = ShopifyAPI.formatMoney(getTotalQuantity()*$discountedPrice.attr('data-compare-custom-price'),  $price.html().charAt(0));
      }
      
      //console.log(discountedPrice  + " vs " + price);
      if(discountedPrice == price){
       $discountedPrice.addClass('hide'); 
      }
      else { 
        $discountedPrice.removeClass('hide'); 
      } 
      
    return discountedPrice;
      
    }
    else { 
      if($price.data('price-recharge') == "true"){
    //console.log($price.html().charAt(0));
    return ShopifyAPI.formatMoney(getTotalQuantity()*$price.attr('data-rc-price'), $price.html().charAt(0));
  }
  else { 
    //console.log($price.data('onetime-price'));
    return ShopifyAPI.formatMoney(getTotalQuantity()*$price.attr('data-onetime-price'), $price.html().charAt(0));
    
  }
  }
  }
  


  updateCountPrice = function (cart) {
    if ($cartCountSelector) {
      $cartCountSelector.html(cart.item_count).removeClass('hidden-count');

      if (cart.item_count === 0) {
        $cartCountSelector.addClass('hidden-count');
      }
    }
    if ($cartCostSelector) {
      $cartCostSelector.html(Shopify.formatMoney(cart.total_price, settings.moneyFormat));
    }
  };

  
  formOverride = function () {
   
    $form.on('submit', function(evt) {
      evt.preventDefault();
      //console.log('adding item to cart');
      // Add class to be styled if desired
      $addToCart.removeClass('is-added').addClass('is-adding');

      // Remove any previous quantity errors
      $('.qty-error').remove();

      ShopifyAPI.addItemFromForm(evt.target, itemAddedCallback, itemErrorCallback);
    });
  };
  
  addCustomItems = function () {
      $addToCartType = "one-time";
      $multipleForm.on('submit', function(evt){
          evt.preventDefault();
        //console.log('submitted');
          
        if($(this).find('input[name="purchase-type"][value="Recurring"]:checked').length > 0 ){
          $addToCartType = "recurring";
          var frequency =  $(this).find('select#shipping_interval_frequency').val();     
          
        }
       
        
        
        $(this).find($qtySelector).each(function(){ 
          let variantID = $(this).data('id'),
              variantRID = $(this).data('recharge-id'),
          	  qty = $(this).val();
              
          //console.log('add to cart type: ' + $addToCartType);
          if($addToCartType == "one-time"){
         push_to_queue(variantID, qty ,{});
         }
          else {
          push_to_queue_recharge(variantRID, qty, frequency,"weeks", {});    
          }
          
        })
        if($addToCartType == "one-time"){
        ShopifyAPI.moveAlong();
        }
        else { 
        ShopifyAPI.moveAlongR();
        }

        
          //console.log(ShopifyAPI.queue.length);
       itemCheckIfAddToCartComplete(ShopifyAPI.queue.length);
        
      // $(this).submit();
  })
  };
  itemCheckIfAddToCartComplete = function(){ 
    //console.log('queue is:' + ShopifyAPI.queue.length);
    if(ShopifyAPI.queue.length == 0 ){
      setTimeout(function(){itemAddedCallback()},300);
    }
    else { 
      setTimeout(function(){itemCheckIfAddToCartComplete(ShopifyAPI.queue.length)}, 200);
    }

     
  }
  
  showDeliverEvery = function (){ 
    $purchaseType.on('change', function(){
      //console.log('purchase type');
      switch ($(this).val()) {
        case "Recurring": 
          $deliverEvery.show();
          $price.data('price-recharge','true');
          $price.html(returnSinglePrice());
          $discountedPrice.html(returnSinglePrice('discounted'));
          $addToCartMultiple.text('Subscribe');


          break;
        case "One Time":
          $deliverEvery.hide();
          $price.data('price-recharge','false');
          $price.html(returnSinglePrice());
          $discountedPrice.html(returnSinglePrice('discounted'));
          $addToCartMultiple.text('Add To Cart');


          break; 
      }
    })
  }
  
  getTotalQuantity = function(){ 
    let totalCount = 0;
    $qtySelectorMulti.each(function(){
      totalCount = parseInt(totalCount) + parseInt($(this).val()); 
      
    })
    //console.log(totalCount);
    $price.attr('data-quantity', totalCount);
    return totalCount;
  }
  
  itemAddedCallback = function (product) {
    $addToCart.removeClass('is-adding').addClass('is-added');

    ShopifyAPI.getCart(cartUpdateCallback);
  };

  itemErrorCallback = function (XMLHttpRequest, textStatus) {
    var data = eval('(' + XMLHttpRequest.responseText + ')');
    $addToCart.removeClass('is-adding is-added');

    if (!!data.message) {
      if (data.status == 422) {
        $formContainer.after('<div class="errors qty-error">'+ data.description +'</div>')
      }
    }
  };

  cartUpdateCallback = function (cart) {
    // Update quantity and price
    updateCountPrice(cart);
    buildCart(cart);
  };

  removeItem = function(){
    $cartContainer.on('click', '.js-remove-from-cart', function(e){
      var id = $(e.target).attr('data-id');
      var line = $(e.target).attr('data-line');

      ShopifyAPI.changeItem(id, 0, line, function(cart){
        var $row = $(e.target).parents('.ajaxcart__product');
        $row.addClass('is-removed');

        //Make sure the remove item animation is done
        setTimeout(function(){
          cartUpdateCallback(cart);
        }, 1000);

      });

    });
  };

  buildCart = function (cart) {
    // Start with a fresh cart div
    $cartContainer.empty();


    // Handlebars.js cart layout
    var items = [],
        item = {},
        data = {},
        source = $("#CartTemplate").html(),
        template = Handlebars.compile(source);
		var item_json = [];
    	
    // Add each item to our handlebars.js data
    $.each(cart.items, function(index, cartItem) {
      var itemAdd = cartItem.quantity + 1,
          itemMinus = cartItem.quantity - 1,
          itemQty = cartItem.quantity;

      /* Hack to get product image thumbnail
       *   - If image is not null
       *     - Remove file extension, add _small, and re-add extension
       *     - Create server relative link
       *   - A hard-coded url of no-image
      */

      if (cartItem.image != null){
        var prodImg = cartItem.image.replace(/(\.[^.]*)$/, "_210x$1").replace('http:', '');
      } else {
        var prodImg = "//cdn.shopify.com/s/images/themes/product-1.png";
      }

      var prodName = cartItem.product_title,
          prodVariation = cartItem.variant_title;

      if (prodVariation == 'Default Title') {
        prodVariation = false;
      }

      // Create item's data object and add to 'items' array
      item = {
        id: cartItem.variant_id,
        line: index + 1,
        url: cartItem.url,
        img: prodImg,
        name: prodName,
        variation: prodVariation,
        itemAdd: itemAdd,
        itemMinus: itemMinus,
        itemQty: itemQty,
        price: Shopify.formatMoney(cartItem.price, settings.moneyFormat),
        numerousItems: itemQty > 1,
        vendor: cartItem.vendor,
        properties: cartItem.properties
      };

      items.push(item);
      
      var temp = [];

      temp['quantity'] = cartItem.quantity;
      temp['handle'] = cartItem.handle;
      temp['Vid'] = cartItem.variant_id;
      if(cartItem.variant_title == null){
        cartItem.variant_title = "Default Title";
      }
      temp['variant_title'] = cartItem.variant_title;
      item_json.push(temp);
      
    });

    if(item_json.length != '0'){
      loadMultiCart(item_json);
    }

    // Gather all cart data and add to DOM
    data = {
      items: items,
      note: cart.note,
      totalPrice: Shopify.formatMoney(cart.total_price, settings.moneyFormat)
    }

    $cartContainer.append(template(data));

    cartCallback(cart);
    var width = $(window).width();
    if(width>=320 && width<=767){
      var defaultCurrency = 'GBP';
      var cookieCurrency = jQuery('.mobile-header-message-currency').find('.currency-picker').val();
     // Currency.convertAll(defaultCurrency, cookieCurrency, 'span.money');
    }else{
      var defaultCurrency = 'GBP';
      var cookieCurrency = jQuery('#announcement-bar').find('.currency-picker').val();
      //Currency.convertAll(defaultCurrency, cookieCurrency, 'span.money');
    }
  };

  cartCallback = function(cart) {
    $body.removeClass('drawer--is-loading');
    $body.trigger('ajaxCart.afterCartLoad', cart);
	

  };

  adjustCart = function () {
    // Delegate all events because elements reload with the cart

    // Add or remove from the quantity
    $body.on('click', '.ajaxcart__qty-adjust', function() {
      var el = $(this),
          id = el.data('id'),
          line = el.data('line'),
          qtySelector = el.siblings('.ajaxcart__qty-num'),
          qty = parseInt(qtySelector.val().replace(/\D/g, ''));

      var qty = validateQty(qty);

      // Add or subtract from the current quantity
      if (el.hasClass('ajaxcart__qty--plus')) {
        qty = qty + 1;
      } else {
        qty = qty - 1;
        if (qty <= 0) qty = 0;
      }

      // If it has a data-id, update the cart.
      // Otherwise, just update the input's number
      if (id) {
        updateQuantity(id, qty, line);
      } else {
        qtySelector.val(qty);
      }
   
      
    });

    // Update quantity based on input on change
    $body.on('change', '.ajaxcart__qty-num', function() {
      var el = $(this),
          id = el.data('id'),
          line = el.data('line'),
          qty = parseInt(el.val().replace(/\D/g, ''));

      var qty = validateQty(qty);

      // Only update the cart via ajax if we have a variant ID to work with
      if (id) {
        updateQuantity(id, qty, line);
      }
    });

    // Highlight the text when focused
    $body.on('focus', '.ajaxcart__qty-adjust', function() {
      var el = $(this);
      setTimeout(function() {
        el.select();
      }, 50);
    });

    // Save note anytime it's changed
    $body.on('change', 'textarea[name="note"]', function() {
      var newNote = $(this).val();

      // Update the cart note in case they don't click update/checkout
      ShopifyAPI.updateCartNote(newNote, function(cart) {});
    });
  };

  adjustCartCallback = function (cart) {
    // Update quantity and price
    updateCountPrice(cart);

    // Reprint cart on short timeout so you don't see the content being removed
    setTimeout(function() {
      ShopifyAPI.getCart(buildCart);
    }, 150)
  };

  createQtySelectors = function() {
    // If there is a normal quantity number field in the ajax cart, replace it with our version
    if ($('input[type="number"]', $cartContainer).length) {
      $('input[type="number"]', $cartContainer).each(function() {
        var el = $(this),
            currentQty = el.val();

        var itemAdd = currentQty + 1,
            itemMinus = currentQty - 1,
            itemQty = currentQty;

        var source   = $("#AjaxQty").html(),
            template = Handlebars.compile(source),
            data = {
              id: el.data('id'),
              itemQty: itemQty,
              itemAdd: itemAdd,
              itemMinus: itemMinus
            };

        // Append new quantity selector then remove original
        el.after(template(data)).remove();
      });
    }

    // If there is a regular link to remove an item, add attributes needed for ajax
    if ($('a[href^="/cart/change"]', $cartContainer).length) {
      $('a[href^="/cart/change"]', $cartContainer).each(function() {
        var el = $(this).addClass('ajaxcart__remove');
      });
    }
  };

  qtySelectors = function() {
    // Change number inputs to JS ones, similar to ajax cart but without API integration.
    // Make sure to add the existing name and id to the new input element
    var numInputs = $('input[type="number"]');

    if (numInputs.length) {
      numInputs.each(function() {
        var el = $(this),
            currentQty = el.val(),
            inputName = el.attr('name'),
            inputId = el.attr('id');

        var itemAdd = currentQty + 1,
            itemMinus = currentQty - 1,
            itemQty = currentQty;

        var source   = $("#JsQty").html(),
            template = Handlebars.compile(source),
            data = {
              id: el.data('id'),
              itemQty: itemQty,
              itemAdd: itemAdd,
              itemMinus: itemMinus,
              inputName: inputName,
              inputId: inputId
            };

        // Append new quantity selector then remove original
        el.after(template(data)).remove();
      });

      // Setup listeners to add/subtract from the input
      $('.js-qty__adjust').on('click', function() {
        var el = $(this),
            id = el.data('id'),
            line = el.data('line'),
            qtySelector = el.siblings('.js-qty__num'),
            qty = parseInt(qtySelector.val().replace(/\D/g, ''));

        var qty = validateQty(qty);

        // Add or subtract from the current quantity
        if (el.hasClass('js-qty__adjust--plus')) {
          qty = qty + 1;
        } else {
          qty = qty - 1;
          if (qty <= 1) qty = 1;
        }

        //Update quantity via ajax, without showing the ajaxacrt
        updateQuantity(id, qty, line, true);
        // Update the input's number
        qtySelector.val(qty);
      });
    }
  };

  validateQty = function (qty) {
    if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
      // We have a valid number!
    } else {
      // Not a number. Default to 1.
      qty = 1;
    }
    return qty;
  };

  //Moved updateQuantity into the top-level namespace for this module, so that
  //we can have the ability to update cart total on the cart page via ajax.

  function updateQuantity(id, qty, line, disableShowCart) {
    // Add activity classes when changing cart quantities
    var row = $('.ajaxcart__row[data-id="' + id + '"]').addClass('is-loading');

    if (qty === 0) {
      row.parent().addClass('is-removed');
    }

    // Slight delay to make sure removed animation is done
    setTimeout(function() {
      if (disableShowCart){
        ShopifyAPI.changeItem(id, qty, line);
      }
      else {
        ShopifyAPI.changeItem(id, qty, line, adjustCartCallback);
      }

    }, 250);
  }

  module = {
    init: init,
    load: loadCart
  };

  return module;

}(ajaxCart || {}, jQuery));
