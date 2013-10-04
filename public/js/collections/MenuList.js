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

		sort_key: 'order', // default sort key
	    comparator: function(item) {
	        return item.get(this.sort_key);
	    },
	    sortByField: function() {
	        this.sort();
	    }
	});
});
