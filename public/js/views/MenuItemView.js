/*global define */

define([
	'marionette',
	'templates',
	'views/Todo',
	'views/Camera'
], function (Marionette, templates, Todo, Camera) {
	'use strict';

	return Marionette.CompositeView.extend({
		tagName: 'li',

		template: templates.menuItemView,

		ui: {
		},

		events: {
			'click': 'clicked'		
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render, this);
		},

		onRender: function () {
			this.$el.removeClass('active');
			if((this.model.get('title').toLowerCase()=='home' && Backbone.history.fragment=='')||this.model.get('title')==Backbone.history.fragment){
				this.$el.addClass( 'active');
				this.putBonelets();
			}
		},
		
		clicked: function () {
			$("#menu-list li").removeClass('active');
			this.$el.removeClass('active').addClass('active');
		    var dest=this.model.get('title');
		    if(dest.toLowerCase()=='home') dest='';
			app.router.navigate(dest);
			this.putBonelets();
		},
		
		putBonelets: function (){
			//clear all
			try{app.bonelet1.remove(); app.bonelet1=null;}catch(err){}
			try{app.bonelet2.remove(); app.bonelet2=null;}catch(err){}
			try{app.bonelet3.remove(); app.bonelet3=null;}catch(err){}
			try{app.bonelet4.remove(); app.bonelet4=null;}catch(err){}
			try{app.bonelet5.remove(); app.bonelet5=null;}catch(err){}
			try{app.bonelet6.remove(); app.bonelet6=null;}catch(err){}
			
			//place bonelets
			if(this.model.get('title').toLowerCase()=='home') {
				app.bonelet1=new Todo();
				app.p1.show(app.bonelet1);
			}	
			else {
				app.bonelet2=new Camera();
				app.p4.show(app.bonelet2);
			}
		}
	
	});
});
