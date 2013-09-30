/*global define */

define([
	'backbone',
	'localStorage'
], function (Backbone) {
	'use strict';

	return Backbone.Model.extend({
		idAttribute: "_id",
		
		defaults: {
			title: '?',
			active: false
		}

	});
});

