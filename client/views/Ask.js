var Backbone = require('backbone');
var _ = require('underscore');

var Ask = Backbone.View.extend({
    template: _.template([
        '<li class="list-group-item <%= status === \'accepted\' ? \'list-group-item-warning\' : \'list-group-item-info\' %>">\n    <button class="badge delete-btn">delete</button>\n    <p id="question">\n        <strong>Question: </strong>\n        <%- ask %>\n    </p>\n    <p id="person">\n        <strong>Person: </strong>\n        <%- askee %>\n    </p>\n    <p id="points">\n        <span>Ask score</span>:\n        <span>\n            <% if(status == \'accepted\') { %>\n                1\n            <% } else if (status == \'rejected\'){ %>\n                10\n            <% } else {%>\n                0\n            <% } %>\n        \n        </span>\n        <span>points</span>\n    </p>\n    <p id="submission-date">\n        <i>Submitted on: <%- fDate %></i>\n    </p>\n    <div class="row">\n        <div class="col-sm-6 text-center">\n            <button type="button" class="btn btn-default <%= status ? \'disabled\': \'\' %>">Accepted</button>\n        </div>\n        <div class="col-sm-6 text-center">\n            <button type="button" class="btn btn-primary <%= status ? \'disabled\': \'\' %>">Rejected</button>\n        </div>\n    </div>\n\n</li>'
    ].join('')),
    events: {
        'click .btn-default': 'acceptAsk',
        'click .btn-primary': 'rejectAsk',
        'click .delete-btn': 'deleteAsk'
    },
    initialize: function() {
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
        // Backbone LocalStorage is adding `id` attribute instantly after
        // creating a model.  This causes our TodoView to render twice. Once
        // after creating a model and once on `id` change.  We want to
        // filter out the second redundant render, which is caused by this
        // `id` change.  It's known Backbone LocalStorage bug, therefore
        // we've to create a workaround.
        // https://github.com/tastejs/todomvc/issues/469
        if (this.model.changed.id !== undefined) {
            return;
        }
        var fDate = new Date(this.model.attributes.timestamp);
        this.$el.html(this.template(_.extend(this.model.toJSON(), {fDate: fDate})));
        return this;
    },
    acceptAsk: function() {
        this.model.setStatus('accepted');
    },
    rejectAsk: function() {
        this.model.setStatus('rejected');
    },
    deleteAsk: function() {
        this.model.destroy();
    }
});

module.exports = Ask;