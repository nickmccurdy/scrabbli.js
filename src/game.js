/*global $, _, Backbone, Board, BoardView, Gaddag, dictionary */

"use strict";

var Game = Backbone.Model.extend({

  defaults: {
  },

  initialize: function () {
    this.board = new Board();
    this.board_view = new BoardView({ model: this.board });
    this.gaddag = new Gaddag();
  }

});

var game = new Game();

function init() {
  game.get("gaddag").add(dictionary());
}
