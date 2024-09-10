(function($) {
    "use strict";
  
    $('a.scrollspy-btn[href*="#"]:not([href="#"])').on('click', function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 100)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
  })(jQuery); // End of use strict