"use strict";
var lastScroll = 0;

$(document).ready(function() {
  var testimonials = new Swiper(".testimonials-slider", {
    spaceBetween: 30,
    pagination: {
      el: ".testimonials-pagination",
      clickable: true
    },
    autoplay: {
      delay: 3000
    }
  });
  var brandSlider = new Swiper(".brand-slider", {
    spaceBetween: 30,
    slidesPerView: 5,
    loop: true,
    pagination: {
      el: ".brand-pagination",
      clickable: true,
      dynamicBullets: true
    },
    autoplay: {
      delay: 3000
    }
  });
  $(window).resize(function() {
    setTimeout(function() {
      testimonials.update();
    }, 500);
  });

  // start counter on appear
  $(".count").appear();
  $(document.body).on("appear", ".count", function() {
    $(".count").countTo({
      speed: 3000,
      onComplete: function() {
        var countUnit = $(this).attr("data-unit");
        $(this).append(countUnit);
      }
    });
  });

  // wow animation
  var wow = new WOW({
    boxClass: "wow", // default
    animateClass: "animate",
    offset: 0, // default
    mobile: true, // default
    live: true // default
  });
  wow.init();
});

// scroll function
$(window).on("scroll", init_scroll_navigate);
function init_scroll_navigate() {
  /*==============================================================
   One Page Main JS - START CODE
   =============================================================*/
  var menu_links = $(".navbar-nav li a");
  var scrollPos = $(document).scrollTop();

  /* ===================================
   sticky nav Start
   ====================================== */
  var headerHeight = $("nav").outerHeight();
  if (!$("header").hasClass("no-sticky")) {
    if ($(document).scrollTop() >= headerHeight) {
      $("header").addClass("sticky");
    } else if ($(document).scrollTop() <= headerHeight) {
      $("header").removeClass("sticky");
    }
  }

  /* ===================================
   header appear on scroll up
   ====================================== */
  var st = $(this).scrollTop();
  if (st > lastScroll) {
    $(".sticky").removeClass("header-appear");
  } else $(".sticky").addClass("header-appear");
  lastScroll = st;
  if (lastScroll <= headerHeight) $("header").removeClass("header-appear");
}
