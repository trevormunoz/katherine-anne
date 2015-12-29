// If page is too short to scroll, show site-nav
jQuery(document).ready(function() {
  // cache selector
  var nav = jQuery('.site-nav');

  window.setTimeout(function() {
    if(jQuery(document).height() <= jQuery(window).height()) {
      nav.addClass('scrolled');
    } else {
      nav.removeClass('scrolled');
    }
  }, 200);
});

// Show sticky bottom menu for mobile on scroll
jQuery(function() {
  // cache selector
  var nav = jQuery('.site-nav');

  jQuery(window).scroll(function() {
    var scrollDepth = jQuery(window).scrollTop(),
        scrollRelativePosition = (scrollDepth + jQuery(window).height()),
        scrollEndZone = (jQuery(document).height() - 75);
    var hideInterval = 2100;


    // If a modal is open, the site-nav should stay visible even at top
    if(scrollDepth >= 75 && !jQuery('body').hasClass('modal-open')) {
      nav.addClass('scrolled');

        // If not at the bottom of the page and if no modal is open,
        //  allow nav to hide itself after about 2 seconds
        window.clearTimeout(jQuery.data(this, 'scrollTimer'));
        jQuery.data(this, 'scrollTimer', window.setTimeout(function() {
          if(!(scrollRelativePosition > scrollEndZone) && !jQuery('body').hasClass('modal-open')) {
            nav.removeClass('scrolled');
          }
        }, hideInterval));
    } else {
      nav.removeClass('scrolled');
    }
  });
});

// Necessary clean up for multiple Modals
jQuery('.site-tools-menu').on('shown.bs.modal', function() {
  jQuery('.site-tools-search').modal('hide');
});

jQuery('.site-tools-search').on('shown.bs.modal', function() {
  jQuery('.site-tools-menu').modal('hide');
});
