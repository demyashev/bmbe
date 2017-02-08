$(document).ready(function() {
    
    $('#image-gallery').lightSlider({
        auto:true,
        adaptiveHeight: false,
        item: 1,
        slideMargin: 0,
        loop: true,
        mode: 'fade',
        speed: 1000,
        pause: 3000,
        useCSS: false,
      
     
        onSliderLoad: function() {
            var slides = $('.lslide');
            var next = $(slides[1]).children('img').attr('alt');
            var prev = $(slides[$(slides).length - 1]).children('img').attr('alt');
            console.log(prev);

            $('.lSAction').wrap('<div class="container"></div>');
            $('.lSAction').append('<span class="lSPrev-desc">' + prev + '</span>');
            $('.lSAction').append('<span class="lSNext-desc">' + next + '</span>');
            $('#image-gallery').removeClass('cS-hidden');
        },
        onAfterSlide: function() {
            lScurrentSlide = $('.lslide.active');
            lSnextSlideAlt = lScurrentSlide.next('li').children('img').attr('alt');
            lSprevSlideAlt = lScurrentSlide.prev('li').children('img').attr('alt');;

            $('.lSPrev-desc').html(lSprevSlideAlt);
            $('.lSNext-desc').html(lSnextSlideAlt);

            
        }
    });
});