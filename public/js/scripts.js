$(document).ready(function() {
    
    bodyPadding = 90;

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
        gallery: false,
        onSliderLoad: function() {
            var slides = $('.lslide');
            var next = $(slides[1]).children('img').attr('alt');
            var prev = $(slides[$(slides).length - 1]).children('img').attr('alt');

            $('.lSAction').wrap('<div class="container"></div>');
            $('.lSAction').append('<span class="lSPrev-desc">' + prev + '</span>');
            $('.lSAction').append('<span class="lSNext-desc">' + next + '</span>');
            $('.lSAction').addClass('hidden-xs hidden-sm');
                
            // 1920 image width
            $('#slider').css({
                'height': $(window).height() + 'px',
                'padding-bottom': 0
            });

            // $('#slider img').each(function(i, item) {
            //     var img_width = $(item).width();
            //     var left_margin = -(img_width / 2);
            //     $(item).css({
            //         'left': '50%',
            //         'margin-left': left_margin
            //     });
            // });

            /*
            if ($(window).width() > 1920 ) {
                padding = '-' + ($(window).width() - 1920) / 2;
            }
            else {
                padding = '-' + (1920 - $(window).width()) / 2;
            }

            $('.lslide img').each(function(index, el) {
               $(el).css('left', padding + 'px' );
            });
            */


            $('#slider').removeClass('cS-hidden');
        },
        onAfterSlide: function() {
            
            lScurrentSlide = $('.lslide.active');
            lSnextSlideAlt = lScurrentSlide.next('li').children('img').attr('alt');
            lSprevSlideAlt = lScurrentSlide.prev('li').children('img').attr('alt');

            $('.lSPrev-desc').html(lSprevSlideAlt);
            $('.lSNext-desc').html(lSnextSlideAlt);
            

            var text = $('.lslide.active').data('title');
            $('#slide-text').html(text);
        }
    });

    
    $('.nav a').click(function(event) {
        var _this = $(this);
        var id = _this.attr('href');

        if (id != '#') {

            $('html, body').animate({
                scrollTop: $(id).offset().top - bodyPadding
            }, 2000, function(){
                $('.nav a').parent('li').each(function(index, el) {
                    $(el).removeClass('active');   
                }); 

                _this.parent('li').addClass('active');
            });

            $('#navbar').removeClass('in');
   
            return true;
        }
    });

    /**
     * Waypoints
     */
    /*
    $('[data-animate="true"]').hide();
    waypoint = $('.section').waypoint({
        handler: function(direction) {
            if (direction == 'down') {
                console.log('You have scrolled to a thing')
                $('#' + this.element.id + ' [data-animate="true"]').fadeIn('1000');
            }
            console.log('Direction: ' + direction);
            console.log(this.element.id);
        },
        offset: '-80%'
    });
    */

    
    $("#signinForm").validate({
        submitHandler: function(form){ 
            
            data = $(form).serialize();

            console.log(data);

            // $(form).submit();
        },
        errorClass: "error help-block",
        validClass: "success",
        errorElement: "p",
        errorPlacement: function(error, element) {
            element.parent(".form-group").addClass('has-error').children('label').after(error);
        },
        rules: {
            username: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true,
                minlength: 6
            }
        },
        messages: {
            username: {
                required: "Поле обязательно для заполнения",
                minlength: jQuery.validator.format("Длина значения должна быть не менее {0} символов")
            },
            email: {
                required: "Поле обязательно для заполнения",
                email: "Неверный формат email адреса",
                minlength: jQuery.validator.format("Длина значения должна быть не менее {0} символов")
            }
        
        }
    });

    $("#signinPhone").intlTelInput({
        preferredCountries: ['ru', 'ua'],
        initialCountry: "auto",
        nationalMode: false,
        formatOnDisplay: true,
        initialCountry: 'ru',
        geoIpLookup: function(callback) {
            $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
            });
        },
        utilsScript: "public/js/intltelinput/utils.js" // just for formatting/placeholders etc
    });

    $("#signinPhone").on("keyup change", function() {
        var intlNumber = $("#signinPhone").intlTelInput("getNumber");
        if (intlNumber) {
            console.log("International: " + intlNumber);
        } else {
            console.log("Please enter a number below");
        }
    });


    var reset = function() {
        $("#signinPhone").removeClass("error");
        $('#signinForm .form-phone').removeClass("has-error");
    };

    // on blur: validate
    $("#signinPhone").blur(function() {
        reset();
        if ($.trim($("#signinPhone").val())) {
            if ($("#signinPhone").intlTelInput("isValidNumber")) {
                // $('#signinForm .form-phone').find('p').remove();
            } else {
                console.log('qweqe');   
                $('#signinForm .form-phone').addClass("has-error");
                $('#signinForm .form-phone').children('p').html('Неверный формат').show();
            }
        }
    });

    // on keyup / change flag: reset
    $("#signinPhone").on("keyup change", reset);


    

});