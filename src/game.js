/*global $, _, Backbone, Gaddag, dictionary */

"use strict";

var Game = Backbone.Model.extend({

  defaults: {
    board: [],
    gaddag: new Gaddag()
  },

  initialize: function () {
    this.create_board();
    this.gaddag.add(dictionary());
  },

  create_board: function () {
    var empty_row = [];

    _.times(15, function () {
      empty_row.append("");
    });

    _.times(15, function () {
      this.board.append(empty_row);
    });
  }

});

function init() {
  var game = new Game();
}
