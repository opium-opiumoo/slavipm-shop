const splitGetParams = get => {
  get = get.split('&');

  return {
    'pageTitle': decodeURIComponent(get.filter(item => item.includes('page-title')).toString()),
    'productHandles': get.filter(item => !item.includes('page-title') && !item.includes('_desc')).map(item => item.split('=')[0]),
    'productDescriptions': get.filter(item => !item.includes('page-title') && item.includes('_desc'))
  }
}

const createContent = (collectionsPlace, productsHandles, productDescriptions) => {
  for (productHandle in productsHandles) {
    $.ajax({
      method: 'GET',
      url: `/products/${ productsHandles[productHandle] }.js`,
      dataType: 'json',
      success: data => {
        const loader = $('.first-result-collection__wrapper-loading');

        if (loader.length > 0) {
          loader.remove();
        }

        createCollectionWithProducts(collectionsPlace, data, productDescriptions);
      }
    })
  }
}

const createCollectionWithProducts = (collectionsPlace, data, productDescriptions) => {
  const productsTags = data.tags;
  
  for (tag in productsTags) {
    if (productsTags[tag].includes('collection_')) {
      const collectionName = productsTags[tag].split('_')[1],
            collectionDescription = JSON.parse($('#collection-description-info').html())[collectionName].description,
            collectionCardSelector = `[data-collection-handle="${ collectionName }"]`,
            existingCollectionCard = $(collectionCardSelector).length;

      if (existingCollectionCard === 0) {
        const collection = $('#collection-card-template').html(),
              dataToReplace = {
                collectionName: collectionName,
                collectionDescription: collectionDescription
              };
        
        $(collectionsPlace).append(renderTemplateData(collection, dataToReplace));
        initSlickSlider(collectionCardSelector);
      }

      createProductLoadingCard(data, collectionCardSelector);
      createProductCard(data, collectionCardSelector, productDescriptions);
      createProductIcon(data);
    }
  }
}

const createProductLoadingCard = (data, productPlace) => {
  const product = $('#product-card-template-loading').html(),
      dataToReplace = {
        productHandle: data.handle
      };

  $(productPlace).slick('slickAdd', renderTemplateData(product, dataToReplace));
}

const createProductCard = (data, productPlace, productDescriptions) => {
  // Search id of available product
  let productId = 0,
      i = 0,
      outOfStock = false;

  do {
 
    //console.log(data);
    if(data.variants[i]){
    if (data.variants[i].available == true) {
      outOfStock = false;
      productId = data.variants[i].id;
    }
      else { 
        outOfStock = true;
      }
        
    }
    
    i++;
  } while (productId == 0 && i <= 100 );

  //console.log(outOfStock + " outofstock " + data.title);
  if(outOfStock){
    /*
    let linkTxt = "<a href='" + data.url + "'  target='_blank'>here</a>";
    outOfStock = "Register " + linkTxt + " to be notified when back in stock.";
    */
    outOfStock = "<a href='" + data.url + "'  target='_blank'>Register <strong>here</strong> to be notified when back in stock.</a>"
  }
  else { 
    outOfStock = ""; 
  }
  // Check for unique product description
  let productDescription = getProductsDescriptions(data.handle, productDescriptions);

  // Rendering product data to product template and adding to the DOM
  const product = $('#product-card-template').html(),
        dataToReplace = {
          productId: productId,
          productHandle: data.handle,
          productImage: data.featured_image,
          productDescription: productDescription,
          productTitle: data.title,
          productUrl: data.url,
          outOfStock: outOfStock
        };

  setTimeout(() => {
    $(`[data-product-handle="${ data.handle }"]`).remove();
    $(productPlace).slick('slickAdd', renderTemplateData(product, dataToReplace));
  }, 500);
}

const createProductIcon = data => {
  const iconsInfo = JSON.parse($('#header-icons-info').html()),
        iconsPlace = $('.first-result-header__icons');

  if (iconsInfo[data.handle]) {
    const icon = $('#header-icon-template').html(),
          dataToReplace = {
            iconImg: iconsInfo[data.handle].iconImg,
            iconText: iconsInfo[data.handle].iconText
          };

    $(iconsPlace).append(renderTemplateData(icon, dataToReplace));
  }
}

const initSlickSlider = sliderWrapper => {
  $(sliderWrapper).slick({
    arrows: true,
    infinite: false,
    slidesToScroll: 1,
    variableWidth: true
//     responsive: [
//       {
//         breakpoint: 451,
//         settings: {
//           centerMode: true
//         }
//       }
//     ]
  })
}

const addPageTitle = title => {
  if (title) {
    title = title.split('=')[1].replace('-', ' ');
    title = atob(title);
    $('#custom-title').text(` ${ title }`);
  }
}

const getProductsDescriptions = (productHandle, productDescriptions) => {
  let description = '';

  productDescriptions.forEach(element => {
    element = element.split('=');
    const elementHandle = element[0].replace('_desc', '');
    
    if (description.length == 0 && productHandle == elementHandle) {
      description = element[1].replace(/-/g, ' ');
    }
  })

  return decodeURIComponent(description);
}

const renderTemplateData = (item, replceData) => {
  for (data in replceData) {
    let length = item.includes(`!{ ${ data } }`);

    do {
      item = item.replace(`!{ ${ data } }`,  replceData[data]);
      length = item.includes(`!{ ${ data } }`);
    } while (length);
  }

  // item = item.replace(/<[^\/>][^>]*>!{[\s\S]+}<\/[^>]+>/gm,  '');

  return item;
}

const disableBodyScroll = () => {
  $('body').css('overflow-y', 'hidden');
}

const enableBodyScroll = () => {
  $('body').css('overflow-y', 'auto');
}

function checkRecomendedProductsSliderWidth(){
  $('.first-result-collection__products.slick-initialized').each(function(){
    var current_slick_slider = $(this);
    var swidth = 0;
    current_slick_slider.find('.slick-slide').each(function(){
      swidth += $(this).outerWidth();
    });
    if(current_slick_slider.width() < swidth){
      current_slick_slider.find('.slick-prev, .slick-next').show();
    } else {
      current_slick_slider.find('.slick-prev, .slick-next').hide()
    }
  });
}

// Ready function
(() => {

  const dataFromGet = splitGetParams(window.location.search.substr(1));

  addPageTitle(dataFromGet.pageTitle);
  createContent('#first-result-collection', dataFromGet.productHandles, dataFromGet.productDescriptions);

  $(window).resize(function(){
    checkRecomendedProductsSliderWidth();
  });

  $(document).on('click', '.card-whole-link a', function(e){
    e.stopPropagation();
    /*prevent children links to trigger the parent events*/
  });

  $(document).on('click', '.text-holder__link > a, .card-whole-link', function(e){
    if($(this).is('a')){
      e.preventDefault();
    }

    const popup = $('.first-result-popup__wrapper'),
          popupTemplate = $('#popup-template').html(),
          //productHandle = $(e.target).attr('href').replace('#', ''),
          productHandle = $(this).attr('href').replace('#', ''),
          productInfo = JSON.parse($('#popup-info').html());

    if (productInfo[productHandle]) {
      const currentProductInfo = productInfo[productHandle];
      disableBodyScroll();
      popup.addClass('active');
      popup.find('.first-result-popup__content-wrapper').append(renderTemplateData(popupTemplate, currentProductInfo));
    } else {
      console.error(`There is no popup for ${ productHandle }`);
    }
  })

  $(document).on('click', '.first-result-popup__wrapper.active .first-result-popup__overlay, .first-result-popup__wrapper.active .x-mark', () => {
    const popup = $('.first-result-popup__wrapper');
    enableBodyScroll();
    popup.removeClass('active');
    popup.find('.first-result-popup__content').remove();
  })

  $(document).on('click', '.add-all-to-cart', e => {
    e.preventDefault();
    e.target.innerText = '';
    e.target.setAttribute('disabled', true)
    e.target.classList.add('loading');

    setTimeout(() =>{      
      $('.recommend-product-card__wrapper').each((index, element) => {
        const productId = element.dataset.productId;
  
        $.ajax({
          method: 'POST',
          url: '/cart/add.js',
          data: { quantity: 1, id: productId },
          dataType: 'json',
          async :false
        })
      })
  
      window.location.href = '/cart';
    }, 200);
  })

})(jQuery)