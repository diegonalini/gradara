/*global define */

define([
	'marionette',
	'views/Login',
	'views/Todo',
	'views/Flash',
	'views/TableExample',
	'views/Camera',
	'views/Register',
	'models/User'
], function (Marionette, Login, Todo, Flash, TableExample, Camera, Register, User) {
	'use strict';

	var app = new Marionette.Application();

	app.addRegions({
		login: '#login',
		flash: '#flash',
		todo: '#placeholder1',
		tableExample: '#placeholder4',
		camera: '#placeholder5',
		userRegister: '#placeholder6'
	});

	app.addInitializer(function () {
		app.login.show(new Login());
		app.todo.show(new Todo());
		app.flash.show(new Flash());
		app.tableExample.show(new TableExample());
		app.camera.show(new Camera());
		app.userRegister.show(new Register());
	});

	app.user=new User();
	return window.app = app;
});
