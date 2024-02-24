
$('table').addClass('table-striped');
$('table').addClass('table-bordered');
$('table').addClass('table');



// alert("hi");
    $("#accordian a").click(function() {
        var link = $(this);
        var closest_ul = link.closest("ul");
        var parallel_active_links = closest_ul.find(".active")
        var closest_li = link.closest("li");
        var link_status = closest_li.hasClass("active");
        var count = 0;

        closest_ul.find("ul").slideUp(function() {
            if (++count == closest_ul.find("ul").length)
                parallel_active_links.removeClass("active");
        });

        if (!link_status) {
            closest_li.children("ul").slideDown();
            closest_li.addClass("active");
        }
    })
 $( document ).ready( function () {

       $(".sub-menu").each(function(){
    if($(this).children("li").length >= 10)
      $(this).addClass("large_sub_menu");
  }); 
  }); 



function withJquery(){
  console.time('time1');
  var temp = $("<input>");
  $("body").append(temp);
 temp.val($('#copyText1').text()).select();
  document.execCommand("copy");
  temp.remove();
    console.timeEnd('time1');
}





$("marquee").hover(function () { 
    this.stop();
}, function () {
    this.start();
});






function goBack() {
  window.history.back();
}

function goForward() {
  window.history.forward();
}






(function($) {
    var size;
  
    //SMALLER HEADER WHEN SCROLL PAGE
    function smallerMenu() {
        var sc = $(window).scrollTop();
        if (sc > 40) {
            $('#header-sroll').addClass('small');
        }else {
            $('#header-sroll').removeClass('small');
        }
    }

    // VERIFY WINDOW SIZE
    function windowSize() {
        size = $(document).width();
        if (size >= 991) {
            $('body').removeClass('open-menu');
            $('.hamburger-menu .bar').removeClass('animate');
        }
    };

     // ESC BUTTON ACTION
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('.bar').removeClass('animate');
            $('body').removeClass('open-menu');
            $('header .desk-menu .menu-container .menu .menu-item-has-children a ul').each(function( index ) {
                $(this).removeClass('open-sub');
            });
        }
    });

    $('#cd-primary-nav > li').hover(function() {
        $whidt_item = $(this).width();
        $whidt_item = $whidt_item-8;

        $prevEl = $(this).prev('li');
        $preWidth = $(this).prev('li').width();
        var pos = $(this).position();
        pos = pos.left+4;
        $('header .desk-menu .menu-container .menu>li.line').css({
            width:  $whidt_item,
            left: pos,
            opacity: 1
        });
    });

     // ANIMATE HAMBURGER MENU
    $('.hamburger-menu').on('click', function() {
        $('.hamburger-menu .bar').toggleClass('animate');
        if($('body').hasClass('open-menu')){
            $('body').removeClass('open-menu');
        }else{
            $('body').toggleClass('open-menu');
        }
    });

    $('header .desk-menu .menu-container .menu .menu-item-has-children ul').each(function(index) {
        $(this).prepend('<li class="back"><a href="#">BACK</a></li>');
    });

    // RESPONSIVE MENU NAVIGATION
    $('header .desk-menu .menu-container .menu .menu-item-has-children > a').on('click', function(e) {
        e.preventDefault();
        if(size <= 991){
            $(this).next('ul').addClass('open-sub');
        }
    });

    // CLICK FUNCTION BACK MENU RESPONSIVE
    $('header .desk-menu .menu-container .menu .menu-item-has-children ul .back').on('click', function(e) {
        e.preventDefault();
        $(this).parent('ul').removeClass('open-sub');
    });

    $('body .over-menu').on('click', function() {
        $('body').removeClass('open-menu');
        $('.bar').removeClass('animate');
    });

    $(document).ready(function(){
        windowSize();
    });

    $(window).scroll(function(){
        smallerMenu();
    });

    $(window).resize(function(){
        windowSize();
    });

})(jQuery);



$(document).ready(function() {
var button = document.getElementById('hamburger-menu'),
    span = button.getElementsByTagName('span')[0];

button.onclick =  function() {
  span.classList.toggle('hamburger-menu-button-close');
};

$('#hamburger-menu').on('click', toggleOnClass);

function toggleOnClass(event) {
  var toggleElementId = '#' + $(this).data('toggle'),
  element = $(toggleElementId);

  element.toggleClass('on');

}

// close hamburger menu after click a
$( '.menu li a' ).on("click", function(){
  $('#hamburger-menu').click();
});



  AOS.init({

  duration: 2000,
  // data-aos-once: true

});

  
  
})



$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
      autoplay:true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            loop:true,
            nav:true
        },
        600:{
            items:3,
            loop:true,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:true
        }
    }
})




function getLocation() {
  if (navigator.geolocation) {
    var position = navigator.geolocation.getCurrentPosition(showPosition);
	alert(position.lattitude);
  }
}

function showPosition(position) {
  return position.coords
}






$(document).ready(function(){
	

	

	
	
	
	
      $('.owl-one').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
  autoplay:true,
    responsive:{
        0:{
          items:1
        },
        320:{
          items:1
        },
        480:{
          items:1
        },
        549:{
          items:2
        }, 
        550:{
          items:3
        },
        600:{
          items:3
        },
        767:{
          items:3
        },
        768:{
          items:3
        },
        900:{
          items:3
        },
        991:{
          items:3
        },
        1000:{
          items:3
        },
        1199:{
          items:3
        },
    }
    })

});





$(document).ready(function(){
      $('.owl-two').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
  autoplay:true,
    responsive:{
        0:{
          items:1
        },
        320:{
          items:1
        },
        480:{
          items:1
        },
        549:{
          items:2
        }, 
        550:{
          items:3
        },
        600:{
          items:3
        },
        767:{
          items:3
        },
        768:{
          items:3
        },
        900:{
          items:3
        },
        991:{
          items:3
        },
        1000:{
          items:3
        },
        1199:{
          items:3
        },
    }
    })

});




$(document).ready(function(){
      $('.owl-home').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
  autoplay:true,
    responsive:{
        0:{
          items:2
        },
        320:{
          items:2
        },
        480:{
          items:2
        },
        549:{
          items:2
        }, 
        550:{
          items:3
        },
        600:{
          items:3
        },
        767:{
          items:5
        },
        768:{
          items:5
        },
        900:{
          items:5
        },
        991:{
          items:5
        },
        1000:{
          items:5
        },
        1199:{
          items:5
        },
    }
    })
	
	
$(function(){
    $('.nav li ').hover(function() {
        $(this).addClass('open');
    },
    function() {
        $(this).removeClass('open');
    });
});

//Audio and Video forcing single play at a Time #START
$('video').on('play', function(){
	$('video').not(this).each(function(){
		//$(this).trigger('pause');
		this.pause();
	});	
});
$('audio').on('play', function(){
	$('audio').not(this).each(function(){
		//$(this).trigger('pause');
		this.pause();
	});	
});
//Audio and Video forcing single play at a Time #END

$("a[href^=http]").click(function(){
      // NEW - excluded domains list
      var excludes = [
         "gov.in",
		 "nic.in",
		 "kannadasahithyaparishattu.in"
      ];
      for(i=0; i<excludes.length; i++) {
         if(this.href.indexOf(excludes[i]) != -1) {
            return true; // continue each() with next link
         }
      }
      if(this.href.indexOf(location.hostname) == -1) {
			var is_confirm = confirm("You are above to proceed to an external website. The "+base_url+" doesn't have control over the content of this site. Click OK to proceed.");
			if(!is_confirm)
				return false;
			else
				return true;
      }
});

$("a[href^=http]").each(function(){
      // NEW - excluded domains list
      var excludes = [
         
      ];
      for(i=0; i<excludes.length; i++) {
         if(this.href.indexOf(excludes[i]) != -1) {
            return true; // continue each() with next link
         }
      }
      if(this.href.indexOf(location.hostname) == -1 || this.href.indexOf(".pdf") != -1) {
           $(this).attr({
               target: "_blank",
               title: "Opens in a new window"
           });
      }
});

});