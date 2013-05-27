/*global $, _, Backbone, Board, BoardView, Gaddag, Pile, Player, dictionary */

"use strict";

var Game = Backbone.Model.extend({

  initialize: function () {
    this.board = new Board();
    this.board_view = new BoardView({ model: this.board });
    this.gaddag = new Gaddag();
    this.pile = new Pile();
    this.player = new Player({ game: this });
  },

});

var game = new Game();

function init() {
  game.get("gaddag").add(dictionary());
}
