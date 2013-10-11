/*global define */

define([
	'backbone',
	'bonelets/models/Video'
], function (Backbone, Video) {
	'use strict';


	return Backbone.Collection.extend({
		model: Video,
		url: 'http://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&max-results=9',
		parse: function(resp) {
            return resp.data.items;
        }
	});
});
