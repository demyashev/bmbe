$(document).ready(function() {
    
    $('#slider').lightSlider({
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
            $('#slider').removeClass('cS-hidden');
        },
        onAfterSlide: function() {
            lScurrentSlide = $('.lslide.active');
            lSnextSlideAlt = lScurrentSlide.next('li').children('img').attr('alt');
            lSprevSlideAlt = lScurrentSlide.prev('li').children('img').attr('alt');;

            $('.lSPrev-desc').html(lSprevSlideAlt);
            $('.lSNext-desc').html(lSnextSlideAlt);

            
        }
    });

    $('.nav a').click(function(event) {
        var delta = 90; // body top padding
        var id = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - delta
        }, 2000);

        $('.nav a').each(function(index, el) {
            $(el).removeClass('active');   
        });

        $(this).addClass('active');

        return false;
    });
});