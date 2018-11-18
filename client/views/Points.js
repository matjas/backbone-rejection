/**
 * Created by maciejjaskula on 07.05.2017.
 */
var Backbone = require('backbone');
var _ = require('underscore');
var asksCollection = require('../collections/asks');

var Points = Backbone.View.extend({
    el: '#score',
    template: _.template([
        '<div class="col-sm-12 text-center">' +
            '<p>Score</p>' +
            '<p id="totalScore"><%= points %></p>' +
        '</div>'
    ].join('')),
    initialize: function() {
        this.points = 0;
        this.listenTo(asksCollection, 'sync', this.refreshPoints)
    },
    render: function(){
        this.$el.html(this.template({points: this.points}));
        return this;
    },
    refreshPoints: function () {
        this.points = _.reduce(asksCollection.models, function(memo, model){
            switch(model.attributes.status) {
                case 'accepted':
                    return memo + 1;
                    break;
                case 'rejected':
                    return memo + 10;
                    break;
                default:
                    return memo;
            }
        }, 0);
        this.render();
    }
});

module.exports = new Points;