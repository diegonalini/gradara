/*global define */

define([
	'backbone',
	'bonelets/models/Todo',
	'localStorage'
], function (Backbone, Todo) {
	'use strict';

	function isCompleted(todo) {
		return todo.get('completed');
	}

	return Backbone.Collection.extend({
		model: Todo,

		//localStorage: new Backbone.LocalStorage('todos-backbone'),
		url: '/api/todos',

		getCompleted: function () {
			return this.filter(isCompleted);
		},

		getActive: function () {
			return this.reject(isCompleted);
		},

		comparator: function (todo) {
			return todo.get('created');
		}
	});
});
