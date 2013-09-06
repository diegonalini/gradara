/*global define */

define([
	'marionette',
	'views/Login',
	'views/Todo',
	'views/TableExample',
	'models/User'
], function (Marionette, Login, Todo, TableExample, User) {
	'use strict';

	var app = new Marionette.Application();

	app.addRegions({
		login: '#login',
		todo: '#placeholder1',
		tableExample: '#placeholder4'
	});

	app.addInitializer(function () {
		app.login.show(new Login());
		app.todo.show(new Todo());
		app.tableExample.show(new TableExample());
	});

	app.user=new User();
	//console.log("INIZ "+JSON.stringify(app.user));
	return window.app = app;
});
