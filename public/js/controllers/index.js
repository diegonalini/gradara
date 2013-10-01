/*global define */

define([
	'app'
], function (app) {
	'use strict';

	return {
		changePage: function (param) {
			Backbone.trigger('change:page');
			console.log(param);
		}
	};
});
