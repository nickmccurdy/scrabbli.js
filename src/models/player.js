/*global $, _, Backbone, Board, BoardView, Gaddag, dictionary */

"use strict";

var Player = Backbone.Model.extend({

  defaults: {
    rack: []
  },

  initialize: function () {
    this.drawTiles();
  },

  autoMove: function () {
    if (this.board.isEmpty()) {
      this.gaddag.findWordsWithRackAndHook(this.rack, "");
    } else {
      var hooks = _.uniq(_.pluck(this.board.tiles, "value"));
      _.each(hooks, function (hook) {
        this.gaddag.findWordsWithRackAndHook(this.rack, hook);
      });
    }
    this.dealTiles();
  },

  drawTiles: function () {
    while (this.get("rack").length < 7) {
      var newTile = this.get("pile").splice(_.random(this.get("pile").length), 1);
      this.get("tiles").push(newTile);
    }
    console.log(this.get("tiles"));
  }

});
