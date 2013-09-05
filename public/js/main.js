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
		jqueryTools: '../bower_components/jquery/jquery.tools.min',
		jqueryMigrate: '../bower_components/jquery/jquery-migrate-1.2.1.min',
		localStorage: '../bower_components/backbone.localStorage/backbone.localStorage',
		bootstrap: '../bower_components/bootstrap/bootstrap.min',
		tpl: 'lib/tpl'
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
		
		jqueryTools: {
            deps: ["jquery", "jqueryMigrate"]
        },
		
		jqueryMigrate: {
            deps: ["jquery"]
        }
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
	

	app.start();

	new Router({ controller: Controller });

	Backbone.history.start();
});

