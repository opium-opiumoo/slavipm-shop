/* Jonathan Snook - MIT License - https://github.com/snookca/prepareTransition */
(function(a){a.fn.prepareTransition=function(){return this.each(function(){var b=a(this);b.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",function(){b.removeClass("is-transitioning")});var c=["transition-duration","-moz-transition-duration","-webkit-transition-duration","-o-transition-duration"];var d=0;a.each(c,function(a,c){d=parseFloat(b.css(c))||d});if(d!=0){b.addClass("is-transitioning");b[0].offsetWidth}})}})(jQuery);

/* replaceUrlParam - http://stackoverflow.com/questions/7171099/how-to-replace-url-parameter-with-javascript-jquery */
function replaceUrlParam(e,r,a){var n=new RegExp("("+r+"=).*?(&|$)"),c=e;return c=e.search(n)>=0?e.replace(n,"$1"+a+"$2"):c+(c.indexOf("?")>0?"&":"?")+r+"="+a};

/* Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net */
(function(){var b,f;b=this.jQuery||window.jQuery;f=b(window);b.fn.stick_in_parent=function(d){var A,w,J,n,B,K,p,q,k,E,t;null==d&&(d={});t=d.sticky_class;B=d.inner_scrolling;E=d.recalc_every;k=d.parent;q=d.offset_top;p=d.spacer;w=d.bottoming;null==q&&(q=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=b(document);null==w&&(w=!0);J=function(a,d,n,C,F,u,r,G){var v,H,m,D,I,c,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));
if(!g.length)throw"failed to find stick parent";v=m=!1;(h=null!=p?p&&a.closest(p):b("<div />"))&&h.css("position",a.css("position"));x=function(){var c,f,e;if(!G&&(I=A.height(),c=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),d=parseInt(g.css("padding-bottom"),10),n=g.offset().top+c+f,C=g.height(),m&&(v=m=!1,null==p&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-q,
u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:a.outerWidth(!0),height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),e))return l()};x();if(u!==C)return D=void 0,c=q,z=E,l=function(){var b,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+c>C+n,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:c}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,c=q,null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),
h.detach()),b={position:"",width:"",top:""},a.css(b).removeClass(t).trigger("sticky_kit:unstick")),B&&(b=f.height(),u+q>b&&!v&&(c-=l,c=Math.max(b-u,c),c=Math.min(q,c),m&&a.css({top:c+"px"})))):e>F&&(m=!0,b={position:"fixed",top:c},b.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(b).addClass(t),null==p&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+c>C+n),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),
a.css({position:"absolute",bottom:d,top:"auto"}).trigger("sticky_kit:bottom")},y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("scroll",l);f.off("resize",y);b(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",
y),b(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,0)}};n=0;for(K=this.length;n<K;n++)d=this[n],J(b(d));return this}}).call(this);

var afterResize=(function(){var t={};return function(callback,ms,uniqueId){if(!uniqueId){uniqueId="Don't call this twice without a uniqueId";}if(t[uniqueId]){clearTimeout(t[uniqueId]);}t[uniqueId]=setTimeout(callback,ms);};})();

/* Money Format - Shopify.format money is defined in option_selection.js. If that file is not included, it is redefined here. */
"undefined"==typeof Shopify&&(Shopify={}),Shopify.formatMoney||(Shopify.formatMoney=function(a,b){function f(a,b){return"undefined"==typeof a?b:a}function g(a,b,c,d){if(b=f(b,2),c=f(c,","),d=f(d,"."),isNaN(a)||null==a)return 0;a=(a/100).toFixed(b);var e=a.split("."),g=e[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+c),h=e[1]?d+e[1]:"";return g+h}var c="",d=/\{\{\s*(\w+)\s*\}\}/,e=b||this.money_format;switch("string"==typeof a&&(a=a.replace(".","")),e.match(d)[1]){case"amount":c=g(a,2);break;case"amount_no_decimals":c=g(a,0);break;case"amount_with_comma_separator":c=g(a,2,".",",");break;case"amount_no_decimals_with_comma_separator":c=g(a,0,".",",")}return e.replace(d,c)});

/* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/
!function(t){"use strict";t.fn.fitVids=function(e){var i={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var r=document.head||document.getElementsByTagName("head")[0],a=".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",d=document.createElement("div");d.innerHTML='<p>x</p><style id="fit-vids-style">'+a+"</style>",r.appendChild(d.childNodes[1])}return e&&t.extend(i,e),this.each(function(){var e=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]',"object","embed"];i.customSelector&&e.push(i.customSelector);var r=".fitvidsignore";i.ignore&&(r=r+", "+i.ignore);var a=t(this).find(e.join(","));a=a.not("object object"),a=a.not(r),a.each(function(){var e=t(this);if(!(e.parents(r).length>0||"embed"===this.tagName.toLowerCase()&&e.parent("object").length||e.parent(".fluid-width-video-wrapper").length)){e.css("height")||e.css("width")||!isNaN(e.attr("height"))&&!isNaN(e.attr("width"))||(e.attr("height",9),e.attr("width",16));var i="object"===this.tagName.toLowerCase()||e.attr("height")&&!isNaN(parseInt(e.attr("height"),10))?parseInt(e.attr("height"),10):e.height(),a=isNaN(parseInt(e.attr("width"),10))?e.width():parseInt(e.attr("width"),10),d=i/a;if(!e.attr("name")){var o="fitvid"+t.fn.fitVids._count;e.attr("name",o),t.fn.fitVids._count++}e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*d+"%"),e.removeAttr("height").removeAttr("width")}})})},t.fn.fitVids._count=0}(window.jQuery||window.Zepto);

/*
 * $.getQueryParams
 *
 * Source: https://css-tricks.com/snippets/jquery/get-query-params-object/
 *
*/
jQuery.extend({
  getQueryParams : function(str) {
    return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
  }
});

/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return n.indexOf(t)==-1&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return n!=-1&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){i=i.slice(0),t=t||[];for(var n=this._onceEvents&&this._onceEvents[e],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(e,r),delete n[r]),r.apply(this,t)}return this}},t.allOff=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){if(Array.isArray(e))return e;var t="object"==typeof e&&"number"==typeof e.length;return t?d.call(e):[e]}function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);var s=e;return"string"==typeof e&&(s=document.querySelectorAll(e)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||e))}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console,d=Array.prototype.slice;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&u[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var u={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});



/**
 * Home page
 */
var HomePage = function () {
  if (ira.cache.$body.find('[data-map-api]').length) this.initMaps();
};

HomePage.prototype.initMaps = function() {
  var _this = this;
  var $map = ira.cache.$body.find('[data-map-api]');

  if ($map.length) {
    var apiKey = $map.data('map-api');

    $.getScript('https://maps.googleapis.com/maps/api/js?key=' + apiKey).then(function() {
      $map.each(function(i, el) {
        _this.loadMap(el);
      });
    });
  }
};

HomePage.prototype.loadMap = function(el) {
  var $map = $(el);
  var sectionId = $map.data('section-id'),
      address = $map.data('map-address'),
      geocoder = new google.maps.Geocoder(),
      style = $map.data('map-style') != '' ? $map.data('map-style') : false;

  geocoder.geocode({'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

      var mapOptions = {
        zoom: 12,
        zoomControl: false,
        center: results[0].geometry.location,
        styles: style,
        draggable: false,
        mapTypeControl: false,
        fullscreenControl: false,
        fullscreenControlOptions: false,
        gestureHandling: "none",
        keyboardShortcuts: false,
        scrollwheel: false,
        streetViewControl: false,
      };

      var map = new google.maps.Map(document.getElementById('map-' + sectionId), mapOptions);

      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });

      map.panBy(-150, 0);

    } else {
      console.error('Google Maps geocode was not successful for the following reason: ' + status);
    }
  });
};


/**
 * Product page
 */
var ProductPage = function (container) {
  var _this = this;
  this.$container = $(container);

  this.product = container.querySelector("[data-product-json]").innerHTML,
  this.product = JSON.parse(this.product || '{}');

  this.initialSelectCallback = true;

  new Shopify.OptionSelectors('productSelect-' + this.product.id, {
    product: this.product,
    onVariantSelected: this.selectCallback.bind(this),
    enableHistoryState: ira.cache.$body.hasClass("template-product") && false
  });
  //   ORIGINAL : enableHistoryState: ira.cache.$body.hasClass("template-product") ? true : false

  ira.cache.$sliderGallery.slick({
    autoplay: true,
    dots: true,
    arrows: false,
    mobileFirst: true,
    respondTo: 'min',
    adaptiveHeight: true,
    pauseOnHover: false,
    draggable: true,
    lazyload: 'progressive',
  }).init(function() {
    var imagePosition = _this.$container.attr('data-initial-image-position');

    if ( imagePosition ) {
    //  ira.cache.$sliderGallery.slick('slickGoTo', imagePosition, false);
    }
  });

  // Add label if only one product option and it isn't 'Title'. Could be 'Size'.
  if (Number(this.$container.attr('data-product-options-size')) == 1 && this.$container.attr('data-product-options-first') != 'Title') {
    this.$container.find('.selector-wrapper').eq(0).prepend('<label for="productSelect-option-0">' + this.$container.attr('data-product-options-first') + '</label>');
  };

  // Hide selectors if we only have 1 variant and its title contains 'Default'.
  if (Number(this.$container.attr('data-product-variants-size')) == 1 && this.$container.attr('data-product-variants-first').indexOf('Default') !== -1) {
    this.$container.find('.selector-wrapper').hide();
  };

  this.initFitVids();
  this.setupTabs();
  this.extendTab();
  this.switchTabs();
  this.openLightbox();
  this.closeLightbox();

  $(window).on('widthChange', _.debounce(this.setupTabs, 50));
};

ProductPage.prototype.initFitVids = function() {
  var $vid = this.$container.find('iframe');

  if ($vid.length) {
    $vid.fitVids();
  }
};
var is_load = 0;
ProductPage.prototype.selectCallback = function(variant, selector) {
  ira.productPage(this.$container, {
    default_currency: this.$container.attr('data-shop-default-currency'),
    variant: variant,
    selector: selector
  });

  this.togglePaymentButton(variant);

  if ( variant && variant.featured_image ) {
    this.updateVariantImageSliderGallery(variant.featured_image);
    this.updateVariantImageThumbnailGallery(variant.featured_image);
    this.updateVariantImageStackGallery(variant.featured_image);
  }
  
  if(is_load == '0'){
    is_load = 1;
    //setTimeout(function(){is_load = 1;GetVariantPrice(variant.title);},1500);
                    
  }else{
       GetVariantPrice(variant.title);
       
  }
  this.initialSelectCallback = false;
};

ProductPage.prototype.togglePaymentButton = function (variant) {
  var $element = this.$container.find(".shopify-payment-button");

  if ( !variant || !variant.available ) {
    $element.hide();
  } else {
    $element.show();
  }
}



ProductPage.prototype.openLightbox = function() {
  $('[data-product-lightbox-button="open"]').on('click', function() {
    ira.cache.$body.addClass('no-scroll');
    $('[data-product-lightbox]').addClass('active');
  });
}

ProductPage.prototype.closeLightbox = function() {
  $('[data-product-lightbox-button="close"]').on('click', function() {
    ira.cache.$body.removeClass('no-scroll');
    $('[data-product-lightbox]').removeClass('active');
  });
}



ProductPage.prototype.setupTabs = function() {
  var $tab = $('[data-product-tab]'),
      $content = $('[data-product-tab-content]');

  $tab.removeClass('inactive');
  $content
    .height('auto')
    .removeClass('truncated');
  $content.children('[data-product-tab-content-inner]')
    .height('auto')
    .removeClass('truncated');

  setTimeout(function() {
    $content.each(function(i, el) {
      var $el = $(el);
      var $parent = $el.closest('[data-product-tab]'),
          $inner = $el.children('[data-product-tab-content-inner]');

      $el.imagesLoaded(function() {
        var height = $el.height(),
            innerHeight = $inner.height();

        if (innerHeight > 400) {
          $inner
            .addClass('truncated')
            .height(innerHeight);

          $el.height('auto').addClass('truncated');
        } else {
          $parent
            .find('[data-read-more]')
            .remove();

          $el.height($el.height()).addClass('truncated');
        }

        $parent.toggleClass('inactive', !$parent.hasClass('active'));
      });
    });
  }, 10);
};

ProductPage.prototype.extendTab = function() {
  $('[data-product-tab]').on('click', '[data-read-more]', function(event) {
    var $target = $(event.currentTarget);
    var oldText = $target.text(),
        newText = $target.data('read-more');

    $target.closest('[data-product-tab]').find('[data-product-tab-content-inner]').toggleClass('truncated');

    $target
      .text(newText)
      .data('read-more', oldText);

    $(window).trigger('tab-extended');
  });
};

ProductPage.prototype.switchTabs = function() {
  $('[data-product-tab]').on('click', '[data-product-tab-title]', function() {
    var $this = $(this);
    var $parent = $this.closest('[data-product-tab]');
    var $sibs = $parent.siblings();

    $(window).trigger('tab-changed');

    if ($parent.hasClass('active')) {
      $parent
        .removeClass('active')
        .addClass('inactive');
    } else if ($sibs.hasClass('active')) {
      $sibs
        .removeClass('active')
        .addClass('inactive');

      $parent
        .removeClass('inactive')
        .addClass('active');

      setScrollTop($parent);
    } else {
      $parent
        .removeClass('inactive')
        .addClass('active');

      setScrollTop($parent);
    }
  });

  var setScrollTop = function($parent) {
    if (ira.cache.$productSidebar.hasClass('sticky-sidebar')) return;
    var offset = $('[data-sticky-header="true"]').length ? $('[data-sticky-header]').height() - 1 : 0;
    setTimeout(function() {
      var parentTop = Math.ceil($parent[0].getBoundingClientRect().top),
          bodyTop = Math.ceil($(document.body)[0].getBoundingClientRect().top);
      $(document.body).animate({
        scrollTop: parentTop - bodyTop - offset + 'px'
      }, 150);
    }, 100);
  }
};

ProductPage.prototype.updateVariantImageThumbnailGallery = function(image) {
  ira.cache.$productImages
    .hide()
    .filter("[data-image-id=" + image.id + "]")
      .show();
};

ProductPage.prototype.updateVariantImageSliderGallery = function(image) {
  if ( $('.slick-initialized').length ) {
   // ira.cache.$sliderGallery.slick('slickGoTo', image.position - 1, false);
  }
};

ProductPage.prototype.updateVariantImageStackGallery = function (image) {

  if ( this.initialSelectCallback ) {
    return false;
  }

  var header_height = $(".site-header").outerHeight();
  var target = $("#ProductGalleryStacked").find("[data-image-id=" + image.id + "]");

  if ( !target.length ) {
    return false;
  }

  if ( $(window).width() < 842 ) {
    return false;
  }

  $("body, html").animate({
    scrollTop: target.offset().top - header_height
  }, 500);
}

function ProductPageInit() {
  ira.cache.productContainers.forEach(function (container) {
    new ProductPage(container);
  });
}

/**
 * Ira main initializer
 */

window.ira = window.ira || {};

ira.cacheSelectors = function () {
  ira.cache = {
    // General
    $window                  : $(window),
    $html                    : $('html'),
    $body                    : $('body'),
    windowHeight             : $(window).height(),

    // Navigation
    $navigation              : $('#AccessibleNav'),
    $mobileSubNavToggle      : $('.mobile-nav__has-sublist'),
    $header                  : $('.site-header'),
    $headerControls          : $('.site-header-controls'),
    $headerCurrencyConverter : $('.header-message-currency'),

    // Drawers
    $allDrawers                 : $('.drawer'),

    // Collection Pages
    $changeView              : $('.change-view'),

    // Product Page
    productContainers        : document.querySelectorAll("[data-product-container]"),
    $productImage            : $('#ProductPhotoImg'),
    $thumbImages             : $('#ProductThumbs').find('[data-product-thumbnail]'),
    $productImages           : $("[data-product-image]"),
    $photoContainer          : $('#PhotoContent'),
    $productSidebar          : $('#sidebarColumn'),
    $sliderGallery           : $("#ProductPhotoSlideshow"),

    // Customer Pages
    $recoverPasswordLink     : $('#RecoverPassword'),
    $hideRecoverPasswordLink : $('#HideRecoverPasswordLink'),
    $recoverPasswordForm     : $('#RecoverPasswordForm'),
    $customerLoginForm       : $('#CustomerLoginForm'),
    $passwordResetSuccess    : $('#ResetSuccess'),


    //Exit intent / misc
    $exitIntentOverlay      :  $('.exit-intent-overlay'),
    $notificationBar        :  $('#announcement-bar'),
    $fadeOutOverlay         :  $('.fadeout-overlay'),
    $searchBar              :  $('#HeaderSearchBar'),
    $pageContainer          :  $("#PageContainer"),

    // Footer
    $footer                 :  $('#shopify-section-footer')
  };
};

ira.init = function () {
  //FastClick.attach(document.body);
  ira.cacheSelectors();
  ira.accessibleNav();
  ira.drawersInit();
  ira.mobileNavToggle();
  ira.productSidebar();
  ira.productImageSwitch();
  ira.responsiveVideos();
  ira.collectionSortSetup();
  ira.collectionViews();
  ira.loginForms();
  ira.exitIntentInit();
  ira.fadeOutOnClick();
  ira.truncateExcerptText();
  ira.headerInit();
  ira.initInstaGrid();
  ira.collectionList();

  ira.cache.$body.imagesLoaded(function() {
    ira.footerInit();
  });

  if ($('#story-grid').length) {
    ira.storyGridInit();
  }

  $(window).on('resize', function() {
    var windowWidth = $(window).width(),
        windowHeight = $(window).height();
    if (windowWidth != ira.cache.windowWidth) {
      $(window).trigger('widthChange');
      ira.cache.windowWidth = windowWidth;
    }
    if (windowHeight != ira.cache.windowHeight) {
      $(window).trigger('heightChange');
      ira.cache.windowHeight = windowHeight;
    }
  }).trigger('resize');

  if (ira.isIOS) {
    $(document.body).addClass('ios')
  } else {
    ira.initScrollTriggers();
  };

  $(window).on('widthChange', function() { ira.footerInit(); });

  // If we're on the index page
  if ($(document.body).hasClass('template-index')) {
    var $firstSection = $('.parallax-container .shopify-section').eq(0);

    // If the first section is a carousel, enable parallax functionality
    if ($firstSection.hasClass('carousel')) {
      $firstSection
        .addClass('has-parallax')
        .attr('data-parallax', 'true')
        .attr('data-speed', '0.5')
        .attr('data-direction', 'down');
    }
  }

  if ($(document.body).hasClass('template-collection')) {
    var $firstSection = $('.parallax-container #shopify-section-collection-template .section-header');

    $firstSection
      .addClass('has-parallax')
      .attr('data-parallax', 'true')
      .attr('data-speed', '0.5')
      .attr('data-direction', 'down');
  }

  $('.carousel-container').each(function(_, carouselEl) {
    var carousel = $(carouselEl);

    ira.carousels.push(new ira.Carousel({
      container: carousel,
      enableKenBurns: carousel.attr('data-ken-burns'),
      slideTimeout: carousel.attr('data-slide-timeout')
    }));
  });

  $('.feature-video-container').each(function(_, videoEl) {
    var video = $(videoEl);

    ira.videoPlayers.push(new ira.VideoPlayer({
      container: video
    }));
  });

  //Parallax is on by default at Shopify's request.  If you'd like to remove it,
  //simply comment out the following line:
  ira.parallax();

  if (ira.cache.$notificationBar.length > 0) {
    ira.cache.$body.addClass('respond-to-announcement-bar');
  }

  ira.cache.$body.addClass('ready');
  $(document).trigger('ira.ready');

  if (ira.cache.$body.hasClass('template-index')) ira.HomePage = new HomePage();

  if ( ira.cache.$body.hasClass('template-product') || ira.cache.$body.hasClass('template-index') ) {
    ProductPageInit();
  }
};

ira.setupCurrencyConverter = function() {
  var currencySelect = $('.currency-picker');
  /*if (currencySelect.length && !$('.currency-picker-label').length) {
    var wrapper = $('<div class="currency-picker-outer" />');
    var label = $('<span class="currency-picker-label" />');
    currencySelect.wrap(wrapper);
    currencySelect.before(label);

    currencySelect
      .val(Currency.currentCurrency)
      .on('change', function() {
        label.text(currencySelect.children("option:selected").text().substr(3));
      })
      .trigger('change');
  };*/
};

ira.initCatalogMenu = function(menu) {
  //var triggers = menu.find("ul.main-nav-level > li");
  //var images = menu.find("> .catalog-menu-image-container .catalog-menu-collection-image");
  
   var triggers_inner = menu.find("ul.dropdown-third-level > li");
  var inner_images = menu.find("> .catalog-menu-image-container-inner .catalog-menu-collection-image-inner");

  /*triggers.on('mouseenter', function(event) {
    var target = $(event.target);
    var index = (target.is("li") ? target : target.closest("li")).attr('data-index');
    images.filter("[data-index=" + index + "]").addClass('visible');    
  });
  triggers.on('mouseleave', function() {
    images.removeClass('visible');
    inner_images.removeClass('visible');
  });*/
  
  triggers_inner.on('mouseenter', function(event) {
    var target = $(event.target);
    var inner_index = (target.is("li") ? target : target.closest("li")).attr('data-inner-index');
    inner_images.filter("[data-inner-index=" + inner_index + "]").addClass('visible');
  });
  triggers_inner.on('mouseleave', function() {
    //images.removeClass('visible');
    inner_images.removeClass('visible');
  });
  
};

ira.initScrollTriggers = function() {
  var triggerSelectors = [
    '.shopify-section.featured-text',
    '.shopify-section.testimonials',
    '.shopify-section.featured-collections',
    '.shopify-section.video-player',
    '.shopify-section.features',
    '.grid--products > .grid__item',
    '.index-grid-items .index-grid-item'
  ]

  // Using above selectors, get each element found
  var triggers = triggerSelectors.map(function(selector) {
    return $(selector).toArray();
  });

  // Flatten the array
  triggers = [].concat.apply([], triggers);

  if (triggers.length <= 0) return;

  function shouldTrigger(scrollTop, windowHeight, element) {
    var elementTop = element.offset().top;
    var elementHeight = element.outerHeight();
    var shouldTriggerElement = scrollTop + windowHeight > elementTop + (elementHeight * 0.5);

    if (shouldTriggerElement) {
      element.addClass('visible');
      return true;
    };

    return false;
  };

  function checkScrollPositions() {
    var scrollTop = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    var windowHeight = window.innerHeight;

    triggers.forEach(function(trigger, index) {
      if (shouldTrigger(scrollTop, windowHeight, $(trigger))) {
        triggers.splice(index, 1);
      };
    });

    if (triggers.length == 0) {
      ira.cache.$window.off('scroll', checkScrollPositions);
    };
  };

  ira.cache.$window.on('scroll', checkScrollPositions);
  setTimeout(checkScrollPositions, 100);
};

/**
 * This function makes background videos play on iOS.
 * Since Apple doesn't allow autoplaying videos on mobile,
 * we simply treat any touch event as a video-start event.
 */
ira.isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
ira.isAndroid = /Android/i.test(navigator.userAgent);

ira.accessibleNav = function () {
  var $nav = ira.cache.$navigation,
      $allLinks = $nav.find('a'),
      $topLevel = $nav.children('li').find('a'),
      $parents = $nav.find('.site-nav--has-dropdown'),
      $subMenuLinks = $nav.find('.site-nav__dropdown').find('a'),
      activeClass = 'nav-hover',
      focusClass = 'nav-focus';

  function is_touch_device() {
    return 'ontouchstart' in window   // works on most browsers
      || navigator.maxTouchPoints;    // works on IE10/11 and Surface
  };

  if (is_touch_device()) {
    var tapedTwice = false;

    $('.main-navigation .has-dropdown > a').on('touchstart', function(event) {
      if (!tapedTwice) {
        tapedTwice = true;

        setTimeout(function() {
          tapedTwice = false;
        }, 300);

        $(this).toggleClass('active');
        $(this).siblings('.dropdown').toggleClass('visible');
        return false;
      }

      window.location = $(this).attr('href');
      event.preventDefault();
    });
  }

  // Mouseenter
  $parents.on('mouseenter touchstart', function(evt) {
    var $el = $(this);

    if (!$el.hasClass(activeClass)) {
      evt.preventDefault();
    }

    showDropdown($el);
  });

  // Mouseout
  $parents.on('mouseleave', function() {
    hideDropdown($(this));
  });

  $subMenuLinks.on('touchstart', function(evt) {
    // Prevent touchstart on body from firing instead of link
    evt.stopImmediatePropagation();
  });

  $allLinks.blur(function() {
    removeFocus($topLevel);
  });

  // accessibleNav private methods
  function handleFocus ($el) {
    var $subMenu = $el.next('ul'),
        hasSubMenu = $subMenu.hasClass('sub-nav') ? true : false,
        isSubItem = $('.site-nav__dropdown').has($el).length,
        $newFocus = null;

    // Add focus class for top level items, or keep menu shown
    if (!isSubItem) {
      removeFocus($topLevel);
      addFocus($el);
    } else {
      $newFocus = $el.closest('.site-nav--has-dropdown').find('a');
      addFocus($newFocus);
    }
  }

  function showDropdown ($el) {
    $el.addClass(activeClass);

    setTimeout(function() {
      ira.cache.$body.on('touchstart', function() {
        hideDropdown($el);
      });
    }, 250);
  }

  function hideDropdown ($el) {
    $el.removeClass(activeClass);
    ira.cache.$body.off('touchstart');
  }

  function addFocus ($el) {
    $el.addClass(focusClass);
  }

  function removeFocus ($el) {
    $el.removeClass(focusClass);
  }
};

ira.headerInit = function(ignoreNav){
  var header = $('.site-header');

  ira.stickyHeader({
    stickyHeaderEnabled: header.attr('data-sticky-header') == 'true',
    notificationBarEnabled: header.attr('data-announcement-bar') == 'true'
  });

  ira.transparentHeader({
    transparentHeaderEnabled: header.attr('data-transparent-header') == 'true' || $('.parallax-container').children().first().hasClass('carousel'),
    stickyHeaderEnabled: header.attr('data-sticky-header') == 'true'
  });

  if (!ignoreNav) {
    ira.setupNavigation({
      navigationInline: header.attr('data-inline-navigation') == 'true'
    });
  };

  ira.searchInit({
    transparentHeaderEnabled: header.attr('data-transparent-header') == 'true',
    stickyHeaderEnabled: header.attr('data-sticky-header') == 'true'
  });

  if (header.attr('data-currency-converter') == 'true') {
    setTimeout(ira.setupCurrencyConverter, 50);
  };

  $('.dropdown.catalog-menu').each(function() {
    ira.initCatalogMenu($(this));
  });
}

ira.footerInit = function(){
  var $container = ira.cache.$pageContainer,
      $footer = ira.cache.$footer;
  var containerHeight = ira.cache.$pageContainer.outerHeight(true),
      windowHeight = $(window).height(),
      fixed = $footer.hasClass('absolute');

  if (containerHeight <= windowHeight && ira.cache.containerHeight != containerHeight && !fixed) {
    var fh = $footer.outerHeight();

    $footer.addClass('hidden');

    $footer.addClass('absolute');
    $container.css({
      'padding-bottom': fh
    });
    $footer.removeClass('hidden');
  } else if (containerHeight > windowHeight && ira.cache.containerHeight != containerHeight && fixed) {
    $footer.addClass('hidden').removeClass('absolute');
    $container.css({
      'padding-bottom': 0
    });
    $footer.removeClass('hidden');
  }

  ira.cache.containerHeight = containerHeight;
}

ira.stickyHeader = function(options){
  var CLASS_NAME = 'sticky-header';
  var stickyHeaderEnabled = options.stickyHeaderEnabled;
  var notificationBarEnabled = options.notificationBarEnabled;

  if (window.location.pathname.indexOf("products") !== -1 &&
    ira.cache.$html.hasClass('supports-touch')) {
    //We don't want sticky header on the product page for mobile
    return $('.'+CLASS_NAME).removeClass(CLASS_NAME);
  }

  if (stickyHeaderEnabled){
    //We want to add classes to the drawers too,
    //so they know what height to be via CSS.
    var header = $('.site-header');
    // var drawers = ira.cache.$allDrawers;
    var searchBar = ira.cache.$searchBar;
    var header = header.add(searchBar);

    var headerControls = $('.site-header-controls');
    var controlsHeight = headerControls.height();
    var notificationBarHeight = $('#announcement-bar').height();

    if (notificationBarEnabled){
      controlsHeight += notificationBarHeight;
    }
    /**
     * Set the .offset-by-announcement-bar top to the CSS CLASS, /not/ the elements themselves
     * This is because the class is removed via JS when the user scrolls down, and we want
     * the "top: xx" to be gone as well.
     */
    function notificationBarOffset(){
      var sheet = document.getElementById('js-notificationBarStyle');
      if (! sheet){
        sheet = document.createElement('style');
        sheet.id = 'js-notificationBarStyle'
      }

      if (navigator.appVersion.indexOf("MSIE 8") > 0){
        //thanks ie8 for making the internet a better place
        var ie8Styles = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(ie8Styles);
        ie8Styles.setAttribute('type', 'text/css');
        ie8Styles.styleSheet.cssText = ".offset-by-announcement-bar {top: "+ ira.cache.$notificationBar.height() +"px}";

      }
      else {
        sheet.innerHTML = ".offset-by-announcement-bar {top: "+ ira.cache.$notificationBar.height() +"px} @media (max-width: 839px) { :not(.js-drawer-open) .sm-offset-by-announcement-bar {top: " + ira.cache.$notificationBar.height() +"px}}";
      }


      document.body.appendChild(sheet);
    }



    var detachHeader = function(){
        if (ira.cache.$body.hasClass('js-drawer-open')){
          return;
        }
      var top = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
      if (top <= controlsHeight){
         $(".site-header").removeClass('medium-down--fixed');
        headerControls.removeClass('medium-down--fixed');
        ira.cache.$searchBar.removeClass('medium-down--fixed');
        ira.cache.$body.removeClass('js-header-attached');

        $(window).off('scroll', detachHeader);
        $(window).on('scroll', attachAndCondenseHeader);
      }
    }

    var attachAndCondenseHeader = function () {
        if (ira.cache.$body.hasClass('js-drawer-open')){
          return;
        }
      var top = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
      var controlsOffset = headerControls.position().top;

      // if (notificationBarEnabled && top >= notificationBarHeight){
      if (notificationBarEnabled && top >= notificationBarHeight){
        header.removeClass('offset-by-announcement-bar')
      }
      else if (notificationBarEnabled && top < notificationBarHeight) {
        header.addClass('offset-by-announcement-bar')
      }

      //Add the && !() so it doesn't always re-register on scroll
      if (top >= controlsHeight && ! headerControls.hasClass('medium-down--fixed')){
        $(".site-header").addClass('medium-down--fixed');
        //headerControls.addClass('medium-down--fixed');
        ira.cache.$searchBar.addClass('medium-down--fixed');
        ira.cache.$body.addClass('js-header-attached');

        if ($(window).width() <= 840 && ira.cache.$searchBar.offset().top < ira.cache.$headerControls.offset().top){
          ira.cache.$searchBar.css('top', ira.cache.$header.height() + 1);
        }



        //Only worry about detaching once it's been attached.
        $(window).on('scroll', detachHeader);
      }

    };

    $(window).on('scroll', attachAndCondenseHeader);
    $(window).on('resize', detachHeader);
    attachAndCondenseHeader();
    detachHeader();

    if (notificationBarEnabled){
      notificationBarOffset();
      $(window).resize(notificationBarOffset);
    }
  }
}

ira.transparentHeader = function(options){
  var transparentHeaderEnabled = options.transparentHeaderEnabled;
  var stickyHeaderEnabled = options.stickyHeaderEnabled;
  var className = 'transparent-header';

  // Transparent header is only active on the homepage and collections pages with images.
  var onHomePage = window.location.pathname === '/';
  var onCollectionPage = window.location.pathname.split('/')[1] === 'collections';
  var onImageCollectionPage = onCollectionPage && $('.section-header--image').length;

  transparentHeaderEnabled = transparentHeaderEnabled && (onHomePage || onImageCollectionPage);

  if ( !onHomePage && !onImageCollectionPage ) {
    $('.' + className).removeClass(className);
  };

  // Important to call this /after/ the classname has been removed.
  this.adjustContentOffset(options);

  var hasScrolled = false;
  var header = ira.cache.$header;
  var headerControlsHeight = ira.cache.$headerControls.height();
  var fadeInClassName = '.js-transparent-header-fadein:first';
  var carouselContainer = $('.main-content .shopify-section.carousel:first-child, .main-content .shopify-section.video-player:first-child, .collection-pages .section-header').first();
  var animating = false;

  // As of this writing, that class is only apparent in index.
  // And we only want parallax on the index page.
  if ($(fadeInClassName).length === 0 ){
    return;
  };

  if (transparentHeaderEnabled) {
    ira.cache.$body.addClass('respond-to-transparent-header');
  }

  if (transparentHeaderEnabled && stickyHeaderEnabled){
    $(window).on('scroll', scrollAnimationLoop);
  };

  function scrollAnimationLoop(){
    if (!animating){
      drawScroll();
      requestAnimationFrame(scrollAnimationLoop);
      animating = true;
    };
  }

  function drawScroll(){
    fadeInTransparentHeader();
    fadeOutHandler();
    animating = false;
  };

  function fadeInTransparentHeader() {
    var top = window.pageXOffset ? window.pageXOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    // storygridstart changes on resize events and such, so we should recalculate it each time
    // var storyGridStart = $(fadeInClassName).position().top;
    var offset = headerControlsHeight;

    if (carouselContainer.length) {
      offset = carouselContainer.height() - headerControlsHeight
    };

    // we're at the smaller breakpoint so we need to push the offset up higher,
    // as we now have the carousel-text as a distinct element
    if (ira.cache.$headerControls.css('position') == 'fixed' && (!!carouselContainer.length)) {
      offset -= parseInt( carouselContainer.css('padding-bottom').replace('px', ''), 10)
    }

    if (top >= offset) {
      // manually toggle transition time, since we want it to be set to 0
      // when the user opens the menu, but not on the scroll condition
      ira.cache.$headerControls.css('transition', '0.3s');
      header.removeClass(className);

      $(window).on('scroll', fadeOutHandler);
      $(window).off('scroll', fadeInTransparentHeader);
    };
  };

  function fadeOutHandler() {
    var top = window.pageXOffset ? window.pageXOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    // storygridstart changes on resize events and such, so we should recalculate it each time
    // var storyGridStart = $(fadeInClassName).position().top;
    var offset = headerControlsHeight;

    if (carouselContainer.length) {
      offset = carouselContainer.height() - headerControlsHeight;
    };

    if (ira.cache.$headerControls.css('position') == 'fixed' && (!!carouselContainer.length)){
      offset -= parseInt(carouselContainer.css('padding-bottom').replace('px', ''), 10);
    };

    if (top <= offset){
      if (header.is('[data-transparent-header="true"]')) {
        header.addClass(className);
      }

      // set the transition time back to default now that the animation is over
      setTimeout(function(){
        ira.cache.$headerControls.css('transition', '0s');
      }, 600);

      $(window).on('scroll', fadeInTransparentHeader);
      $(window).off('scroll', fadeOutHandler);
    };
  };

};

ira.setupNavigation = function(options) {
  var debouncedPrepare = _.debounce(function(){
    if (options.navigationInline) {
      if (ira.navigationStyle === 'desktop') {
        ira.setNavStyle(ira.whichNav());
      } else if (ira.navigationStyle === 'mobile' && Math.ceil($(window).width()) * (3/4) > Math.ceil($('.site-header__logo').outerWidth(true) + 1) + ira.navWidth + 15) {
        ira.navigationStyle = 'desktop';
        ira.setNavStyle('desktop');
      }
    }
  }, 100);

  $(window).on('resize', debouncedPrepare);

  $('.has-dropdown').on('mouseenter mouseleave', function(event) {
        $(this).find('.chevron-nav').toggleClass('rotate-180');
    var target = $(event.target);
    var container = target.hasClass('has-dropdown') ? target : target.closest('.has-dropdown');

    var catalogMenu = container.find('.catalog-menu');

    if (catalogMenu.length && event.type == "mouseenter") {
      catalogMenu.css('margin-left', 0);

      var offset = 0;

      catalogMenu.addClass('visibly-hidden');
      var width = catalogMenu.outerWidth();
      var left = catalogMenu.offset().left;
      var difference = window.innerWidth - (width + left);

      if (difference < 0) {
        offset = difference - 20;
      };

      catalogMenu.removeClass('visibly-hidden');
      catalogMenu.css('margin-left', offset);
    };

    var link = container.children('a');
    var dropdown = container.children('.dropdown');
    var isLeftSide = container.offset().left + 350 > window.innerWidth;

    if (event.type === 'mouseenter') {
      dropdown.toggleClass('left-side', isLeftSide);
      link.addClass('active');
      dropdown.revealer('show');     
    } else if (event.type === 'mouseleave') {
      link.removeClass('active');
      dropdown.revealer('hide');
    }
  });

  if (options.navigationInline) {
    ira.navigationStyle = 'desktop';

    $('.site-header').imagesLoaded(function() {
      ira.setNavStyle(ira.whichNav());
    });

    if ($(window).width() > 840) {
      ira.navWidth = ira.getNavWidth();
    };
  }
}

ira.setNavStyle = function(type) {
  if (type === 'mobile' || window.matchMedia('(max-width: 840px)').matches) {
    ira.navigationStyle = 'mobile';
    $('.js-drawer-open-NavDrawer').css('display', 'inline-block');
    //$('.js-account-icon').css('display', 'none');
    $('.main-navigation').hide().removeClass('nav-loading');
  } else {
    $('.js-drawer-open-NavDrawer').css('display', 'none');
    $('.js-account-icon').css('display', 'inline-block');
    $('.main-navigation').css({ "left": $('.site-header__logo').outerWidth() }).show().removeClass('nav-loading');
  }
}

ira.whichNav = function() {
  var windowWidth = Math.ceil($(window).width()) * (3/4);
  var logoWidth = Math.ceil($('.site-header__logo').outerWidth(true));
  var availableWidth = windowWidth - logoWidth;

  if (availableWidth - 15 < ira.getNavWidth()) {
    return 'mobile';
  } else {
    return 'desktop';
  }
}

ira.getNavWidth = function() {
  var navWidth = 20;

  $('.main-navigation li').each(function(i, el) {
    navWidth = navWidth + Math.ceil($(el).outerWidth(true));
  });

  return navWidth;
}

//Since the header elements are variably sized, and we want the content pushed down
//differently depending on whether or not the header is transparent, we use this
//fine little function.
ira.adjustContentOffset = function(options){

  //Both transparent header and parallax are only for index page
  var transparentHeaderEnabled = options.transparentHeaderEnabled;
  var transparentHeaderEnabled = (transparentHeaderEnabled && window.location.pathname === '/');
  var parallaxEnabled = (window.location.pathname === '/');
  var stickyHeaderEnabled = (options.stickyHeaderEnabled);

  function adjust(){
    var paddingTopDistance = 0;
    var headerSizeDistance = 0;
    //On medium breakpoint the header stacks but the height doesn't double.
    //So we have to manually add to the height.

    $('#announcement-bar').each(function(i, e){
      var height = $(e).height();
      paddingTopDistance += height;
      headerSizeDistance += height;
    });

    //IE8 always breaks the header into two rows
    if ( $(window).width() <= 840 || navigator.appVersion.indexOf("MSIE 8") > 1 ) {
      headerSizeDistance += 80;
      if (! transparentHeaderEnabled ){
        paddingTopDistance += 80;
      }
    }


    $('.site-header').each(function(i, e){
      var height = $(e).height();
      headerSizeDistance += height;

      if (! transparentHeaderEnabled ){
        paddingTopDistance += height;
      }
    })




    // Fixes an issue where, if the header is non-fixed/transparent + parallax
    // is enabled, then a white gap from where the parallax els move from could
    // be visible.
    if ( parallaxEnabled && !transparentHeaderEnabled ){
      paddingTopDistance -= 40;
    }

    //FF fix having subpixel gaps with notification bar
    if (paddingTopDistance >= 40){
      paddingTopDistance -= 1;
    }


    // ira.cache.$pageContainer.css('padding-top', paddingTopDistance);
    return paddingTopDistance;
  }

  if (! this.hasSetContentAdjustOnResize){
    this.hasSetContentAdjustOnResize = true;
    $(window).resize(adjust);
  }



  return adjust();

}



ira.searchInit = function(options){

  var config = {
    openClassSelector: '.search-open',
    closeClassSelector: '.search-close',
    searchBarSelector: '#HeaderSearchBar',
    searchInputSelector: '#searchBarInput',
    jsClassOpen: 'js-search-open'
  }

  var transparentHeaderEnabled = options.transparentHeaderEnabled;

  var $nodes = {
    open : $(config.openClassSelector),
    close: $(config.closeClassSelector),
    searchBar: $(config.searchBarSelector),
    input: $(config.searchInputSelector)
  };

  //Only have elements be tab-able when search is open
  $nodes.close.add($nodes.input).attr('tabindex', -1);

  function drawerOpenHandler(e){
    ira.NavDrawer.close();
    ira.CartDrawer.close();
    $nodes.searchBar.revealer("show");
    $nodes.close.add($nodes.input).attr('tabindex', 0)

    //iOS has a known issue for focusing on a fixed element
    if (!( ( navigator.userAgent.match(/(iPod|iPhone|iPad)/) && options.stickyHeaderEnabled )
      ||  navigator.appVersion.indexOf("MSIE 8") > 0) ) {

      setTimeout(function(){$('#searchBarInput').select();}, 300);
      $nodes.input[0].select();
    }



    ira.cache.$header.add(ira.cache.$html).addClass(config.jsClassOpen);
    e.preventDefault();
    e.stopPropagation();
    return false;

  }

  function drawerCloseHandler(e){
    if (typeof e !== 'undefined' && typeof e.preventDefault == "function"){
      e.preventDefault();
    }
    $nodes.searchBar.revealer("hide");
    ira.cache.$header.add(ira.cache.$html).removeClass(config.jsClassOpen);

    $nodes.close.add($nodes.input).attr('tabindex', 0);
  }

  function keyboardHandlers(){
    //Close the menu when the escape key is pressed.
    window.onkeydown = function( event ) {
        if ( event.keyCode === 27 ) {
            drawerCloseHandler();
        }

        //alt+f brings up search
        if (event.keyCode === 70 && event.altKey ){
          event.preventDefault();
          drawerOpenHandler()
        }
    };
  }

  function closeOnOutsideClick(e){
    //Only close if the user clicks outside of searchbox.
    //Also included header, otherwise it pre-emptively closes before opening.
    if ($('html').hasClass('js-search-open') && $(e.target).closest($nodes.searchBar).length === 0 && $(e.target).closest(ira.cache.$header).length === 0) {
      drawerCloseHandler();
    }
  }

  function killEvent(e){
    e.preventDefault();
    e.stopPropagation();
  }


  //IE8 doesn't play nicely with some of our layout voodoo,
  //so when they click search just follow the href to search page.
  if (navigator.appVersion.indexOf("MSIE 8") <= 0){
    $($nodes.open[0]).on('click', drawerOpenHandler);
    $($nodes.close[0]).on('click', drawerCloseHandler);
    $($nodes.searchBar[0]).on('click', killEvent)
    $(document).on('click', closeOnOutsideClick);
    keyboardHandlers();
  }
}

ira.drawersInit = function () {
  ira.NavDrawer = new ira.Drawers('NavDrawer', 'right');
  ira.CartDrawer = new ira.Drawers('CartDrawer', 'right', {
    'onDrawerOpen': ajaxCart.load
  });

  ira.allDrawers = [ira.NavDrawer, ira.CartDrawer];
};

//Always init the exit intent so that things like clicking
//the 'subscribe now' button can open the modal, but only
//listen to mouse exit intent if the user has activated it
ira.exitIntentInit = function(){
  var $overlay = this.cache.$exitIntentOverlay;

  if (window.ThemeEditor == null && $('[data-exit-intent-overlay]').length) {
    setTimeout(function(){
      $(document).on('mouseleave', function(){
        if (!sessionStorage["disableExitIntent"]){
          sessionStorage["disableExitIntent"] = true;
          //$('[data-exit-intent-overlay]').addClass('show');
        }
      });
    }, 2500);
  };

  $('body').on('click', '.close-exit-intent', function(e){
    e.preventDefault();
    $overlay.removeClass('show');
  });

  $('body').on('click', '.show-exit-intent', function(e){
    e.preventDefault();
    $overlay.addClass('show');
  })

  //Close if user clicks outside of exit intent on overlay
  $('body').on('click', '.exit-intent-overlay', function(e){
    if ( $(e.target).parents('.exit-intent').length === 0 ){
      e.preventDefault();
      $overlay.removeClass('show');
    }
  });

  //checks URL for successful submission of form, then shows the popup
  q = window.location.search.slice(1);
  if(q == "customer_posted=true") {
    $overlay.addClass('show');
  };
}

ira.storyGridInit = function(){
  $('.featured-content').each(function(i, el){
    $(el).imagesLoaded(function(){
      $(el).find('.grid--story__image').each(function(i, el){
        var $el = $(el);
        var $image = $el.find('img'),
            image;

        if (!$image.length) { return; }

        var image = $image.get(0).getBoundingClientRect();

        var h = image.height,
            w = image.width;
        var aspect = h/w;

        if (aspect > 0.6) { $el.addClass('aspect-wide'); }
        else { $el.addClass('aspect-narrow'); }
      });
    });
  });
}

ira.mobileNavToggle = function () {
  $('.mobile-nav__has-sublist').on('click', function() {
    $(this).toggleClass('mobile-nav--expanded');
    $(this).find('button > .icon').toggleClass('fade-in fade-and-flip');
  });
};

ira.getHash = function () {
  return window.location.hash;
};

ira.updateHash = function (hash) {
  window.location.hash = '#' + hash;
  $('#' + hash).attr('tabindex', -1).focus();
};

ira.productPage = function (container, options) {
  var defaultCurrency = options.default_currency,
      variant = options.variant,
      selector = options.selector;

  // Selectors
  var $productImage = $('#ProductPhotoImg'),
      $addToCart = container.find("[type=submit]"),
      $productPrice = container.find('[data-product-price]'),
      $comparePrice = container.find('[data-compare-price]'),
      $quantityElements = container.find('.quantity-selector, label + .js-qty'),
      $addToCartText = container.find('[data-add-to-cart-text]');

  if (variant) {

    // Select a valid variant if available
    if (variant.available) {
      // Available, enable the submit button, change text, show quantity elements
      $addToCart.removeClass('disabled').prop('disabled', false);
      $addToCartText.html("Add to Cart");
      $quantityElements.show();
    } else {
      // Sold out, disable the submit button, change text, hide quantity elements
      $addToCart.addClass('disabled').prop('disabled', true);
      $addToCartText.html("Sold Out");
      $quantityElements.hide();
    }

    var formattablePrices = {
      regular: variant.price,
      compare_at: variant.compare_at_price
    };

    /**if (window.Currency && ira.cache.$headerCurrencyConverter.length) {
      formattablePrices = {
        regular: Currency.convert(variant.price, defaultCurrency, Currency.currentCurrency),
        compare_at: Currency.convert(variant.compare_at_price, defaultCurrency, Currency.currentCurrency)
      };
    };**/

    // Regardless of stock, update the product price

    /**$productPrice.html( Currency.formatMoney(formattablePrices.regular, moneyFormat) );**/

    // Also update and show the product's compare price if necessary
    /**if (formattablePrices.compare_at > formattablePrices.regular) {
      $comparePrice
        .html(Currency.formatMoney(formattablePrices.compare_at, moneyFormat))
        .show();
    } else {
      $comparePrice.hide();
    }**/

  } else {
    // The variant doesn't exist, disable submit button.
    // This may be an error or notice that a specific variant is not available.
    // To only show available variants, implement linked product options:
    //   - http://docs.shopify.com/manual/configuration/store-customization/advanced-navigation/linked-product-options
    $addToCart.addClass('disabled').prop('disabled', true);
    $addToCartText.html("Unavailable");
    $quantityElements.hide();
  }
};

ira.productImageSwitch = function () {
  ira.cache.$thumbImages.on('click focus', function (event) {
    event.preventDefault();
    event.stopPropagation();

    var index = ira.cache.$thumbImages.index(this);

    ira.cache.$productImages
      .hide()
      .eq(index)
        .show();
  });
};

ira.productSidebar = function () {
  var photoContainer = ira.cache.$photoContainer;
  var sidebar = $('#sidebarColumn');
  var sidebarInner = sidebar.children('.sidebarColumn-inner');

  var stickyEnabled = sidebar.hasClass('sticky-sidebar');

  if (!stickyEnabled || ira.isIOS) return;

  var offsetStickyHeader = ira.cache.$header.hasClass('sticky-header');

  if (offsetStickyHeader) {
    sidebar.addClass('has-sticky-header')
  };

  $(window).on('resize scroll tab-changed tab-extended', function() {
    if (photoContainer.outerHeight() === sidebarInner.outerHeight() + 40) return;

    var inactive = true;

    var scrollTop = $(document).scrollTop();
    var headerOuterHeight = ira.cache.$header.outerHeight();
    var stickyHeaderOffset = offsetStickyHeader ? headerOuterHeight : 0;

    // +/- 1px to account for borders and pixel rounding
    var sidebarSpec = {
      outerWidth: sidebar.outerWidth() + 1,
      outerHeight: sidebar.outerHeight(),
      outerTop: sidebar.offset().top - 1,
      innerHeight: sidebarInner.outerHeight(),
      scrollHeight: scrollTop + window.innerHeight
    };

    var criteria = {
      widthMet: window.innerWidth > 840,
      topScrolled: scrollTop > sidebarSpec.outerTop - stickyHeaderOffset,
      heightExceeded: sidebarSpec.innerHeight + stickyHeaderOffset > window.innerHeight,
      pastSidebarBottom: sidebarSpec.scrollHeight > sidebarSpec.outerTop + sidebarSpec.innerHeight + (sidebar.hasClass('sticky-bottom') ? 0 : 40),
      pastFooterTopOutsideHeight: sidebarSpec.scrollHeight > sidebarSpec.outerTop + sidebarSpec.outerHeight,
      pastFooterTopInsideHeight: scrollTop + sidebarSpec.innerHeight + stickyHeaderOffset > sidebarSpec.outerTop + sidebarSpec.outerHeight
    };

    if (criteria.widthMet && criteria.topScrolled) {
      sidebarInner.css('width', sidebarSpec.outerWidth);

      if ((criteria.heightExceeded && criteria.pastFooterTopOutsideHeight) || (!criteria.heightExceeded && criteria.pastFooterTopInsideHeight)) {
        sidebar.removeClass('sticky-bottom sticky-top');
        sidebar.addClass('stuck');
        inactive = false;
      } else if (!criteria.heightExceeded) {
        sidebar.removeClass('stuck sticky-bottom');
        sidebar.addClass('sticky-top');
        inactive = false;
      } else if (criteria.heightExceeded && criteria.pastSidebarBottom) {
        sidebar.removeClass('stuck sticky-top');
        sidebar.addClass('sticky-bottom');
        inactive = false;
      };
    };

    if (inactive) {
      sidebar.removeClass('sticky-top sticky-bottom stuck');
      sidebarInner.css('width', 'auto');
    };
  }).trigger('resize');
};

ira.responsiveVideos = function () {
  $('iframe[src*="youtube.com/embed"]').wrap('<div class="video-wrapper"></div>');
  $('iframe[src*="player.vimeo"]').wrap('<div class="video-wrapper"></div>');
};

ira.collectionSortSetup = function() {
  ira.collectionFilter();
  ira.collectionSort();
}

ira.collectionFilter = function() {
  $('.collection-filtering').on('change', 'select', function(event) {
    _filterProducts(event);
  });

  $('.collection-filters').children().each(function(i, el) {
    var $el = $(el);
    var width = $el.find('.collection-filters-title').width();

    $el.find('select').css({
      'padding-left': width + 20
    });
  });

  var _filterProducts = function(event) {
    var $target = $(event.currentTarget);
    var value = $target.val();
    var collection = '/collections/' + $target.data('collection-handle') + '/';

    location = collection + value;
  }
}

ira.collectionSort = function() {
  $('.collection-sort').on('change', 'select', function(event) {
    _sortProducts(event);
  });

  var _sortProducts = function(event) {
    var $target = $(event.currentTarget);
    var Sorting = {}
    Sorting.sort_by = $target.val();

    if ($target.closest('.collection-sort').hasClass('vendor-page')) {
      var currentSearch = location.search;
      var searchParts = currentSearch.split('&');

      $.each(searchParts, function(index, part) {
        if (part.indexOf('sort_by') !== -1) {
          searchParts.splice(index, 1);
        }
      });

      var search = searchParts.join('&');
      location.search = search + '&' + $.param(Sorting);
    } else {
      location.search = $.param(Sorting);
    }
  }
}

ira.collectionViews = function () {
  if (ira.cache.$changeView.length) {
    ira.cache.$changeView.on('click', function() {
      var view = $(this).data('view'),
          url = document.URL,
          hasParams = url.indexOf('?') > -1;

      if (hasParams) {
        window.location = replaceUrlParam(url, 'view', view);
      } else {
        window.location = url + '?view=' + view;
      }
    });
  }

  //Resize the product name size for mobile when viewing collections
  //This makes sure that even very long titles will be visible for mobile,
  //including a full paragraph of Lorem Ipsum.
  
  $('.supports-touch .product_image_caption').each(function(i, e){
      var $e = $(e);
      var textLength = $e.find('.h2').text().length;
      var fontSize = 16;

      switch (true) {
          case (textLength < 50):
              fontSize = 16;
              break;
          case (textLength < 100):
              fontSize = 15;
              break;
          case (textLength < 150):
              fontSize = 14;
              break;
          case (textLength < 200):
              fontSize = 13;
              break;
          case (textLength >= 200):
              fontSize = 12;
              break;
          default:
              fontSize = 16;
              break;
      }
      $e.css('font-size', fontSize);
  });


};

ira.loginForms = function() {
  function showRecoverPasswordForm() {
    ira.cache.$recoverPasswordForm.show();
    ira.cache.$customerLoginForm.hide();
  }

  function hideRecoverPasswordForm() {
    ira.cache.$recoverPasswordForm.hide();
    ira.cache.$customerLoginForm.show();
  }

  ira.cache.$recoverPasswordLink.on('click', function(evt) {
    evt.preventDefault();
    showRecoverPasswordForm();
  });

  ira.cache.$hideRecoverPasswordLink.on('click', function(evt) {
    evt.preventDefault();
    hideRecoverPasswordForm();
  });

  // Allow deep linking to recover password form
  if (ira.getHash() == '#recover') {
    showRecoverPasswordForm();
  }
};

ira.resetPasswordSuccess = function() {
  ira.cache.$passwordResetSuccess.show();
};

ira.initInstaGrid = function(){
  var instagramContainer = $('#instagrid');
  var accessToken = instagramContainer.attr('data-access-token');

  if (!instagramContainer.length || accessToken == null || !accessToken.length) return;

  ira.instaGrid = new ira.InstaGrid(accessToken);
};

ira.collectionList = function () {

  function CollectionList(context) {

    var grid_items = context.querySelectorAll("[data-grid-item]");

    grid_items.forEach(function (element) {
      var overlay = element.querySelector(".index-grid-item-overlay");

      element.addEventListener("mouseenter", function () {
        overlay.style.opacity = overlay.dataset.hoverOpacity;
      });

      element.addEventListener("mouseout", function () {
        overlay.style.opacity = overlay.dataset.opacity;
      });
    });
  }

  var elements = document.querySelectorAll(".featured-collections");

  elements.forEach(function (element) {
    CollectionList(element);
  });
};


/**
 * Whenever the user follows a link, have the site
 * fade to white.
 */
ira.fadeOutOnClick = function(){

  //By setting up an Unload event we remove page caching
  //which makes the browser do a new HTTP request when
  //clicking the back button, instead of trying to
  //rebuild the page.
  window.onunload = function(e){
    // console.info("unload event:", e);
  };

  window.onpageshow = function(event) {
      if (event.persisted) {
          window.location.reload()
      }
  };


  var $overlay = this.cache.$fadeOutOverlay;
  var time = 300;
  var animation = 'ease';
  $('body').on('click', 'a', function(e){
    if (e.metaKey || e.shiftKey) return;
    var href = $(this).attr('href');
    //If it's a #, or starts with one, it's either an anchor or a dummy link.
    if (typeof href === 'undefined' || href === '#' || href.indexOf('#') === 0 || href.indexOf("mailto:") !== -1) return;
    if ($(this).attr('target') == "_blank") return;

    e.preventDefault();
    $overlay.addClass('show');

     setTimeout(function(){
        location.href = href;
    }.bind(this), time / 2)
  });

}

ira.parallax = function() {

  var onHomePage = window.location.pathname === '/';
  var onCollectionPage = window.location.pathname.split('/')[1] === 'collections';
  var onImageCollectionPage = onCollectionPage && $('.section-header--image').length;

  if (!onHomePage && !onImageCollectionPage) {
    return;
  }

  var animating = false,
      $parallax = $('[data-parallax="true"]');

  ira.cache.$body.addClass('js-parallax');

  scrollEvent();

  function scrollEvent(){

    if (!is_touch_device() && ira.cache.windowWidth > 840) {

      var viewportTop = ira.cache.$window.scrollTop();
      var windowHeight = ira.cache.windowHeight;

      if (viewportTop <= windowHeight + 40) {

        $parallax.each(function(i, el) {
          var $el = $(el);
          var sym;
          var direction = $el.attr('data-direction');
          var speed = $el.attr('data-speed');
          var distance = viewportTop * speed;

          if (direction === 'up') {
            sym = '-';
          } else {
            sym = '';
          }

          distance = +distance.toFixed(2);

          $el.css({
            'transform': 'translate3d(0, ' + sym + distance + 'px, 0)'
          });
        });
      }

      animating = false;
    }
  }

  function is_touch_device() {
    return 'ontouchstart' in window // works on most browsers
        || 'onmsgesturechange' in window; // works on ie10
  }

  var throttlePrepare = _.throttle(function() {
    if (!animating){
      window.requestAnimationFrame(scrollEvent);
      animating = true;
    }
  }, 1000/60);

  ira.cache.$window.on('scroll', throttlePrepare);
};

ira.truncateExcerptText = function(){
  var MAX_CHARS = 180;

  $('.excerpt').each(function(i, e){
    var origText = $(this).text();
    var posturl = $(this).attr("data-href");
    
    var purl = ' <a href="'+posturl+'"></a>';
    if ( origText.length > MAX_CHARS ){

      var cut = cutKeepingTags(this, 180,purl);
      var elements = $(cut.text);
      //Add the elipses to the last child element in whatever tag its in.
      elements.find('*:last-child').last().text(elements.find('*:last-child').last().text() + '...');

      $(this).text('')
      .append(elements);

    }
  });

  function cutKeepingTags(elem, reqCount,url) {
    var grabText = '',
        missCount = reqCount;
    $(elem).contents().each(function() {
      switch (this.nodeType) {
        case Node.TEXT_NODE:
          // Get node text, limited to missCount.
          grabText += this.data.substr(0,missCount)+url;
          missCount -= Math.min(this.data.length, missCount);
          break;
        case Node.ELEMENT_NODE:
          // Explore current child:
          var childPart = cutKeepingTags(this, missCount);
          grabText += childPart.text;
          missCount -= childPart.count;
          break;
      }
      if (missCount == 0) {
        // We got text enough, stop looping.
        return false;
      }
    });
    return {
      text:
        // Wrap text using current elem tag.
        elem.outerHTML.match(/^<[^>]+>/m)[0]
        + grabText
        + '</' + elem.localName + '>',
      count: reqCount - missCount
    };
  }
}


/*============================================================================
  Drawer modules
  - Docs http://shopify.github.io/timber/#drawers
==============================================================================*/
ira.Drawers = (function () {
  var Drawer = function (id, position, options) {
    var defaults = {
      close: '.js-drawer-close',
      open: '.js-drawer-open-' + id,
      openClass: 'js-drawer-open',
      dirOpenClass: 'js-drawer-open-' + id
    };

    this.$nodes = {
      parent: $('body, html'),
      page: $('#PageContainer'),
      moved: $('.is-moved-by-drawer'),
      headerControl: $('.header-control' + '.'+defaults.dirOpenClass ),
      background: $('.drawer__background'),
      content: $('#' + id + ' .drawer__content')
    };

    this.config = $.extend(defaults, options);
    this.position = position;
    this.id = id;

    this.$drawer = $('#' + id);

    if (!this.$drawer.length) {
      return false;
    }

    this.drawerIsOpen = ira.cache.$body.hasClass('js-drawer-open-NavDrawer');
    this.init();
  };

  Drawer.prototype.init = function () {
    $(this.config.open).on('click', $.proxy(this.open, this));
    this.$drawer.find(this.config.close).on('click', $.proxy(this.close, this));

    //Close on click - Make it so clicking anywhere outside of the drawer closes them
    // this.$nodes.background.add(this.$nodes.content).on('click',
    this.$drawer.on('click',
      function(e){
        e.stopPropagation();
    });

    this.$nodes.parent.on('click', function(e){
        ira.NavDrawer.close();
        ira.CartDrawer.close();
    });

  };

  Drawer.prototype.open = function (evt) {
    // Keep track if drawer was opened from a click, or called by another function
    var externalCall = false;

    // Prevent following href if link is clicked
    if (evt) {
      evt.preventDefault();
    } else {
      externalCall = true;
    }

    $('.js-drawer-open-' + this.id).closest('.header-control').addClass('active');

    // ira.carousels.forEach(function(carousel) {
    //   carousel.pause();
    // });

    // Without this, the drawer opens, the click event bubbles up to $nodes.page
    // which closes the drawer.
    if (evt && evt.stopPropagation) {
      evt.stopPropagation();
      // save the source of the click, we'll focus to this on close
      this.$activeSource = $(evt.currentTarget);
    }

    if (this.drawerIsOpen && !externalCall) {
      return this.close();
    }

    if ( this.otherDrawersOpen() ){
       this.otherDrawer().close();
    }

    this.scrollPositionOnOpen = $(window).scrollTop();

    // Add is-transitioning class to moved elements on open so drawer can have
    // transition for close animation
    this.$nodes.moved.addClass('is-transitioning');
    this.$drawer.prepareTransition();

    this.$nodes.parent.addClass(this.config.openClass + ' ' + this.config.dirOpenClass);
    this.drawerIsOpen = true;

    Drawer.prototype.trapFocus(this.$drawer, 'drawer_focus');

    // Run function when draw opens if set
    if (this.config.onDrawerOpen && typeof(this.config.onDrawerOpen) == 'function') {
      if (!externalCall) {
        this.config.onDrawerOpen();
      }
    }

    if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
      this.$activeSource.attr('aria-expanded', 'true');
    }

    this.$nodes.page.on('click.drawer', $.proxy(function () {
      this.close();
      return false;
    }, this));


  };

  Drawer.prototype.close = function (evt) {
    if (!this.drawerIsOpen) { // don't close a closed drawer
      return;
    }

    if ($(window).width() <= 840){
      $(window).scrollTop(this.scrollPositionOnOpen);
    }

    // ira.carousels.forEach(function(carousel) {
    //   carousel.play();
    // });

    // deselect any focused form elements
    $(document.activeElement).trigger('blur');

    // Ensure closing transition is applied to moved elements, like the nav
    this.$nodes.moved.prepareTransition({ disableExisting: true });
    this.$drawer.prepareTransition({ disableExisting: true });

    this.$nodes.parent.removeClass(this.config.dirOpenClass + ' ' + this.config.openClass);

    this.drawerIsOpen = false;

    Drawer.prototype.removeTrapFocus(this.$drawer, 'drawer_focus');

    this.$nodes.page.off('.drawer');
    this.$nodes.headerControl.removeClass('active');
  };


  Drawer.prototype.trapFocus = function ($container, eventNamespace) {
    var eventName = eventNamespace ? 'focusin.' + eventNamespace : 'focusin';

    $container.attr('tabindex', '-1');

    $container.focus();

    $(document).on(eventName, function (evt) {
      if ($container[0] !== evt.target && !$container.has(evt.target).length) {
        $container.focus();
      }
    });
  };

  Drawer.prototype.removeTrapFocus = function ($container, eventNamespace) {
    var eventName = eventNamespace ? 'focusin.' + eventNamespace : 'focusin';

    $container.removeAttr('tabindex');
    $(document).off(eventName);
  };

  /**
   * This function assumes that there are only two drawers.  It returns the other drawer.
   * @return Drawer
   */
  Drawer.prototype.otherDrawer = function(){
    var output;
    ira.allDrawers.forEach(function(e){
        if (e.id  !== this.id){
          output = e;
        }
    }.bind(this));
    return output;
  }

  Drawer.prototype.otherDrawersOpen = function(){
    for (var i = 0; i < ira.allDrawers.length; i++){
      var e = ira.allDrawers[i];
      if (e.drawerIsOpen && (e.id !== this.id) ) {
        return true;
      }
    }
    return false;

  }

  return Drawer;
})();

/*============================================================================
  Carousel
==============================================================================*/
ira.carousels = [];

ira.Carousel = (function(){

  var Carousel = function(config){
    var defaults = {
      slideTimeout: 10000, // Should this be a setting?
      enableKenBurns: false
    };

    this.config = $.extend(defaults, config);
    this.slides = this.config.container.find('.carousel-slides');

    if (config.offsetNotificationBar) {
      this.config.container.addClass('offset-announcement-bar');
    };

    this.config.enableKenBurns = (this.config.enableKenBurns == "true");

    $(window).on('resize', this.setTextMaxHeight.bind(this));

    this.init();
  };

  Carousel.prototype.init = function() {
    this.slides.on('init', this.slideInit.bind(this));
    this.slides.on('afterChange', this.afterChange.bind(this));

    this.slides.slick({
      autoplay: true,
      dots: true,
      arrows: false,
      mobileFirst: true,
      respondTo: 'min',
      adaptiveHeight: false,
      autoplaySpeed: this.config.slideTimeout,
      pauseOnHover: false,
      draggable: false,
      fade: true,
      lazyload: 'progressive',
    });

    $(window).trigger('resize');
  };

  Carousel.prototype.pause = function() {
    this.slides.slick('pause');
  };

  Carousel.prototype.play = function() {
    this.slides.slick('play');
  };

  Carousel.prototype.goTo = function(index) {
  //  this.slides.slick('slickGoTo', index);
  };

  Carousel.prototype.slideInit = function(_, slick) {
    var currentSlideIndex = slick.slickCurrentSlide();

    this.slick = slick;
    this.slides.trigger('afterChange', [ slick, currentSlideIndex ]);

    this.getSlide(currentSlideIndex).addClass('visible');

    if (this.config.enableKenBurns) {
      this.getSlide(currentSlideIndex).addClass('ken-burns');
    };
  };

  Carousel.prototype.afterChange = function(_, slick, index) {
    var previousSlide = this.getSlide(index - 1);
    var currentSlide = this.getSlide(index);

    previousSlide.removeClass('visible');
    currentSlide.addClass('visible');

    if (this.config.enableKenBurns) {
      previousSlide.removeClass('ken-burns');
      currentSlide.addClass('ken-burns');
    };
  };

  Carousel.prototype.getSlide = function(index) {
    if (index < 0) index = this.slick.$slides.length - 1;
    return $(this.slick.$slides[index]);
  };

  Carousel.prototype.setTextMaxHeight = function() {
    var heights = this.slick.$slides.toArray().map(function(slide) {
      if ($(slide).find('.carousel-slide-text-inner').length) {
        return slide.querySelector('.carousel-slide-text-inner').clientHeight;
      }
    });

    var maxHeight = Math.max.apply(Math, heights)

    this.slick.$slides.each(function(_, slide) {
      if ($(slide).children('.carousel-slide-text').length) {
        $(slide).children('.carousel-slide-text').css('height', maxHeight);
      }
    });
  };

  return Carousel;
})();

/*============================================================================
  Videa players
==============================================================================*/

var supportsInlinePlayer = ('playsInline' in document.createElement('video'));

ira.videoPlayers = [];

ira.VideoPlayer = (function(){

  var VideoPlayer = function(config){
    var defaults = { };

    this.config = $.extend(defaults, config);
    this.config.sectionID = this.config.container.attr('data-id');

    if (config.offsetNotificationBar) {
      this.config.container.addClass('offset-announcement-bar');
    };

    this.init();
  };

  VideoPlayer.prototype.init = function() {
    if (ira.isIOS && !supportsInlinePlayer) {
      this.config.container.find('.feature-video-video').hide();
    };
  };

  return VideoPlayer;
})();

/*============================================================================
  InstaGrid
==============================================================================*/
ira.InstaGrid = (function(){
  var InstaGrid = function(token){
    this.clientID = token;
    this.baseAPI = 'https://api.instagram.com/v1/';
    this.numberOfImages = 8; //This is the amount of visible image blocks, currently a max.
    this.maxImages = 8;
    this.imageIndex = this.numberOfImages; //track what # image to get from instagram
    this.$node = $('#instagrid');
    this.transitionSpeed = 1000; //ms
    this.instagramImageData = [];
    this.captionClassName = 'instagrid-caption';
    this.refreshTime =  2500; //ms
    this.randomize = true;
    this.loopAnimation = true;

    if (this.$node.length && this.clientID){
      this.init();
    }
  }

  InstaGrid.prototype.init = function() {
    this.authenticateWithAccessToken({
      'accessToken' : this.clientID,
      'feedType' : 'recent'
    })
    .then(function(images){
      this.insertImages(images);
      this.continuallyUpdateImages();
    }.bind(this))
    .fail(function(response){
      this.$node.remove();
      console.error("Could not instantiate Instagram Grid.", response);
    }.bind(this))
  };

  InstaGrid.prototype.getUserID = function(userName) {
    // 'https://api.instagram.com/v1/users/search?q=[USERNAME]&client_id=[CLIENT_ID]'
    var url = this.baseAPI + 'users/search?q='+userName+'&client_id='+this.clientID;
    url += '&callback=callbackFunction'; //make it a JSONP request
    var promise = jQuery.Deferred();

    $.ajax({
      'type' : 'GET',
      dataType : 'jsonp',
      data: {},
      url: url,
      success: function(data){
        if (typeof data.data === "undefined") {
          return promise.reject(data.meta);
        }
        var target = data.data.filter(function(e){
          return e.username === userName
        });
        promise.resolve(target[0].id)
      }.bind(this),
    });

    return promise.promise();

  };

  InstaGrid.prototype.authenticateWithAccessToken = function(options) {
    if (typeof options.feedType !== 'string'){
      options.feedType = 'recent';
    }


    var promise = jQuery.Deferred();
    var url = this.baseAPI + 'users/self/media/'+options.feedType+'?access_token=' + options.accessToken;

    $.ajax({
      'type' : 'GET',
      dataType: 'jsonp',
      data: {},
      url: url,
      success: function(response){

          if (! response) {
            promise.reject({code: 400, message: "No response from Instagram servers"});
          }

          if (response.meta.code === 400){
            promise.reject(response);
          }

          //any 2xx code
          if (response.meta.code === 200 || String(response.meta.code).indexOf('2') === 0 ) {
            this.instagramImageData = response.data;
            promise.resolve(response.data);
          }

          promise.reject(response);


      }.bind(this)
    });

    return promise.promise();


  };

  InstaGrid.prototype.insertImages = function(images){
    //We get the model/structure of the div from the markup, and just repeat it.
    var exampleDiv = this.$node.find('div:first').detach();
    var classes = exampleDiv[0].className;
    var allImages = [];

    //total number of visible/loaded images should
    //never exceed total available images.
    if (this.numberOfImages > images.length){
      this.numberOfImages = images.length;
    }

    images.forEach(function(image, i){
      if (i >= this.maxImages) return;

      var div = document.createElement('div');
      var div1 = document.createElement('div');
      div1.className='instaGridInner';
      var src = image.images.standard_resolution.url;
      var imgWrapper = document.createElement('span');
      var img = document.createElement('img');
      var link = document.createElement('a');



      //When we transition the images, we fade between them, which requires
      //position absolute.  To make sure there the flow isn't modified,
      //we add a spacer element.
      //We have to wait to set the height of the element until the images
      //are loaded into the DOM, as currently the img height is 0px.
      var spacer = document.createElement('div');
      spacer.className = 'spacer'

      img.src = src;
      img.className = 'photo';
      div.className = classes;
      imgWrapper.className = 'image-wrapper';

      link.href = image.link;
      link.target = '_blank';
      imgWrapper.appendChild(img);
      div1.appendChild(imgWrapper);
      div.appendChild(div1);
      
      this.createAndAppendCaption(image, div1);
      div1.appendChild(link);

      allImages.push(div);
    }.bind(this))
    this.$node.append(allImages);
  }

  InstaGrid.prototype.createAndAppendCaption = function(image, target) {
    //var caption = this.createCaption(image);
   // return target.appendChild(caption);
  };

/*  InstaGrid.prototype.createCaption = function(image) {
    var caption = document.createElement('div');
    var likes = document.createElement('p');
    //Inline the svg.  Easier to create it this way then via createElement, as we'd also have to create the paths 1 by 1.
    var heart = $('<svg width="16px" height="15px" viewBox="0 0 16 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><title>0219-heart</title><desc>Created with Sketch.</desc><defs></defs><g id="Index-—-Presets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Preset-4-—-Footer-1" sketch:type="MSArtboardGroup" transform="translate(-108.000000, -2697.000000)" fill="#FFFFFF"><g id="0219-heart-+-0-copy" sketch:type="MSLayerGroup" transform="translate(108.000000, 2696.000000)"><path d="M11.7993748,1 C10.1184373,1 8.67062483,2.38538538 8.00062484,3.83119748 C7.32906236,2.38538538 5.88124989,1 4.20031242,1 C1.88124996,1 0,2.90581446 0,5.25264907 C0,10.0276255 4.75843741,11.2795026 8.00062484,16.0003796 C11.0656248,11.3092414 15.9996872,9.87576773 15.9996872,5.25264907 C15.9996872,2.90581446 14.1187497,1 11.7993748,1 L11.7993748,1 Z" id="0219-heart" sketch:type="MSShapeGroup"></path></g></g></g></svg>')[0];
    var span = document.createElement('span');
    var text = document.createElement('p');

    caption.className = this.captionClassName;
    text.className = 'quote';
    span.className = 'count';
    likes.className = 'likes';

    var willImageHave = doesImageHaveCaption(image);

    if (willImageHave['text']){
      text.innerHTML =   image.caption.text;
    }

    if (willImageHave['likes']){
      var likesText = document.createTextNode(image.likes.count);
      span.appendChild(likesText);
    }

    likes.appendChild(span);
    likes.appendChild(heart);
    caption.appendChild(text);
    caption.appendChild(likes);
    return caption;
  };
*/

  InstaGrid.prototype.replaceCaption = function(index, image) {
    var target = this.$node.children().eq(index);
    var captionSelector = '.instagrid-caption'
    var countSelector = captionSelector + ' .likes .count';
    var quoteSelector = captionSelector + ' .quote';
    var captionText = '';
    var likeCount = 0;
    var willImageHave = doesImageHaveCaption(image);

    if (willImageHave['text']){
      captionText = image.caption.text;
    }

    if (willImageHave['likes']){
      var likeCount = image.likes.count;
    }

    target.find(quoteSelector).text(captionText);
    target.find(countSelector).text(likeCount);

  };

  InstaGrid.prototype.replaceImage = function(index, image) {
    var nodes = this.$node.children();
    var target = nodes.eq(index);
    var link = target.find("a");
    var originalImg = target.find('img.photo');
    var newImg = document.createElement('img');
    var transitionCSS = this.transitionSpeed + 'ms ease-in-out';
    var instagramLink = image.images.standard_resolution.url;
    var source = image.link;

    //Set the new values
    link.attr('href', source);
    link.attr('target', '_blank');
    newImg.src = instagramLink;
    newImg.className = 'photo';

    //Fade the image out
    originalImg.css('transition', transitionCSS)
    .css('opacity', '0');

    //Remove the image once fade is done
    setTimeout(function(){
      originalImg.remove();
    }, this.transitionSpeed)

    //Add the replacement image
    $(newImg).css('position', 'absolute')
    target.children('.image-wrapper').prepend(newImg);

    this.replaceCaption(index, image);
  };

  //Updates the image (by index in grid) with the next image from instagram.
  InstaGrid.prototype.updateImages = function(index) {
    if (this.imageIndex >= this.instagramImageData.length - 1){

      if (! this.loopAnimation){
        return this.haltUpdatingImages();
      }

      this.imageIndex = 0;
    }

    var img = this.instagramImageData[this.imageIndex++];

    //If the image is a duplicate don't update it.
    var duplicates = this.$node.children().find("a").toArray().filter(function(e, i){
      return e.href === img.link;
    });

    if (duplicates.length){
      console.info("Duplicate image in InstaGrid, skipping it.");
      return;
    }

   // this.replaceImage(index, img)
  };

  InstaGrid.prototype.continuallyUpdateImages = function() {
    var index = 0;

    if (this.instagramImageData.length <= this.maxImages){
      return; //No point in loading in new images if there aren't enough.
    }

    this.updateInterval = setInterval(function(){
      if (this.randomize){
        index = Math.floor( Math.random() * this.numberOfImages + 1 );
      }

      if (index >= this.numberOfImages) index = 0;
      this.updateImages(index++)
    }.bind(this), this.refreshTime)
  };

  InstaGrid.prototype.haltUpdatingImages = function() {
    clearInterval(this.updateInterval);
  };

  /*****************************
   * Private / Helper Functions
   ****************************/

  //returns an object with two bools, e.g. {text: false, likes: true},
  //which is truthy, or false, depending on results.
  //useful for the pattern:
//    willImageHave = doesImageHaveCaption(image);
//    if ( willImageHave['likes'] )...
  function doesImageHaveCaption(image){
    var likes = (! _.isNull(image.likes) && typeof image.likes.count === 'number' )
    var text = (! _.isNull(image.caption) && typeof image.caption.text === 'string' )

    if (! text && ! likes){
      return false;
    }

    return {text: text, likes: likes}
  }


  return InstaGrid;
})();


// Initialize ira's JS on docready
$(ira.init);


history.navigationMode = 'compatible';

$(document)
  .on('shopify:section:load', function (event) {
    var section = $(event.target);
    var type = section.attr('class').replace('shopify-section', '').trim();

    ira.initScrollTriggers();

    switch (type) {
      case 'header':
      case 'featured-product':
        ProductPageInit();
        break;
      case 'collection-pages':
        ira.headerInit(type == 'collection-pages');
        ira.drawersInit();
        ira.mobileNavToggle();

        if ($('#announcement-bar').length > 0) {
          ira.cache.$body.addClass('respond-to-announcement-bar');
          $('#HeaderSearchBar').addClass('offset-by-announcement-bar');
        } else {
          ira.cache.$body.removeClass('respond-to-announcement-bar');
          $('#HeaderSearchBar').removeClass('offset-by-announcement-bar');
        }

        $(window).trigger('scroll');
        break;
      case 'carousel':
        ira.carousels = [];
        var carousel = section.children('.carousel-container');

        ira.carousels.push(new ira.Carousel({
          container: carousel,
          enableKenBurns: carousel.attr('data-ken-burns'),
          slideTimeout: carousel.attr('data-slide-timeout')
        }));
        break;
      case 'video-player':
        ira.videoPlayers = [];
        var video = section.children('.feature-video-container');

        ira.videoPlayers.push(new ira.VideoPlayer({
          container: video
        }));
        break;
      case 'instagram':
        ira.initInstaGrid();
        break;
      case 'collection-pages':
        ira.collectionSortSetup();
        ira.collectionViews();
        break;
      case 'product-pages':
        ira.productImageSwitch();
        ira.productSidebar();
        ProductPageInit();
        break;
      case 'map':
        var el = $(section).find('[data-map-api]')[0];
        ira.HomePage.loadMap(el);
        break;
    }
  })
  .on('shopify:section:select', function (event) {
    var section = $(event.target);
    var type = section.attr('class').replace('shopify-section', '').trim();

    switch (type) {
      case 'popup':
        $('.exit-intent-overlay').addClass('show');
        break;
    }
  })
  .on('shopify:section:deselect', function (event) {
    var section = $(event.target);
    var type = section.attr('class').replace('shopify-section', '').trim();

    switch (type) {
      case 'popup':
        $('.exit-intent-overlay').removeClass('show');
        break;
    }
  })
  .on('shopify:block:select', function (event) {
    var section = $(event.target);
    var type = section.closest('.shopify-section').attr('class').replace('shopify-section', '').trim();

    switch (type) {
      case 'carousel':
        var slide = $(event.target);

        ira.carousels.forEach(function (carousel) {
          carousel.pause();
          carousel.goTo(slide.attr('data-slick-index'));
        });
        break;
    }
  })
  .on('shopify:block:deselect', function (event) {
    var id = event.originalEvent.detail.sectionId;
    var slide = $(event.target);

    ira.carousels.forEach(function (carousel) {
      carousel.play();
    });
  });

$(document).ready(function(){

/*$(".Banner_section").slick({
      
      dots: true,
      arrows: false,
      mobileFirst: true,
      respondTo: 'min',
      adaptiveHeight: false,
      pauseOnHover: false,
      draggable: false,
      fade: true,
      lazyload: 'progressive',
    });*/
  
    $('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
     
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[id='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[id='+fieldName+']').val(currentVal + 1).trigger('change');
        } else {
            // Otherwise put a 0 there
            //$('input[id='+fieldName+']').val(0);
        }
    });
   $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[id='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[id='+fieldName+']').val(currentVal - 1).trigger('change');
        } else {
            // Otherwise put a 0 there
            $('input[id='+fieldName+']').val(0).trigger('change');
        }
    });
  $('.blog_lists_main li').click(function()
                                 {
  var getvalue = $(this).attr('value');
  var blogtype = $(location).attr('href').split('blogs/')[1];
   window.location.href = "/blogs/"+blogtype+"/tagged/"+getvalue+"";
  });
  
  
  setTimeout(function(){
    var t=0;
    $('.selector-wrapper').each(function(){
      $(this).addClass('loop-select-'+t);
      t++;
    });
    $('.loop-select-2 label').hide();
  }, 300);
  
  //accordion menu 
  
  //accordion menu 
  $('.accord_main .accordion_content').hide();
  $('.accord_main h6').click(function(){
    var fixed_header_coeff = $('.site-header').outerHeight() + 1; /*+1 for shadows*/
    var acc_trigger = $(this);
    var more_offset = 13; /*for some margin between header and the element*/
    
  
    if($(this).is('.active'))
    {
  		$('.accord_main h6').removeClass('active');  
    	$(this).find('span').html('+');
        $(this).next('.accordion_content').slideUp(500);
    }
    else
    {
        $('.accord_main h6').removeClass('active');
        $('.accord_main').find('.accordion_content').slideUp(500);
      	$('.accord_main').find('span').html('+');
    	$(this).addClass('active');
      	$(this).next('.accordion_content').slideDown(500);
      	$(this).find('span').html('-');
    }
    
    //get offset after animation
    setTimeout(function(){
      var acc_trigger_viewport_offset = acc_trigger.offset().top - $(document).scrollTop();
      if(acc_trigger_viewport_offset < fixed_header_coeff){
        //if the accordion title goes above the viewport -> scroll to where the acc title WILL be after the animations
        var acc_trigger_height = acc_trigger.height();
        var acc_trigger_index = $('.accord_main > h6').index( acc_trigger );
        //var acc_trigger.closest(".accord_main").offset().top
        
        $('html, body').animate({
          scrollTop: (acc_trigger.offset().top - fixed_header_coeff - more_offset)
        }, 300);
      }
    }, 501); //after the slideUp/Down animation
      
  });
  
 /* $('.related_products_cart').slick(
    {
        centerMode: true,
        variableWidth: true,
  	slidesToShow: 2,
  	slidesToScroll: 1
  })
  var $slider = $(".related_products")

$slider.slick({
    slidesToShow: 2,
    slidesToScroll: 3,
    infinite: false,
    variableWidth: false
})
.on("beforeChange", function(e, slick, current, next) {
    if( next >= (slick.slideCount - slick.options.slidesToShow)) {
        $slider.addClass("atEnd");
    } else {
        $slider.removeClass("atEnd");   
    }
});
*/
  /*$('.Banner_section').slick(
    {
       // centerMode: true,
     //   variableWidth: true,
  	slidesToShow: 1,
  	slidesToScroll: 1
  });*/

});


    // init Masonry after all images have loaded
    var $grid = $('.mason').imagesLoaded( function() {
  	$grid.masonry({
            // Masonry options here
    	    itemSelector: '.article',
    	    fitWidth: true,
    	    columnWidth: '.article'
  	}); 
    });



