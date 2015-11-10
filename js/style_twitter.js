
/*
 * Twitter Widget with Styling
 * Version: 2.0.0
 *
 * Github URL: https://github.com/MPolleke/styleTwitterWidget
 *
 * Author: Marcel Pol
 * Author URL: https://zenoweb.nl
 * Author Email: marcel@timelord.nl
 * Copyright: 2013 - 2015, Marcel Pol
 * License: MIT
 *
 * "To iterate is human, to recurse divine."
 * (L Peter Deutsch)
 *
 */


/* Standard code taken from Twitter website. */
!function(d,s,id) {
	var js,fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http':'https';
	if ( !d.getElementById(id) ) {
		js = d.createElement(s);
		js.id = id;
		js.src = p+"://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore( js, fjs );
	}
} ( document, "script", "twitter-wjs" );


/*
 * Recursive function to add a stylesheet to the iframe.
 *
 * Parameters:
 * - widget: the number of the available widget, starts at 0, autoincrement.
 * - counter: the number of times this function was called for this widget. Starts at 0. Will return after maximum 15 times.
 *
 */
function styleTwitterWidget_v2( widget, counter ) {

	counter++;

	// Location of the style_twitter.css, public url. Change this according to your needs.
	// var cssUrl = 'http://example.com/style_twitter_css';
	var cssUrl = tl_twitter_localize.style_twitter_css; // WordPress variable, gets localized.

	var cssLink = jQuery("<link/>", {
		href: cssUrl,
		rel: "stylesheet",
		type: "text/css",
		name: "twitterCSS"
	});

	if ( jQuery( '#twitter-widget-' + widget ).length > 0 ) {
		var ifrm_elem = jQuery( '#twitter-widget-' + widget );
		var ifrm_content = document.getElementById( 'twitter-widget-' + widget ).contentWindow;

		if ( typeof ifrm_content == 'object' ) {
			// console.log( widget + ' We have content...' );
			if ( typeof ifrm_content.document == 'object' ) {
				var ifrm_doc = ifrm_content.document;

				var jquery_head = jQuery( '#twitter-widget-' + widget ).contents().find( 'head' );
				var stylesheet = ifrm_doc.styleSheets;
				// console.log( widget + ' typeof: ' + typeof stylesheet );

				if ( typeof stylesheet == 'object' ) {
					for ( var i = 0, max = stylesheet.length; i < max; i++ ) {
						if ( stylesheet[i].href == cssUrl ) {
							// console.log( widget + ' We have the stylesheet: ' + stylesheet[i].href );

							// It was already added, do nothing from now on...
							counter = 16;
							// console.log( widget + ' Returning on a counter of: ' + counter );
							return;
						}
					}
				}

				// Add the stylesheet to this iframe
				jquery_head.append( cssLink );
			}
		}

		// Ensures it's checked at least 15 times
		if ( counter < 15 ) {
			// console.log( widget + ' Iframe has not the right content yet: ' + counter );
			setTimeout(
				function() {
					styleTwitterWidget_v2( widget, counter )
				}, 200 );
		}
	} else {
		if ( counter < 15 ) {
			// console.log( widget + ' No Iframe yet: ' + counter );
			setTimeout(
				function() {
					styleTwitterWidget_v2( widget, counter )
				}, 200 );
		}
	}
}


/*
 * Initial call for each Widget.
 * In the HTML there will be a a.twitter-timeline, that gets replaced by an iframe.twitter-timeline.
 */
jQuery(document).ready(function() {

	var widget = 0;

	// Needs to use '.twitter-timeline', not '.twitter-timeline-rendered' to handle slow rendering browsers (hits the "second recurse").
	jQuery( '.twitter-timeline' ).each( function( element ) {

		//console.log( 'Widget ' + widget + ': Init' );

		styleTwitterWidget_v2( widget, 0 );
		widget++;

	});
});
