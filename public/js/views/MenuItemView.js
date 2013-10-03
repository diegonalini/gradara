/*global define */

define([
	'marionette',
	'templates',
	'bonelets/views/Todo',
	'bonelets/views/Camera'
], function (Marionette, templates, Todo, Camera) {
	'use strict';

	return Marionette.ItemView.extend({
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
			var self=this;
			this.$el.removeClass('active');
			if((this.model.get('title').toLowerCase()=='home' && Backbone.history.fragment=='') || this.model.get('title')==Backbone.history.fragment){
				this.$el.addClass( 'active');
				this.putBonelets();
			}
			if(this.model.get('role')=='admin' && window.app.user.get('role')!='admin')
				{
					this.$el.addClass( 'hide');
					self.remove();
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
			/*if(app.bonelet[1]!=null && app.bonelet[1].name=='Todo')return;
			//clear all
			for (var i=1;i<=6; i++){
				try{app.bonelet[i].remove(); app.bonelet[i]=null;}catch(err){}	
			}
			console.log("placing bonelets");
			//place bonelets
			if(this.model.get('role')=='admin' && window.app.user.get('role')!='admin') return;
			for (var key in this.model.get('bonelets')){
				var value=this.model.get('bonelets')[key];
				if(value=='Todo') app.bonelet[parseInt(key)]=new Todo();
				if(value=='Camera') app.bonelet[parseInt(key)]=new Camera();
				app['p'+key].show(app.bonelet[parseInt(key)]);
			}*/
			for (var i=1;i<=6; i++){
				if(app.bonelet[i]!=null && this.model.get('bonelets')!=null && app.bonelet[i].name==this.model.get('bonelets')[""+i]) continue;
				try{app.bonelet[i].remove(); app.bonelet[i]=null;}catch(err){}	
				//if (this.model.get('bonelets')[""+i]!=null){
				try{
					console.log(i);
					var value=this.model.get('bonelets')[""+i];
					if(value=='Todo') app.bonelet[i]=new Todo();
					if(value=='Camera') app.bonelet[i]=new Camera();
					app['p'+i].show(app.bonelet[i]);
				}catch(err){} //}
			}
		}
	
	});
});
