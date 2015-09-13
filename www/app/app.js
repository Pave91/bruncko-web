var app = {};

app.init = function() {
    var body = $('body');

    // header

    $(document).on('scroll', function() {
        if ($(window).scrollTop() > 60) {
            body.addClass('scrolled');
        } else {
            body.removeClass('scrolled');
        }
    });

    // navigation

    var trigger = $('#menu-trigger');
    var isOpen = false;
    trigger.on('click', function() {
        if (isOpen) {
            isOpen = false;
            body.removeClass('nav-open');
        } else {
            isOpen = true;
            body.addClass('nav-open');
        }

    });
};

window.app = app;
