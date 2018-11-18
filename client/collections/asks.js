require('backbone.localStorage');
var Backbone = require('backbone');
var _ = require('underscore');
var Ask = require('../models/ask');


var Asks = Backbone.Collection.extend({
    model: Ask,
    // Save all of the asks items under this example's namespace.
    localStorage: new Backbone.LocalStorage('rejection-backbone'),
    initialize: function(){},
    
    comparator: 'timestamp'
});

module.exports = new Asks;