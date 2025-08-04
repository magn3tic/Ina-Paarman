(function ($) {
  "use strict";
  jQuery(document).ready(function ($) {

    // Helper function to initialize Slick with requestAnimationFrame
    function safeSlickInit(selector, settings) {
      if ($(selector).length) {
        requestAnimationFrame(function () {
          $(selector).slick(settings);
        });
      }
    }

    // Isotope Filtering and Pagination
    var currentFilter = "*";
    var itemSelector = '.grid-item';
    var $container = $('#icontainer').isotope({
      itemSelector: itemSelector,
      layoutMode: 'fitRows'
    });

    function changeFilter(selector) {
      $container.isotope({ filter: selector });
    }

    function gopage(n) {
      var selector = itemSelector;
      if (currentFilter !== "*") {
        selector += '[data-filter="' + currentFilter + '"]';
      }
      selector += '[data-page="' + n + '"]';
      changeFilter(selector);
    }

    function paginclass() {
      var items = (currentFilter !== "*") ? $(".grid-item[data-filter='" + currentFilter + "']") : $(".grid-item");
      var postscount = items.length;
      var perpage = Math.ceil(postscount / 12);
      var item = 1, page = 1;
      items.each(function () {
        if (item > 12) {
          page++;
          item = 1;
        }
        $(this).attr("data-page", page);
        item++;
      });
      return perpage;
    }

    function paginclume(perpage) {
      $(".page_pagin").remove();
      var pagecon = $("<div class='page_pagin'></div>");
      for (let i = 1; i <= perpage; i++) {
        var page_number = $("<a data-page='" + i + "'>" + i + "</a>");
        pagecon.append(page_number);
      }
      $('#icontainer').after(pagecon);

      $(".page_pagin a").on("click", function () {
        var page_number = $(this).attr("data-page");
        gopage(page_number);
      });
    }

    let pages = paginclass();
    gopage(1);
    paginclume(pages);

    $('.filters a').click(function () {
      currentFilter = $(this).attr("data-filter");
      let pages = paginclass();
      gopage(1);
      paginclume(pages);
    });

    // Search toggle
    $(".header-search").click(() => $("body").addClass("search-active"));
    $(".search-close").click(() => $("body").removeClass("search-active"));

    // Initialize Sliders (deferred)
    safeSlickInit('.product-slider', {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true
    });

    safeSlickInit('.hero-text-slider', {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      asNavFor: '.hero-slider'
    });

    function sliderInit() {
      var $slider = $('.hero-slider');
      $slider.each(function () {
        var $sliderParent = $(this).parent();
        requestAnimationFrame(() => {
          $(this).slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: false,
            autoplay: true,
            autoplaySpeed: 5000,
            prevArrow: $('.hero-prev'),
            nextArrow: $('.hero-next'),
            asNavFor: '.hero-text-slider',
            focusOnSelect: true,
            responsive: [
              { breakpoint: 991, settings: { slidesToShow: 1 } },
              { breakpoint: 600, settings: { slidesToShow: 1 } }
            ]
          });

          if ($(this).find('.slide').length > 1) {
            $(this).siblings('.slides-numbers').show();
          }

          $(this).on('afterChange', function (event, slick, currentSlide) {
            $sliderParent.find('.slides-numbers .active').html((currentSlide + 1).toString().padStart(2, '0'));
          });

          var sliderItemsNum = $(this).find('.slick-slide').not('.slick-cloned').length;
          $sliderParent.find('.slides-numbers .total').html(sliderItemsNum.toString().padStart(2, '0'));
        });
      });
    }

    sliderInit();

    // More sliders (shortened responsive list)
    safeSlickInit('.recipe-details-slider', {
      dots: true,
      arrows: false,
      speed: 300,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false,
      responsive: [
        { breakpoint: 991, settings: { slidesToShow: 2 } },
        { breakpoint: 600, settings: { slidesToShow: 1, centerMode: true } }
      ]
    });

    safeSlickInit('.related-recipe-slider', {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: false,
      responsive: [
        { breakpoint: 991, settings: { slidesToShow: 3 } },
        { breakpoint: 600, settings: { slidesToShow: 1, dots: true, centerMode: true, infinite: true } }
      ]
    });

    safeSlickInit('.three-column-slider', {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false,
      responsive: [
        { breakpoint: 991, settings: { slidesToShow: 2 } },
        { breakpoint: 600, settings: { slidesToShow: 1, dots: true, centerMode: true } }
      ]
    });

    // Menu interactions
    $('#menu > li').hover(
      function () {
        if ($(this).find('.megamenu').length) $('.header-area').addClass('active');
      },
      function () {
        if ($(this).find('.megamenu').length) $('.header-area').removeClass('active');
      }
    );

    $(window).on('scroll', function () {
      $(this).scrollTop() > 150
        ? $('.header-area').addClass('scrolled')
        : $('.header-area').removeClass('scrolled');
    });

    $(".menu-item-has-children").prepend("<span></span>");
    $(document).on('click', '.menu-item-has-children > span', function () {
      $(this).parent().find(".megamenu").toggleClass("active");
      $(this).parent().toggleClass("active");
    });

    const $menu = $("#menu"),
          $menulink = $("#menu-toggle"),
          $header = $(".header-area"),
          $searchTrigger = $(".searchToggle"),
          $menuTriggercont = $("#menu_handler"),
          $menuTrigger = $(".has-submenu > span"),
          $megamenuTrigger = $(".megamenu > li > span");

    $menulink.click(function () {
      $menulink.toggleClass("active");
      $menu.toggleClass("active");
      $menuTriggercont.toggleClass("active");
      $header.toggleClass("active");
    });

    $menuTrigger.click(function (e) {
      e.preventDefault();
      var t = $(this).next();
      t.toggleClass("active").next("ul, .megamenu-holder").toggleClass("active");
    });

    $megamenuTrigger.click(function (e) {
      e.preventDefault();
      $(this).next(".mega-submenu").toggleClass("active");
    });

    $searchTrigger.click(function () {
      $menulink.removeClass("active");
      $menu.removeClass("active");
      $menuTriggercont.removeClass("active");
    });
  });
})(jQuery);