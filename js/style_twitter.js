
/*
 * Twitter Widget with Styling
 * https://zenoweb.nl
 * Copyright 2013 - 2015 Marcel Pol, ZenoWeb
 * Licensed MIT
 */


/* Standard code taken from Twitter website. */
!function(d,s,id) {
	var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
	if(!d.getElementById(id)) {
		js=d.createElement(s);
		js.id=id;
		js.src=p+"://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);
	}
} (document,"script","twitter-wjs");



var tl_twitter_checkTwitter = 0;

function styleTwitterWidget() {
	var ifrm_elem = 0;
	var ifrm_content = 0;
	var ifrm = 0;
	var cssUrl = tl_twitter_localize.twitter_style_css;

	var cssLink = jQuery("<link/>", {
		href: cssUrl,
		rel: "stylesheet",
		type: "text/css",
		name: "twitterCSS"
	});

	tl_twitter_checkTwitter++;

	if (jQuery('.twitter-timeline').length > 0) {
		if ( !document.getElementById('twitter-widget-0') ) {
			// add an id if it doesn't exists already
			jQuery('.twitter-timeline').prop('id', 'twitter-widget-0');
		}
		// add a name to the iframe
		jQuery('#twitter-widget-0').attr('name', 'twitter-widget-0');

		//if (typeof head == "object") {
			ifrm_elem = document.getElementById('twitter-widget-0');
			if (typeof ifrm_elem.contentWindow == 'object') {
				ifrm_content = ifrm_elem.contentWindow;
				if (typeof ifrm_content.document == 'object') {
					ifrm = ifrm_content.document;

					var head = ifrm.head;
					var jquery_head = jQuery("#twitter-widget-0").contents().find("head");
					var ss = ifrm.styleSheets;
					if (typeof ss == "object") {
						for (var i = 0, max = ss.length; i < max; i++) {
							if (ss[i].href == cssUrl) {
								// it was already added, do nothing from now on...
								tl_twitter_checkTwitter = 11;
								return;
							}
						}
					}
					// add the stylesheet
					jquery_head.append(cssLink);
				}
			}
		//}

		// Ensures it's checked at least 10 times
		if (tl_twitter_checkTwitter < 10) {
			setTimeout('styleTwitterWidget()', 200);
		}
	} else {
		setTimeout('styleTwitterWidget()', 200);
	}
}

jQuery(document).ready(function() {
	styleTwitterWidget();
});
