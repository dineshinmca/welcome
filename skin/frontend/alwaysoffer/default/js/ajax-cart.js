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
jQuery(document).ready(function(){
	

	jQuery(document).on('click', '.block_cart_collapse', function(e){
		e.preventDefault();
		ajaxCart.collapse();
	});
	jQuery(document).on('click', '.block_cart_expand', function(e){
		e.preventDefault();
		ajaxCart.expand();
	});

	var cart_qty = 0;
	var current_timestamp = parseInt(new Date().getTime() / 1000);

	if (typeof jQuery('.ajax_cart_quantity').html() == 'undefined' || (typeof generated_date != 'undefined' && generated_date != null && (parseInt(generated_date) + 30) < current_timestamp))
		ajaxCart.refresh();
	else
		cart_qty = parseInt(jQuery('.ajax_cart_quantity').html());

	/* roll over cart */
	var cart_block = new HoverWatcher('#header .cart_block');
	var shopping_cart = new HoverWatcher('#header .shopping_cart');

	if ('ontouchstart' in document.documentElement)
	{
		jQuery('.shopping_cart .mini-cart').on('click', function(e){
			e.preventDefault();
		});
	}

	jQuery(document).on('touchstart', '#header .shopping_cart .mini-cart', function(){
		if (jQuery(this).next('.cart_block:visible').length)
			jQuery("#header .cart_block").stop(true, true).slideUp(450);
		else
			jQuery("#header .cart_block").stop(true, true).slideDown(450);
		e.preventDefault();
		e.stopPropagation();
	});

	jQuery("#header .shopping_cart .mini-cart").hover(
		function(){
				jQuery("#header .cart_block").stop(true, true).slideDown(450);
		},
		function(){
			setTimeout(function(){
				if (!shopping_cart.isHoveringOver() && !cart_block.isHoveringOver())
					jQuery("#header .cart_block").stop(true, true).slideUp(450);				
			}, 200);
		}
	);

	jQuery("#header .cart_block").hover(
		function(){
		},
		function(){
			setTimeout(function(){
				if (!shopping_cart.isHoveringOver())
					jQuery("#header .cart_block").stop(true, true).slideUp(450);
			}, 200);
		}
	);

	jQuery(document).on('click', '.delete_voucher', function(e){
		e.preventDefault();
		$.ajax({
			type: 'POST',
			headers: { "cache-control": "no-cache" },
			async: true,
			cache: false,
			url:jQuery(this).attr('href') + '?rand=' + new Date().getTime()
		});
		jQuery(this).parent().parent().remove();
		if (jQuery('body').attr('id') == 'order' || jQuery('body').attr('id') == 'order-opc')
		{
			if (typeof(updateAddressSelection) != 'undefined')
				updateAddressSelection();
			else
				location.reload();
		}
	});

	jQuery(document).on('click', '#cart_navigation input', function(e){
		jQuery(this).prop('disabled', 'disabled').addClass('disabled');
		jQuery(this).closest("form").get(0).submit();
	});

	jQuery(document).on('click', '#layer_cart .cross, #layer_cart .continue, .layer_cart_overlay', function(e){
		e.preventDefault();
		jQuery('.layer_cart_overlay').hide();
		jQuery('#layer_cart').fadeOut('fast');
	});
	
	jQuery('#columns #layer_cart, #columns .layer_cart_overlay').detach().prependTo('#columns');
});

//JS Object : update the cart by ajax actions


function HoverWatcher(selector)
{
	this.hovering = false;
	var self = this;

	this.isHoveringOver = function(){
		return self.hovering;
	}

	jQuery(selector).hover(function(){
		self.hovering = true;
	}, function(){
		self.hovering = false;
	})
}

function crossselling_serialScroll()
{
	if (!!$.prototype.bxSlider)
		jQuery('#blockcart_caroucel').bxSlider({
			minSlides: 2,
			maxSlides: 4,
			slideWidth: 178,
			slideMargin: 20,
			moveSlides: 1,
			infiniteLoop: false,
	  		hideControlOnEnd: true,
			pager: false
		});
}