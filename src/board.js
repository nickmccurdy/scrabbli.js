/*global $, _, Backbone */

"use strict";

var Board = Backbone.Model.extend({

  defaults: {
    tiles: []
  },

  initialize: function () {
    var that = this, empty_row = [];

    this.tiles = [];

    _.times(15, function () {
      empty_row.push("");
    });

    _.times(15, function () {
      that.tiles.push(empty_row);
    });
  },

  isEmpty: function () {
    _.every(this.tiles, function (row) {
      _.every(row, function (tile) {
        return tile === "";
      });
    });
  },

  isFull: function () {
    _.every(this.tiles, function (row) {
      _.every(row, function (tile) {
        return tile !== "";
      });
    });
  }

});

var BoardView = Backbone.View.extend({

  initialize: function () {
    this.el = $("#board");
    this.render();
    this.listenTo(this.model, "change:tiles", this.render);
  },

  //template: _.template($("#board-template").html()),

  render: function () {
    var template = "";

    _.each(this.model.tiles, function (row) {
      template += "<tr>";

      _.each(row, function (tile) {
        template += "<td>" + tile + "</td>";
      });

      template += "</tr>";
    });

    this.el.html(template);
    //this.$el.html(this.template(this.model.toJSON()));

    return this;
  }

});
