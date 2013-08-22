/*global define */

define([
	'marionette',
	'collections/TodoList',
	'views/Header',
	'views/TodoListCompositeView',
	'views/Footer',
	'views/Login'
], function (Marionette, TodoList, Header, TodoListCompositeView, Footer, Login) {
	'use strict';

	var app = new Marionette.Application();
	var todoList = new TodoList();

	var viewOptions = {
		collection: todoList
	};

	var header = new Header(viewOptions);
	var main = new TodoListCompositeView(viewOptions);
	var footer = new Footer(viewOptions);
	var login = new Login(viewOptions);

	app.addRegions({
		header: '#todomvc-header',
		main: '#todomvc-main',
		footer: '#todomvc-footer',
		login: '#login'
	});

	app.addInitializer(function () {
		app.header.show(header);
		app.main.show(main);
		app.footer.show(footer);
		app.login.show(login);
		todoList.fetch();
	});

	app.listenTo(todoList, 'all', function () {
		app.main.$el.toggle(todoList.length > 0);
		app.footer.$el.toggle(todoList.length > 0);
	});

	app.vent.on('todoList:filter', function (filter) {
		footer.updateFilterSelection(filter);

		document.getElementById('todoapp').className = 'filter-' + (filter === '' ? 'all' : filter);
	});

	app.vent.on('todoList:clear:completed', function () {
		todoList.getCompleted().forEach(function (todo) {
			todo.destroy();
		});
	});

	return window.app = app;
});
