/**
 * Created by maciejjaskula on 04.06.2017.
 */
var Backbone = require('backbone');
var _ = require('underscore');
var asksCollection = require('../collections/asks');
var TIME_TO_ANSWER = 1 * 1 * 60 * 1000;

var Timer = Backbone.Model.extend({
    default: {
        lastDate: Date.now(),
        timeout: null

    },
    initialize: function () {
        this.startTimer();
        
    },
    startTimer: function () {
        if(asksCollection.length > 0) {
            this._countTimeout();
            this._startTimeout();
        }
    },
    _startTimeout: function () {
        if(!this.timeout){
            return false;
        }
        this.timeoutId && clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout((function(){
            this.trigger('timer:end');
            this.timeout = null;
        }).bind(this), this.timeout);
    },
    _countTimeout: function(){
        var lastAnswer =  asksCollection.max(function(model){
            return model.attributes.answerDate
        });
        if (_.isObject(lastAnswer)) {
            this.timeout = lastAnswer.attributes.answerDate - Date.now() + TIME_TO_ANSWER;
        } else {
            var firstQuestion =  asksCollection.min(function(model){
                return model.attributes.timestamp;
            });
            if (_.isObject(firstQuestion)) {
                this.timeout = firstQuestion.attributes.timestamp - Date.now() + TIME_TO_ANSWER;
            }
        }
        return this.timeout;
    }
});

module.exports = new Timer;