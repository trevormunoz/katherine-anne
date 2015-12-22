// Show sticky bottom menu for mobile on scroll
jQuery(function() {
  var nav = jQuery('.site-nav');
  jQuery(window).scroll(function() {
    var scroll = jQuery(window).scrollTop();

    if (scroll >= 75) {
      nav.removeClass('scrolled-no').addClass('scrolled-yes');
    } else {
      nav.removeClass('scrolled-yes').addClass('scrolled-no');
    }
  });
});

// Necessary clean up for multiple Modals
jQuery('.site-tools-menu').on('show.bs.modal', function() {
  jQuery('.site-tools-search').modal('hide');
});

jQuery('.site-tools-search').on('show.bs.modal', function() {
  jQuery('.site-tools-menu').modal('hide');
});
