/*global define */

define([
	'marionette',
	'views/Login',
	'views/Todo',
	'views/TableExample'
], function (Marionette, Login, Todo, TableExample) {
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

	return window.app = app;
});
