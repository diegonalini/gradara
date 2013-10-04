/*global define */

define([
	'backbone',
	'bonelets/models/SlideShowModel'
], function (Backbone, SlideShowModel) {
	'use strict';


	return Backbone.Collection.extend({
		model: SlideShowModel,
		url: '/api/slideshows',
		initialize: function(){
			//this.fetch();
		}
	});
});
