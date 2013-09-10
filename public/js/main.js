require.config({
	
	//for reload of js in development:
	urlArgs: "bust=" + (new Date()).getTime(),
	//for reload of js in production:
	//urlArgs: "bust=v2",
	
	paths: {
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		marionette: '../bower_components/backbone.marionette/lib/backbone.marionette',
		jquery: '../bower_components/jquery/jquery',
		jqueryold: '../bower_components/jquery/jqueryold.min',
		localStorage: '../bower_components/backbone.localStorage/backbone.localStorage',
		bootstrap: '../bower_components/bootstrap/bootstrap.min',
		tpl: 'lib/tpl',
		camera: '../bower_components/slideshow/camera.min',
		jqueryeasing: '../bower_components/slideshow/jquery.easing.1.3',
		jquerymobile: '../bower_components/slideshow/jquery.mobile.customized.min'
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
        
        jqueryeasing: ["jquerymobile"],

		jquerymobile: ["jqueryold"],

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

	app.start();

	new Router({ controller: Controller });

	Backbone.history.start();
});

