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
