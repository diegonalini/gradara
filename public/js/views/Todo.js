/*global define */

define(['marionette', 
		'templates', 
		'views/Todo', 
		'views/TodoHeader', 
		'views/TodoListCompositeView', 
		'views/TodoFooter', 
		'collections/TodoList'], function(Marionette, templates, Todo, Header, TodoListCompositeView, Footer, TodoList) {
	'use strict';

	return Marionette.Layout.extend({
		template : templates.todo,

		regions : {
			header : '#todomvc-header',
			main : '#todomvc-main',
			footer : '#todomvc-footer'
		},

		onRender : function() {
			var todoList = new TodoList();

			todoList.fetch();

			var viewOptions = {
				collection : todoList
			};

			var header = new Header(viewOptions);
			var main = new TodoListCompositeView(viewOptions);
			var footer = new Footer(viewOptions);

			this.header.show(header);
			this.main.show(main);
			this.footer.show(footer);
	
			this.listenTo(window.app.user, 'change:isLogged', function() {
				todoList.fetch();
				this.render();
			});
	
			this.listenTo(todoList, 'all', function() {
				this.main.$el.toggle(todoList.length > 0);
				this.footer.$el.toggle(todoList.length > 0);
			});

			app.vent.on('todoList:filter', function(filter) {
				footer.updateFilterSelection(filter);
				document.getElementById('todoapp').className = 'filter-' + (filter === '' ? 'all' : filter);
			});

			app.vent.on('todoList:clear:completed', function() {
				todoList.getCompleted().forEach(function(todo) {
					todo.destroy();
				});
			});
		}
	});
});
