/*global define */

define([
	'backbone',
	'models/Menu',
	'localStorage'
], function (Backbone, Menu) {
	'use strict';


	return Backbone.Collection.extend({
		model: Menu,

		//localStorage: new Backbone.LocalStorage('todos-backbone'),
		url: '/api/menus',

		initialize:function () {
		},

		getActive: function () {
	//		return this.reject(isCompleted);
		}/*,

		comparator: function (todo) {
			return todo.get('created');
		}*/
	});
});
