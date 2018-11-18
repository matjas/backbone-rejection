/**
 * Created by maciejjaskula on 03.05.2017.
 */
var Backbone = require('backbone');

var Ask = Backbone.Model.extend({
    default: {
        timestamp: Date.now(),
        ask: '',    // the ask
        askee: '',  // person asked
        status: '',  //'Accepted ' or 'Rejected',
        answerDate: ''
    },
    setStatus: function(status){
        this.save({
            answerDate: Date.now(),
            status: status
        })
    }
});

module.exports = Ask;

