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


var success = false;


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
     success = false;
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
     success = false;
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
ShopifyAPI.addItem = function(variant_id, quantity, properties, callback) {
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
      
      success = true;
    },
    error: function(XMLHttpRequest, textStatus) {
      ShopifyAPI.onError(XMLHttpRequest, textStatus);
    }
  };
  jQuery.ajax(params);
};

ShopifyAPI.addItemToCart = function(variant_id, qty, frequency, unit_type, old_variantID) {
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
        if(old_variantID && typeof old_variantID != "undefined"){
          /*
           We have old_variantID in 2 cases:
           1) update an cart item , that is already recharge - just changing quantity, frequency and other parameters, but not the purchase type.
           		For now it seems, that Recharge has not such functionality, so we are removing the item from the cart and add it again with the new data.
                Here the new 'variant_id' and the old 'old_variantID' are both the variant ID on Rechagre.
           2) make cart item from "normal purchase type" to "recharge (subscription) purchase type"
           		old_variantID is the variant ID on normal purchase, and the new ID 'variant_id' is the variant on Recharge.
                We remove the one item and add the new one.
          */
          if(variant_id == old_variantID){
            location.reload(); //updates the cart view
          } else {
            removeOldVariant(old_variantID); //in the success of this function the page is reloaded
          }
        } else {
          ShopifyAPI.moveAlongR();
          success = true;
        }
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
