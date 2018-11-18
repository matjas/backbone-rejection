var Backbone = require('backbone');
var _ = require('underscore');
var asksCollection = require('../collections/asks');
var AskModel = require('../models/ask');

var Form = Backbone.View.extend({
    el: '#forms',
    events: {
        'click .btn-default': 'submitAsk'
    },
    template: _.template([
        '<form>\n    <div class="form-group">\n        <label>Question Asked</label>\n        <input type="text" class="form-control" id="qa" placeholder="Who invited wheel?" value="<%= ask %>">\n    </div>\n    <div class="form-group">\n        <label for="pa">Person Asked</label>\n        <input type="text" class="form-control" id="pa" placeholder="Maciej Jaskuła" value="<%= askee %>">\n    </div>\n    <div class="row">\n        <div class="col-sm-12events: {\n        \'click .btn-default\': \'addAccepted\',\n        \'click .btn-primary\': \'addRejected\'\n    }, text-center">\n            <button type="button" class="btn btn-default">Submit</button>\n        </div>\n    </div>\n</form>'
    ].join('')),
    initialize: function() {
        
        this.render();
        this.$askInput = this.$('#qa');
        this.$askeeInput = this.$('#pa');
    },
    render: function() {
        this.$el.html(this.template({ask: '', askee: ''}));
        return this;
    },
    addOne: function(){
        var ask = this.$askInput.val().trim();
        var askee = this.$askeeInput.val().trim();

        if (ask && askee) {
            asksCollection.create(
                new AskModel({
                    timestamp: Date.now(),
                    ask: ask,
                    askee: askee,
                    status: null
                })
            );
        }
        this.clearInputs();

    },
    submitAsk: function () {
        this.addOne();
    },
    clearInputs: function() {
        this.$askInput.val('');
        this.$askeeInput.val('');
    }
});

module.exports = new Form;
