/*global define */

define([
	'marionette',
	'views/Menu',
	'collections/MenuList',
	'views/Login',
	'views/Todo',
	'views/Flash',
	'views/TableExample',
	'views/Camera',
	'routers/index',
	'controllers/index',
	'models/User'
], function (Marionette, Menu, MenuList, Login, Todo, Flash, TableExample, Camera, Router, Controller, User) {
	'use strict';

	var app = new Marionette.Application();

	app.addRegions({
		login: '#login',
		menu: '#placeholderMenu',
		flash: '#flash',
		todo: '#placeholder1',
		tableExample: '#placeholder4',
		camera: '#placeholder5',
		userRegister: '#placeholder6',
		placeholderPopup: '#placeholderPopup'
	});

	app.addInitializer(function () {
		var menuList = new MenuList();
		menuList.fetch();
		app.menu.show(new Menu({collection : menuList}));
		app.login.show(new Login());
		app.todo.show(new Todo());
		app.flash.show(new Flash());
		app.tableExample.show(new TableExample());
		app.camera.show(new Camera());
	});

	app.user=new User();
	
	
	app.router=new Router({ controller: Controller });
	Backbone.history.start();
	
	return window.app = app;
});
