/*global define */

define([
	'marionette',
	'views/Login',
	'views/Todo',
	'views/Flash',
	'views/TableExample',
	'models/User'
], function (Marionette, Login, Todo, Flash, TableExample, User) {
	'use strict';

	var app = new Marionette.Application();

	app.addRegions({
		login: '#login',
		flash: '#flash',
		todo: '#placeholder1',
		tableExample: '#placeholder4'
	});

	app.addInitializer(function () {
		app.login.show(new Login());
		app.todo.show(new Todo());
		app.flash.show(new Flash());
		app.tableExample.show(new TableExample());
	});

	app.user=new User();
	//console.log("INIZ "+JSON.stringify(app.user));
	return window.app = app;
});
