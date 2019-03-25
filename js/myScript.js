/*********************************************

Coder : Ryan Bautista

*********************************************/

$(function(){
// UI Accordion
    // Main Accordion
	$( "#accordion" ).accordion({
		collapsible: true,
		heightStyle: "content",
		icons: false,
		active: false
	});
	// Sub Accordion
	$( "#accordion1" ).accordion({
		collapsible: true,
		heightStyle: "content",
		icons: false,
		active: false
	});
});

// ScrollToTop
$(window).scroll(function(){
	if ($(this).scrollTop() > 1000){
		$('.scrollToTop').fadeIn();
	} else {
		$('.scrollToTop').fadeOut();
	}
});
$('.scrollToTop').click(function(){
	$('html, body').animate( {scrollTop : 0},800 );
	return false;
});

// Isotope Gallery
var $container = $('#gallery');
$container.imagesLoaded(function() {
	// Init Isotope
	$container.isotope({
		itemSelector : '.item',
	});
	// Filter Isotope
	var $optionSets = $('#filter'),
	$optionLinks = $optionSets.find('a');
	$optionLinks.click(function(){
		var $this = $(this);
		// don't proceed if already selected
		if ( $this.hasClass('selected') ){
			return false;
		}
		var $filter = $this.parents('#filter');
		$filter.find('.selected').removeClass('selected');
		$this.addClass('selected');
		// make option object dynamically, i.e. { filter: '.my-filter-class' }
		var options = {},
		key = $filter.attr('data-filter-key'),
		value = $this.attr('data-filter-value');
		// parse 'false' as false boolean
		value = value === 'false' ? false : value;
		options[ key ] = value;
		if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ){
			// changes in layout modes need extra logic
			changeLayoutMode( $this, options )
		} else {
			// otherwise, apply new options
			$container.isotope( options );
		}
		return false;
	});
});
