	/*
* 2007-2014 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2014 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/
//global variables
//jquery.noConflict();
var responsiveflag = false;
 jQuery(document).ready(function($){
	jQuery('.boxcarousel').bind('slide.bs.carousel', function (e) {
	     jQuery(".carousel-inner ").css("overflow","hidden");
	 });
	 jQuery('.boxcarousel').on('slid.bs.carousel', function () {
	    jQuery(".carousel-inner ").css("overflow","visible");
	 });
	jQuery('#fancybox-map').fancybox({
		'transitionIn'	:	'elastic',
		'transitionOut'	:	'elastic',
		'speedIn'		:	600, 
		'speedOut'		:	200, 
		'overlayShow'	:	false,
		'type' : 'iframe'
	});


	highdpiInit();
	responsiveResize();
	jQuery(window).resize(responsiveResize);
	if (navigator.userAgent.match(/Android/i))
	{
		var viewport = document.querySelector('meta[name="viewport"]');
		viewport.setAttribute('content', 'initial-scale=1.0,maximum-scale=1.0,user-scalable=0,width=device-width,height=device-height');
		window.scrollTo(0, 1);
	}
	//blockHover();
	if (typeof quickView !== 'undefined' && quickView)
		quick_view();
	dropDown();

	if (typeof page_name != 'undefined' && !in_array(page_name, ['index', 'product']))
	{
		bindGrid();

 		jQuery(document).on('change', '.selectProductSort', function(e){
			if (typeof request != 'undefined' && request)
				var requestSortProducts = request;
 			var splitData = jQuery(this).val().split(':');
			if (typeof requestSortProducts != 'undefined' && requestSortProducts)
				document.location.href = requestSortProducts + ((requestSortProducts.indexOf('?') < 0) ? '?' : '&') + 'orderby=' + splitData[0] + '&orderway=' + splitData[1]+"&";
    	});

		jQuery(document).on('change', 'select[name="n"]', function(){
			jQuery(this.form).submit();
		});

		jQuery(document).on('change', 'select[name="manufacturer_list"], select[name="supplier_list"]', function() {
			if (this.value != '')
				location.href = this.value;
		});

		jQuery(document).on('change', 'select[name="currency_payement"]', function(){
			setCurrency(jQuery(this).val());
		});
	}

	jQuery(document).on('click', '.back', function(e){
		e.preventDefault();
		history.back();
	});
	
	jQuery.curCSS = jQuery.css;
	if (!!$.prototype.cluetip)
		jQuery('a.cluetip').cluetip({
			local:true,
			cursor: 'pointer',
			dropShadow: false,
			dropShadowSteps: 0,
			showTitle: false,
			tracking: true,
			sticky: false,
			mouseOutClose: true,
			fx: {             
		    	open:       'fadeIn',
		    	openSpeed:  'fast'
			}
		}).css('opacity', 0.8);

	/* if (!!$.prototype.fancybox)
		$.extend($.fancybox.defaults.tpl, {
			closeBtn : '<a title="' + FancyboxI18nClose + '" class="fancybox-item fancybox-close" href="javascript:;"></a>',
			next     : '<a title="' + FancyboxI18nNext + '" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
			prev     : '<a title="' + FancyboxI18nPrev + '" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
		}); */
		jQuery('.btn-tooltip').tooltip('show');
		jQuery('.btn-tooltip').tooltip('hide');


	jQuery(".title_block").each( function(){
		jQuery(this).html( '<span>'+jQuery(this).html()+'</span>');
	} );	
});

function highdpiInit()
{
	if(jQuery('.replace-2x').css('font-size') == "1px")
	{		
		var els = jQuery("img.replace-2x").get();
		for(var i = 0; i < els.length; i++)
		{
			src = els[i].src;
			extension = src.substr( (src.lastIndexOf('.') +1) );
			src = src.replace("." + extension, "2x." + extension);
			
			var img = new Image();
			img.src = src;
			img.height != 0 ? els[i].src = src : els[i].src = els[i].src;
		}
	}
}


// Used to compensante Chrome/Safari bug (they don't care about scroll bar for width)
function scrollCompensate() 
{
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
}

function responsiveResize()
{
	compensante = scrollCompensate();
	if ((jQuery(window).width()+scrollCompensate()) <= 767 && responsiveflag == false)
	{
		accordion('enable');
	    accordionFooter('enable');
		responsiveflag = true;	
	}
	else if ((jQuery(window).width()+scrollCompensate()) >= 768)
	{
		accordion('disable');
		accordionFooter('disable');
	    responsiveflag = false;
	}
	if (typeof page_name != 'undefined' && in_array(page_name, ['category']))
		resizeCatimg();
}

function blockHover(status)
{
	jQuery(document).off('mouseenter').on('mouseenter', '.product_list.grid li.ajax_block_product .product-container', function(e){

		if (jQuery('body').find('.container').width() == 1170)
		{
			var pcHeight = jQuery(this).parent().outerHeight();
			var pcPHeight = jQuery(this).parent().find('.button-container').outerHeight() + jQuery(this).parent().find('.comments_note').outerHeight() + jQuery(this).parent().find('.functional-buttons').outerHeight();
			jQuery(this).parent().addClass('hovered').css({'height':pcHeight + pcPHeight, 'margin-bottom':pcPHeight * (-1)});
		}
	});

	jQuery(document).off('mouseleave').on('mouseleave', '.product_list.grid li.ajax_block_product .product-container', function(e){
		if (jQuery('body').find('.container').width() == 1170)
			jQuery(this).parent().removeClass('hovered').css({'height':'auto', 'margin-bottom':'0'});
	});
}

function quick_view()
{
	jQuery(document).on('click', '.quick-view:visible, .quick-view-mobile:visible', function(e) 
	{
		e.preventDefault();
		var url = this.rel;
		if (url.indexOf('?') != -1)
			url += '&';
		else
			url += '?';

		if (!!$.prototype.fancybox)
			$.fancybox({
				'padding':  0,
				'width':    1087,
				'height':   610,
				'type':     'iframe',
				'href':     url + 'content_only=1'
			});
	});
}

function bindGrid()
{
	var view = $.totalStorage('display');
	
	if (!view && (typeof displayList != 'undefined') && displayList)
		view = 'list';

	if (view && view != 'grid')
		display(view);
	else
		jQuery('.display').find('li#grid').addClass('selected');
	
	jQuery(document).on('click', '#grid', function(e){
		e.preventDefault();
		display('grid');
	});

	jQuery(document).on('click', '#list', function(e){
		e.preventDefault();
		display('list');
	});
}

function display(view)
{
	 
	var left = 'col-lg-4';
	var right = 'col-lg-8';
	if (view == 'list')
	{
		jQuery('ul.product_list').removeClass('grid').addClass('list row');
 
		jQuery('ul.product_list > li').each( function(){
			var $li = jQuery(this);
			$li.find( '.left-block' ).addClass( left );
			$li.find( '.right-block' ).addClass( right );
			$li.removeClass( "col-lg-"+$li.data('col-lg') ).removeClass( "col-md-"+$li.data('col-md')   ).removeClass(  "col-sm-"+$li.data('col-sm')  );
		} );

		jQuery('.display').find('li#list').addClass('selected');
		jQuery('.display').find('li#grid').removeAttr('class');
		$.totalStorage('display', 'list');
	}
	else 
	{
		jQuery('ul.product_list').removeClass('list').addClass('grid row');
		 
		 jQuery('ul.product_list > li').each( function(){
			var $li = jQuery(this);
			$li.find( '.left-block' ).removeClass( left );
			$li.find( '.right-block' ).removeClass( right );
			$li.addClass( "col-lg-"+$li.data('col-lg') ).addClass( "col-md-"+$li.data('col-md')   ).addClass(  "col-sm-"+$li.data('col-sm')  );
		} );

		jQuery('.display').find('li#grid').addClass('selected');
		jQuery('.display').find('li#list').removeAttr('class');


		$.totalStorage('display', 'grid');
	}	
}

function dropDown() 
{
	elementClick = '#header .current';
	elementSlide =  'ul.toogle_content';       
	activeClass = 'active';			 

	jQuery(elementClick).on('click', function(e){
		e.stopPropagation();
		var subUl = jQuery(this).next(elementSlide);
		if(subUl.is(':hidden'))
		{
			subUl.slideDown();
			jQuery(this).addClass(activeClass);	
		}
		else
		{
			subUl.slideUp();
			jQuery(this).removeClass(activeClass);
		}
		jQuery(elementClick).not(this).next(elementSlide).slideUp();
		jQuery(elementClick).not(this).removeClass(activeClass);
		e.preventDefault();
	});

	jQuery(elementSlide).on('click', function(e){
		e.stopPropagation();
	});

	jQuery(document).on('click', function(e){
		e.stopPropagation();
		var elementHide = jQuery(elementClick).next(elementSlide);
		jQuery(elementHide).slideUp();
		jQuery(elementClick).removeClass('active');
	});
}

function accordionFooter(status)
{
	if(status == 'enable')
	{
		jQuery('#footer .footer-block h4').on('click', function(){
			jQuery(this).toggleClass('active').parent().find('.toggle-footer').stop().slideToggle('medium');
		})
		jQuery('#footer').addClass('accordion').find('.toggle-footer').slideUp('fast');
	}
	else
	{
		jQuery('.footer-block h4').removeClass('active').off().parent().find('.toggle-footer').removeAttr('style').slideDown('fast');
		jQuery('#footer').removeClass('accordion');
	}
}

function accordion(status)
{
	leftColumnBlocks = jQuery('#left_column');
	if(status == 'enable')
	{
		jQuery('#right_column .block .title_block, #left_column .block .title_block, #left_column #newsletter_block_left h4').on('click', function(){
			jQuery(this).toggleClass('active').parent().find('.block_content').stop().slideToggle('medium');
		})
		jQuery('#right_column, #left_column').addClass('accordion').find('.block .block_content').slideUp('fast');
	}
	else
	{
		jQuery('#right_column .block .title_block, #left_column .block .title_block, #left_column #newsletter_block_left h4').removeClass('active').off().parent().find('.block_content').removeAttr('style').slideDown('fast');
		jQuery('#left_column, #right_column').removeClass('accordion');
	}
}

function resizeCatimg()
{
	var div = jQuery('.cat_desc').parent('div');
	var image = new Image;
	jQuery(image).load(function(){
	    var width  = image.width;
	    var height = image.height;
		var ratio = parseFloat(height / width);
		var calc = Math.round(ratio * parseInt(div.outerWidth(false)));
		div.css('min-height', calc);
	});
	if (div.length)
		image.src = div.css('background-image').replace(/url\("?|"?\)$/ig, '');
}
jQuery(document).ready(function(){
    /* Scroll return top */
    jQuery('.return-top').click(function(){
         jQuery('html, body').animate({ scrollTop: 0 }, 'slow'); 
     });
    /* automatic keep header always displaying on top */
    var _return_action = 0;
    if(jQuery('#header').length){
    	 _return_action = jQuery('#header').offset().top;
	}
	var Menu_Fixed = function(){
		"use strict";
				if( jQuery(document).scrollTop() > _return_action + 100){
					jQuery('.return-top').addClass('display');
				}else{
					jQuery('.return-top').removeClass('display');
				}
	}
	jQuery(document).ready(function() {
		Menu_Fixed();
	});
    jQuery(window).scroll(function(event) {
    	Menu_Fixed();
    });
});