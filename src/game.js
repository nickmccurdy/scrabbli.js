/*global $, _, Backbone, Board, Gaddag, dictionary */

"use strict";

var Game = Backbone.Model.extend({

  defaults: {
    board: new Board(),
    gaddag: new Gaddag()
  },

  initialize: function () {
  }

});

var game = new Game();

function init() {
  game.get("gaddag").add(dictionary());
}
