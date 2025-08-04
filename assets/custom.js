(function ($) {
    "use strict";
    jQuery(document).ready(function ($) {
     
    $(document).ready( function() {
    	var currentFilter="*";
    	var datafilder;
    	var postscount;
    	var perpage;
    	var page_post=12;
    
    	//isotope create
    	var itemSelector = '.grid-item'; 
    	var $container = $('#icontainer').isotope({
    		itemSelector: itemSelector,
            layoutMode: 'fitRows'
    	});
    	var selector = itemSelector;
    	function changeFilter(selector){
    		$container.isotope({
    			filter: selector
    		});
    	}
    	function gopage(n){
    		var selector = itemSelector;
    		if(currentFilter!="*"){
    			selector =selector+'[data-filter="'+currentFilter+'"]';
    		}
    		selector=selector+'[data-page="'+n+'"]';
    		changeFilter(selector);
    	}
    	
    	function paginclass(){
    		if(currentFilter!="*"){
    			postscount=$(".grid-item[data-filter="+currentFilter+"]").length;
    		} else {
    			postscount=$(".grid-item").length;
    		}
    		
    		perpage=Math.ceil(postscount/page_post);
    		var selector = itemSelector;
    		if(currentFilter!="*"){
    			selector =selector+'[data-filter="'+currentFilter+'"]';
    		}
    		
    		var item=1;
    		var page=1;
    		$container.children(selector).each(function(){
    			if( item > page_post ) {
    				page=page+1;
    				item = 1;
    			}
    			$(this).attr("data-page", page);
    			item=item+1;
    		});
    	}
    
    	function paginclume(){
    		$(".page_pagin").remove();
    
    		var pagecon=$("<div class='page_pagin'></div>");
    		
    		var page_number;
    		var i=1;
    		while(i<=perpage){
    			page_number=$("<a data-page="+i+"></a>");
    			page_number.html(i);
    			i=i+1;
    			pagecon.append(page_number);
    		}
    		$('#icontainer').after(pagecon);
    	}
    	paginclass();
    	gopage(1);
    	paginclume();
    	$(".page_pagin a").click(function(){
    		var page_number=$(this).attr("data-page");
    		gopage(page_number);
    		console.log("page_number",page_number);
    	});
    	
    	$('.filters a').click(function(){
    		currentFilter=$(this).attr("data-filter");
    		paginclass();
    		gopage(1);
    		paginclume();
          
    	$(".page_pagin a").click(function(){
    		var page_number=$(this).attr("data-page");
    		gopage(page_number);
    		console.log("page_number",page_number);
    	});
        });
        });
      
        $(".header-search").click(function(){
          $("body").addClass("search-active");
        });
      
        $(".search-close").click(function(){
          $("body").removeClass("search-active");
        });


         $('.product-slider').slick({
           slidesToShow: 1,
           slidesToScroll: 1,
           arrows: false,
           dots: true,
         });
      
         $('.hero-text-slider').slick({
           slidesToShow: 1,
           slidesToScroll: 1,
           arrows: false,
           fade: true,
           asNavFor: '.hero-slider'
         });

        var helpers = {
            addZeros: function (n) {
                return (n < 10) ? '0' + n : '' + n;
            }
        };

        function sliderInit() {
            var $slider = $('.hero-slider');
            $slider.each(function () {
                var $sliderParent = $(this).parent();
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
                        {
                            breakpoint: 1050,
                            settings: {
                                slidesToShow: 1,
                            }
                },
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 1,
                                arrows: true,
                                centerMode: false,
                            }
                },
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToShow: 1,
                                arrows: true,
                                centerMode: false,
                            }
                },
                        {
                            breakpoint: 750,
                            settings: {
                                slidesToShow: 1,
                                arrows: true,
                                centerMode: false,
                            }
                },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 1,
                                arrows: true,
                                centerMode: false,
                            }
                },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                arrows: true,
                                centerMode: false,
                            }
                }

              ]
                });

                if ($(this).find('.slide').length > 1) {
                    $(this).siblings('.slides-numbers').show();
                }

                $(this).on('afterChange', function (event, slick, currentSlide) {
                    $sliderParent.find('.slides-numbers .active').html(helpers.addZeros(currentSlide + 1));
                });

                var sliderItemsNum = $(this).find('.slick-slide').not('.slick-cloned').length;
                $sliderParent.find('.slides-numbers .total').html(helpers.addZeros(sliderItemsNum));

            });

        };

        sliderInit();

        $('.recipe-details-slider').slick({
            dots: true,
            arrows: false,
            speed: 300,
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        dots: false,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        dots: false,
                    }
                },
                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 3,
                        dots: false,
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                        centerMode: false,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        centerMode: true,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        centerMode: true,
                    }
                }

              ]

        });

        $('.related-recipe-slider').slick({
            dots: false,
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        dots: false,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        dots: false,
                    }
                },
                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 3,
                        dots: false,
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                        centerMode: false,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        centerMode: true,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        centerMode: true,
                        infinite: true,
                    }
                }

              ]

        });

        $('.three-column-slider').slick({
            dots: false,
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        dots: false,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        dots: false,
                    }
                },
                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 3,
                        dots: false,
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                        centerMode: false,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        centerMode: true,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        centerMode: true,
                        infinite: true,
                    }
                }

              ]

        });

        $('#menu > li').hover(
            function () {
                if ($(this).find('.megamenu').length) { // Check if the 'li' has a 'ul'
                    $('.header-area').addClass('active');
                }
            },
            function () {
                if ($(this).find('.megamenu').length) { // Check again when hover ends
                    $('.header-area').removeClass('active');
                }
            }
        );

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 150) { // Adjust '100' to the scroll position you want
                $('.header-area').addClass('scrolled');
            } else {
                $('.header-area').removeClass('scrolled');
            }
        });

        $(document).ready(function () {
            $(".menu-item-has-children").prepend("<span></span>");
        });
        $(document).on('click', '.menu-item-has-children > span', function (event) {
            $(this).parent().find(".megamenu").toggleClass("active");
            $(this).parent().toggleClass("active");
        });

        $(".mainmenu ul li:has(ul)").addClass("has-submenu");
        $(".mainmenu ul li:has(ul)").addClass("small-submenu");
        $(".mainmenu ul li ul").addClass("sub-menu");
        $(".mainmenu ul.dropdown li").hover(function () {
            $(this).addClass("hover");
        }, function () {
            $(this).removeClass("hover");
        });
        var $menu = $("#menu"),
            $menulink = $("#menu-toggle"),
            $header = $(".header-area"),
            $searchTrigger = $(".searchToggle"),
            $menuTriggercont = $("#menu_handler"),
            $menuTrigger = $(".has-submenu > span"),
            $megamenuTrigger = $(".megamenu > li > span");
        $menulink.click(function (e) {
            $menulink.toggleClass("active");
            $menu.toggleClass("active");
            $menuTriggercont.toggleClass("active");
            $header.toggleClass("active");
        });

        $menuTrigger.click(function (e) {
            e.preventDefault();
            var t = $(this).next();
            t.toggleClass("active");
            t.toggleClass("active").next("ul").toggleClass("active");
            t.toggleClass("active").next(".megamenu-holder").toggleClass("active");
        });

        $megamenuTrigger.click(function (e) {
            e.preventDefault();
            var t = $(this).next();
            t.toggleClass("active").next(".mega-submenu").toggleClass("active");
        });

        $searchTrigger.click(function (e) {
            $menulink.removeClass("active");
            $menu.removeClass("active");

            $menuTriggercont.removeClass("active");
        });

        $(".mainmenu ul li:has(ul)");
    });

}(jQuery));


