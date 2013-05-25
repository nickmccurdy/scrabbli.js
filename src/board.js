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
  }

});
