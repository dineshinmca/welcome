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

var instantSearchQueries = [];
if(typeof blocksearch_type != 'undefined'){
	var blocksearch_type = 'top';
}
jQuery(document).ready(function()
{
	if (typeof instantsearch != 'undefined' && instantsearch)		
		jQuery("#search_query_" + blocksearch_type).keyup(function(){
			if(jQuery(this).val().length > 4){
				stopInstantSearchQueries();
				instantSearchQuery = $.ajax({
					url: search_url + '?rand=' + new Date().getTime(),
					data: {
						instantSearch: 1,
						id_lang: id_lang,
						q: jQuery(this).val()
					},
					dataType: 'html',
					type: 'POST',
					headers: { "cache-control": "no-cache" },
					async: true,
					cache: false,
					success: function(data){
						if(jQuery("#search_query_" + blocksearch_type).val().length > 0)
						{
							tryToCloseInstantSearch();
							jQuery('#center_column').attr('id', 'old_center_column');
							jQuery('#old_center_column').after('<div id="center_column" class="' + jQuery('#old_center_column').attr('class') + '">'+data+'</div>');
							jQuery('#old_center_column').hide();
							// Button override
							ajaxCart.overrideButtonsInThePage();
							jQuery("#instant_search_results a.close").click(function() {
								jQuery("#search_query_" + blocksearch_type).val('');
								return tryToCloseInstantSearch();
							});
							return false;
						}
						else
							tryToCloseInstantSearch();
					}
				});
				instantSearchQueries.push(instantSearchQuery);
			}
			else
				tryToCloseInstantSearch();
		});

	/* TODO Ids aa blocksearch_type need to be removed*/
	var width_ac_results = 	jQuery("#search_query_" + blocksearch_type).parent('form').width();
	if (typeof ajaxsearch != 'undefined' && ajaxsearch && typeof blocksearch_type !== 'undefined' && blocksearch_type)
		jQuery("#search_query_" + blocksearch_type).autocomplete(
			search_url,
			{
				minChars: 3,
				max: 10,
				width: (width_ac_results > 0 ? width_ac_results : 500),
				selectFirst: false,
				scroll: false,
				dataType: "json",
				formatItem: function(data, i, max, value, term) {
					return value;
				},
				parse: function(data) {
					var mytab = new Array();
					for (var i = 0; i < data.length; i++)
						mytab[mytab.length] = { data: data[i], value: data[i].cname + ' > ' + data[i].pname };
					return mytab;
				},
				extraParams: {
					ajaxSearch: 1,
					id_lang: id_lang
				}
			}
		)
		.result(function(event, data, formatted) {
			jQuery('#search_query_' + blocksearch_type).val(data.pname);
			document.location.href = data.product_link;
		});
});

function tryToCloseInstantSearch()
{
	if (jQuery('#old_center_column').length > 0)
	{
		jQuery('#center_column').remove();
		jQuery('#old_center_column').attr('id', 'center_column');
		jQuery('#center_column').show();
		return false;
	}
}

function stopInstantSearchQueries()
{
	for(i=0;i<instantSearchQueries.length;i++)
		instantSearchQueries[i].abort();
	instantSearchQueries = new Array();
}