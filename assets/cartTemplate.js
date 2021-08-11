///
///
/// The new cart drawer denied access to the cart page
///
//

// //recharge
// function checkRechargeSubInputsVisibility(cart_item_row){
//   if( cart_item_row.find('.purchase-type--subscribe').is(":checked") ){
//     cart_item_row.find('.delivery-every-holder').show();
//   } else {
//     cart_item_row.find('.delivery-every-holder').hide();
//   }
// }

// function removeOldVariant(old_variantID){
//   $.ajax({
//        method: 'POST',
//        url: '/cart/change.js',
//        data: { quantity: 0, id: old_variantID },
//        dataType: 'json',
//        beforeSend: () => {
//          //addOverlay(item);
//        },
//        success: () => {
//          location.reload(); //updates the cart view
//        }
//     })
// }

// $(document).on('change', '.cart-template__product__recharge :input:not(.purchase-type-input)', function(){
//   //for the inputs of single cart item [on recharge only - for the other items is the standart logic]
//   var cart_item_row = $(this).closest('.cart-template__product');
//   var chosen_purchase_type = cart_item_row.find('.purchase-type-input:checked').val().toLowerCase();
//   addOverlay(cart_item_row);

//   var variantID = cart_item_row.data('variant-id'), /*here it is = variantRID*/
//       variantNormalID = cart_item_row.data('normal-id'),
//       variantRID = cart_item_row.data('recharge-id'),
//       qty = cart_item_row.find('.product-info__qty select').val(),
//       frequency = cart_item_row.find('.shipping_interval_frequency').val();
//   var old_variantID = variantID;

//   //check if the selected options combo have different variantID
//   var newVariantTitle = '';
//   cart_item_row.find('.product-info__variatns .variatns__selector .select2-selection__rendered').each((index, element) => {
//       newVariantTitle += `${element.innerText} / `;
//   })
//   newVariantTitle = newVariantTitle.replace(/.\/.$|.\/$/m, '');
//   var item_variants = cart_item_row.data('variants-combo');
//   if(typeof item_variants != "undefinded" && item_variants){
//     if(typeof item_variants != 'object'){;
//       item_variants = JSON.parse(item_variants);
//     }
//     if(typeof newVariantTitle != "undefinded" && newVariantTitle){
//       $.each(item_variants, function (key,val) {
//         //console.log(val +"  "+ newVariantTitle)
//         if(val == newVariantTitle){
//           variantID = key;
//         }
//       });
//     }
//   } else {
//     item_variants = false;
//   }
//   //end check diff variantID

//   if(chosen_purchase_type == 'recurring'){
//     //to update an item on subscription -> first we remove the old and then add, because the new variant and the old one have the same ID on update (for both variantID is the variantRID)
//     //on changing the purchse type -> the 2 IDs are different -> variantNormalID and variantRID
//     //see ajax-cart-new.js / ShopifyAPI.addItemToCart for more
//     $.ajax({
//        method: 'POST',
//        url: '/cart/change.js',
//        data: { quantity: 0, id: old_variantID },
//        dataType: 'json',
//        beforeSend: () => {
//          //addOverlay(item);
//        },
//        success: () => {
//          ShopifyAPI.addItemToCart(variantID, qty, frequency, "Weeks", old_variantID);
//        }
//     });

//     /* //todo check Recharge for functionality to update a item in the cart
//     var data = {
//       "id": variantID,
//       "quantity": qty,
//       "properties": {
//         "shipping_interval_frequency": frequency,
//         "shipping_interval_unit_type": "Weeks"
//       }
//     };

//     jQuery.ajax({
//       type: 'POST',
//       url: '/cart/change.js', //or update.js
//       data:  data,
//       dataType: 'json',
//       success: function(cart) {
//         console.log('after frequency change');
//         //console.log(cart);
//         if ((typeof callback) === 'function') {
//           //callback(cart);
//         }
//         else {
//           //ShopifyAPI.onCartUpdate(cart);
//         }
//       },
//       error: function(XMLHttpRequest, textStatus) {
//         ShopifyAPI.onError(XMLHttpRequest, textStatus);
//       }
//     });
//     */
//   }
// });
// $(document).on('change', '.purchase-type-input', function(){
//   var cart_item_row = $(this).closest('.cart-template__product');
//   var chosen_purchase_type = $(this).val().toLowerCase();
//   checkRechargeSubInputsVisibility(cart_item_row);
//   addOverlay(cart_item_row);

//   var variantID = cart_item_row.data('variant-id'),
//       variantNormalID = cart_item_row.data('normal-id'),
//       variantRID = cart_item_row.data('recharge-id'),
//       qty = cart_item_row.find('.product-info__qty select').val(),
//       frequency = cart_item_row.find('.shipping_interval_frequency').val();
//   var old_variantID = variantID;

//   if(chosen_purchase_type == 'recurring'){
//     ShopifyAPI.addItemToCart(variantRID, qty, frequency, "Weeks", old_variantID);
//   } else {
//     //val is 'one time'
//     jQuery.ajax({
//       type: 'POST',
//       url: '/cart/add.js',
//       data: 'quantity=' + qty + '&id=' + variantNormalID,
//       dataType: 'json',
//       success: function(line_item) {
//         removeOldVariant(old_variantID)
//       },
//       error: function(XMLHttpRequest, textStatus) {
//         ShopifyAPI.onError(XMLHttpRequest, textStatus);
//       }
//     });
//   }

// });
// //end recharge

// const removeItem = (itemId, item) => {
//   $.ajax({
//     method: 'POST',
//     url: '/cart/change.js',
//     data: { quantity: 0, id: itemId },
//     dataType: 'json',
//     beforeSend: () => {
//       addOverlay(item);
//     },
//     success: () => {
//       item.remove();
//       updateCartNumber();
//     }
//   })
// }

// const updateItem = (itemId, item, newVariantTitle, handle, qty) => {
//   $.ajax({
//     method: 'POST',
//     url: '/cart/change.js',
//     data: { quantity: 0, id: itemId },
//     dataType: 'json',
//     beforeSend: () => {
//       addOverlay(item);
//     },
//     success: () => {
//       $.ajax({
//         method: 'GET',
//         url: `/products/${handle}.js`,
//         dataType: 'json',
//         success: data => {
//           for (const variant in data.variants) {
//             if (data.variants[variant].public_title === newVariantTitle) {
//               $.ajax({
//                 method: 'POST',
//                 url: '/cart/add.js',
//                 data: { quantity: qty, id: data.variants[variant].id },
//                 dataType: 'json',
//                 success: () => {
//                   updateCartNumber();
//                   removeOverlay(item);
//                 }
//               })
//             }
//           }
//         }
//       })
//     }
//   })
// }
// /*
// Already declared in multi-currency.liquid
// const reChargeProcessCart() => {
// 	function get_cookie(name){ return( document.cookie.match('(^|; )'+name+'=([^;]*)')||0 )[2] }
// 	do {
//       		token=get_cookie('cart');
// 	}
// 	while(token == undefined);

// 	var myshopify_domain='{{ shop.permanent_domain }}'
// 	try { var ga_linker = ga.getAll()[0].get('linkerParam') } catch(err) { var ga_linker ='' }
// 	var customer_param = '{% if customer %}customer_id={{customer.id}}&customer_email={{customer.email}}{% endif %}'
// 	checkout_url= "https://checkout.rechargeapps.com/r/checkout?myshopify_domain="+myshopify_domain+"&cart_token="+token+"&"+ga_linker+"&"+customer_param;
//                    console.log(checkout_url);
//     return checkout_url;
// }
// */

// const addOverlay = item => {
//   item.addClass('overlay');
// }

// const removeOverlay = item => {
//   item.removeClass('overlay');
// }

// const updateCartNumber = () => {
//   $.ajax({
//     method: 'GET',
//     url: '/cart.js',
//     dataType: 'json',
//     success: data => {
//       const count = data.item_count;
//       let total = 0;

//       $('#CartCount').text(count);

//       if (count == 0) {
//         $('.cart-template__wrapper .cart-empty').show();
//         $('.cart-template__wrapper .cart-template__header, .cart-template__wrapper .cart-template__content').hide();

//         setTimeout(() => {
//           window.location.href = '/collections/all';
//         }, 5000)
//       }

//       totalCalculation();
//       formatCurrency();
//       checkForEmptyCategory();
//     }
//   })
// }

// const buildCheckoutLink = () => {

//   var detectRecharge = false;

//   // get needed domain
//   const domain = $('.currency-picker option:selected').attr('link-s');
//   let items = '',
//       link = '#';

//   // go through each product in the cart
//   $('.cart-template__product').each((index, element) => {
//    var varID = $(element).attr('data-variant-id');
//     //console.log(index +  ' loop ' +  varID );
//     let handle = $(element).data('handle'),
//           qty = $(element).find('.product-info__qty select option:selected').val();
//         //console.log(handle);

//     // get product vatiant
//     let currentVariant = '';
//     let currentID ;
//     $(element).find('.product-info__variatns .variatns__selector').each((i, el) => {
//       currentVariant += `${ $(el).find('select option:selected').val() } / `;
//       currentID =  $(el).find('select option:selected').attr('data-item-id');

//       //console.log(currentVariant + ' IS here ' + currentID );

//     })

//     currentVariant = currentVariant.slice(0, -3);
//     if(currentVariant) {
//     //console.log(currentVariant + ' after loop ' + varID) ;
//     }
//     else {
//       //console.log('no loop has been fired');
//     }

//     //console.log('handle' + handle);
//     /* check if there's a recurring product */
//     if( handle.endsWith('-1')){
//      detectRecharge = true
//      //console.log('recharge detected:' + handle);
//     }

//     // get variant from remote domain
//     if(handle.endsWith('-1')){
//        handle = handle.replace('-1','');
//     }
//     $.ajax({
//       method: 'GET',
//       url: `https://${ domain }/products/${ handle }.json`,
//       dataType: 'json',
//       async: false,
//       success: data => {
//         const variants = data.product.variants;

//         for (variant in variants) {
//           if( currentVariant ) {
//           if (variants[variant].title == currentVariant) {
//             const id = variants[variant].id;
//             items += `${ id }:${ qty },`;
//           }
//           }
//           else {
//             const id = variants[variant].id;
//             items += `${ id }:${ qty },`;
//           }

//         }
//       }
//     })
//   })

//   // build the link
//    //console.log(`${domain}`);
//   //console.log('recharge: ' + detectRecharge);
//   if (domain == "liveinnermost.myshopify.com" && detectRecharge){
//   link = reChargeProcessCart();
//   }
//   else {
//   link = `https://${ domain }/cart/${ items }`;
//   }
// // console.log(link);
//   return link;
// }

// const totalCalculation = () => {
//   const currency = getCurrencyNominal($('.currency-picker option:selected').val());
//   let total = 0;

//   $('[data-category]').each((index, element) => {
//     let price = 0;
//     const categoryName = $(element).data('category');

//     $(element).find('.cart-template__product').each((i, e) => {
//       const currentElementPrice = parseInt($(e).find('.product-info__price').text().replace(/[^0-9]/g, '')),
//             currentElementQty = parseInt($(e).find('.product-info__qty .select2-selection__rendered').text()),
//             currentFinalPrice = currentElementPrice * currentElementQty;

//       price += currentFinalPrice;
//     })

//     const categoryElement = $(`[data-name=${ categoryName }]`).parent();

//     if (price > 0) {
//       const finalPrice = `${ currency }${ (price / 100.0).toFixed(2) }`;
//       categoryElement.find('.box__item-price').text(finalPrice);
//     } else {
//       categoryElement.remove();
//     }

//     total += price;
//   })

//   const finalTotal = `${ currency }${ (total / 100.0).toFixed(2) }`;
//   $('.box__item.subtotla .box__item-price').text(finalTotal);
//   $('.box__item.total .box__item-price').text(finalTotal);
// }

// const formatCurrency = () => {
//   const domain = $('.currency-picker option:selected').attr('link-s'),
//         currency = getCurrencyNominal($('.currency-picker option:selected').val());

//   // go through each product in the cart
//   $('.cart-template__product').each((index, element) => {
//     const handle = $(element).data('handle');

//     // get product vatiant
//     let currentVariant = '';
//     $(element).find('.product-info__variatns .variatns__selector').each((i, el) => {
//       currentVariant += `${ $(el).find('select option:selected').val() } / `;
//     })
//     currentVariant = currentVariant.slice(0, -3);

//     if (domain != undefined) {
//       // get variant from remote domain
//       $.ajax({
//         method: 'GET',
//         url: `https://${ domain }/products/${ handle }.json`,
//         dataType: 'json',
//         success: data => {
//           const variants = data.product.variants;

//           for (variant in variants) {

//               const price = variants[variant].price,
//                     total = `${ currency }${ price }`;

//               $(element).find('.product-info__price').text(total);

//               totalCalculation();

//           }
//         }
//       })
//     }
//   })
// }

// const getCurrencyNominal = currency => {
//   let nominal = '$';

//   switch (currency) {
//     case 'GBP':
//       nominal = '£';
//       break;
//     case 'USD':
//     case 'AUD':
//     case 'USD':
//     case 'CADQ':
//       nominal = '$';
//       break;
//     case 'EUR':
//       nominal = '€';
//       break;
//   }

//   return nominal;
// }

// const checkForEmptyCategory = () => {
//   $('[data-category]').each((index, element) => {
//     if ($(element).find('.cart-template__product').length == 0) {
//       $(element).remove();
//     }
//   })
// }

// // Ready function
// (() => {

//   formatCurrency();

//   $('.btn.btn-checkout').on('click', e => {
//     e.preventDefault();
//     /* TODO: REDIRECT */
//    window.location.href = buildCheckoutLink();
//       //buildCheckoutLink();
//   })

//   $('.cart-template__product .x-mark').on('click', e => {
//     const itemId = $(e.target).data('item-id'),
//           item = $(`#item-${itemId}`);

//     removeItem(itemId, item);
//   })

//   $('.single-option-selector').on('select2:select', e => {
//     var cart_item_row = $(this).closest('.cart-template__product');
//     if( cart_item_row.hasClass('cart-template__product__recharge') ){
//       return false; //cart items on recharge has other logic
//     }

//     let newVariantTitle = '';
//     const itemId = e.params.data.element.dataset.itemId,
//           item = $(`#item-${itemId}`),
//           handle = item.data('handle'),
//           qty = item.find('.product-info__qty .select2-selection__rendered').text();

//     var cart_item_row = item.closest('.cart-template__product');
//     if( cart_item_row.hasClass('cart-template__product__recharge') ){
//       return false; //cart items on recharge has other logic
//     }

//     item.find('.product-info__variatns .variatns__selector .select2-selection__rendered').each((index, element) => {
//       newVariantTitle += `${element.innerText} / `;
//     })

//     newVariantTitle = newVariantTitle.replace(/.\/.$|.\/$/m, '');

//     updateItem(itemId, item, newVariantTitle, handle, qty);
//   })

// })(jQuery)
