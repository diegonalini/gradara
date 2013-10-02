/*global define */

define([
	'marionette',
	'views/Menu',
	'collections/MenuList',
	'views/Login',
	'views/Flash',
	'routers/index',
	'controllers/index',
	'models/User'
], function (Marionette, Menu, MenuList, Login, Flash, Router, Controller, User) {
	'use strict';

	var app = new Marionette.Application();

	app.addRegions({
		login: '#login',
		menu: '#placeholderMenu',
		flash: '#flash',
		p1: '#placeholder1',
		p2: '#placeholder2',
		p3: '#placeholder3',
		p4: '#placeholder4',
		p5: '#placeholder5',
		p6: '#placeholder6',
		placeholderPopup: '#placeholderPopup'
	});

	app.addInitializer(function () {
		var menuList = new MenuList();
		menuList.fetch();
		app.menu.show(new Menu({collection : menuList}));
		app.login.show(new Login());
		app.flash.show(new Flash());
	});

	app.user=new User();
	
	app.bonelet=[];
	
	app.router=new Router({ controller: Controller });
	Backbone.history.start();
	
	return window.app = app;
});
