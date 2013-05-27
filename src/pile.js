/*global _, Backbone */

"use strict";

var Pile = Backbone.Model.extend({

  defaults: {
    tiles: [],

    letterFrequencies: {
      J: 1,
      K: 1,
      Q: 1,
      X: 1,
      Z: 1,
      B: 2,
      C: 2,
      F: 2,
      H: 2,
      M: 2,
      P: 2,
      V: 2,
      W: 2,
      Y: 2,
      " ": 2,
      G: 3,
      D: 4,
      L: 4,
      S: 4,
      U: 4,
      N: 6,
      R: 6,
      T: 6,
      O: 8,
      A: 9,
      I: 9,
      E: 12
    }
  },

  initialize: function () {
    _.each(this.letterFrequencies, function (frequency, letter) {
      console.log(letter + " exists " + frequency + " times");
      _.times(frequency, function () {
        this.pile.push(letter);
      });
    });
    console.log(this.pile);
  }

});
