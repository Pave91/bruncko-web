(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/data/srv/http/bruncko/www/app/app.js":[function(require,module,exports){
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

},{}]},{},["/data/srv/http/bruncko/www/app/app.js"]);
