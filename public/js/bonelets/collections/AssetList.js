/*global define */

define([
	'backbone',
	'bonelets/models/AssetModel'
], function (Backbone, AssetModel) {
	'use strict';


	return Backbone.Collection.extend({
		model: AssetModel,
		url: '/api/assets',
		initialize: function(){
			//this.fetch();
		}
	});
});
