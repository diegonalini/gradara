define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';

// A Grid Row
var GridRow = Backbone.Marionette.ItemView.extend({
    template: templates.tableExR,
    tagName: "tr"
});




// ----------------------------------------------------------------
// Below this line is normal stuff... models, templates, data, etc.
// ----------------------------------------------------------------
var userData = [
    {
        username: "dbailey",
        fullname: "Derick Bailey"
    },
    {
        username: "jbob",
        fullname: "Joe Bob"
    },
    {
        username: "fbar",
        fullname: "Foo Bar"
    }
];
    

var User = Backbone.Model.extend({});

var UserCollection = Backbone.Collection.extend({
    model: User
});

var userList = new UserCollection(userData);



// The grid view
var GridView = Backbone.Marionette.CompositeView.extend({
    tagName: "table",
    template: templates.tableExG,
    itemView: GridRow,
    
    appendHtml: function(collectionView, itemView){
        collectionView.$("tbody").append(itemView.el);
    }
});



return GridView;
});
