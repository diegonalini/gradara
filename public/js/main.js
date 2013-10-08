require.config({
	
	//for reload of js in development:
	urlArgs: "bust=" + (new Date()).getTime(),
	//for reload of js in production:
	//urlArgs: "bust=v2",
	
	paths: {
		underscore: '../bower_components/underscore/underscore-min',
		backbone: '../bower_components/backbone/backbone-min',
		marionette: '../bower_components/backbone.marionette/lib/backbone.marionette.min',
		jquery: '../bower_components/jquery/jquery-1.10.2.min',
		localStorage: '../bower_components/backbone.localStorage/backbone.localStorage',
		bootstrap: '../bower_components/bootstrap/bootstrap.min',
		tpl: 'lib/tpl',
		camera: '../bower_components/slideshow/camera.min',
		etch: '../bower_components/etch/etch',
		jqueryeasing: '../bower_components/slideshow/jquery.easing.1.3',
		jquerymobile: '../bower_components/jquery/jquery.mobile-1.3.2.min'
	},

	shim: {
		underscore: {
			exports: '_'
		},

		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},

		marionette: {
			exports: 'Backbone.Marionette',
			deps: ['backbone']
		},
		
		bootstrap: {
            deps: ["jquery"]
        },
        
        etch: {
            deps: ["backbone"]
        },
        
		jquerymobile: ["jquery"],
		jqueryeasing: ["jquerymobile"],
		camera: ["jqueryeasing"]
	},

	deps: ['jquery', 'underscore']
});

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

//loadCss('../bower_components/bootstrap/bootstrap-combined.min.css');
	
	
require([
	'app',
	'backbone',
	'routers/index',
	'controllers/index', 
	'bootstrap'
], function (app, Backbone, Router, Controller, _bootstrap) {
	'use strict';
	
$.ajaxSetup (
   {headers: {'ACCESS_TOKEN':"0"}}
);

    if (!jQuery.support.leadingWhitespace) alert("ERROR!!!  IE version < 9 \nPlease update your IE browser \nor use recent Firefox or Chrome");
	else app.start();

	
});

