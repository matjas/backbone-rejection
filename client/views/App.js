var ENTER_KEY = 13;
var ESC_KEY = 27;
var Backbone = require('backbone');
var points = require('./Points');
var form = require('./Form');
var Ask = require('./Ask');
var asksCollection = require('../collections/asks');
var timer = require('../tools/timer');

var App = Backbone.View.extend({
    el: '#app',
    initialize: function () {
        this.$list = this.$('#answer-list ul');
        points.render();
        this.listenTo(asksCollection, 'add', this.addOne);
        this.listenTo(asksCollection, 'reset', this.addAll);
        this.listenTo(asksCollection, 'sync', this.setTimer);
        this.listenTo(timer, 'timer:end', this.endGame);
        asksCollection.fetch({reset: true});
    },
    addOne: function (ask) {
        var askView = new Ask({model: ask});
        this.$list.append(askView.render().el)
        
    },
    addAll: function () {
        this.$list.html('');
        asksCollection.each(this.addOne, this);
        
    },
    setTimer: function () {
        timer.startTimer();
    },
    endGame: function () {
        console.log('game is over');
    }
});

module.exports = App;