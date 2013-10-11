/*global define */

define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';

	return Marionette.CompositeView.extend({
		 initialize: function() {
            _.bindAll(this);
            this.template = _.template($('#app-template').val());
            this.searchBox = new Views.SearchBox();
            this.searchBox.on('searchRequest', this.performSearch, this);
            this.collection = new Collections.Videos();
            this.collection.on('reset', this.showVideos, this);
            this.performSearch();
        },

        showVideos: function() {
            this.$el.find('#video-list-container').empty();
            var v = null;
            this.collection.each(function(item, idx) {
                v = new Views.SingleVideo({model:item});
                this.$el.find('#video-list-container').append(v.render().el);
            }, this);
            return this;
        },
        
        performSearch: function(evdata) {
            evdata = evdata || {};
            this.collection.fetch({data:{q:evdata.queryString}});
        },
		
		events: {
            
        },

		template: templates.video,

		onRender: function () {
			this.$el.find('#video-search-box').html(this.searchBox.render().el);
            this.showVideos();
		}
	
	});
});
