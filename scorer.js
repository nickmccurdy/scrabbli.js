/*global _ */

"use strict";

function Scorer() {

  var letterScores = {
    " ": 0,
    E: 1,
    A: 1,
    I: 1,
    O: 1,
    N: 1,
    R: 1,
    T: 1,
    L: 1,
    S: 1,
    U: 1,
    D: 2,
    G: 2,
    B: 3,
    C: 3,
    M: 3,
    P: 3,
    F: 4,
    H: 4,
    V: 4,
    W: 4,
    Y: 4,
    K: 5,
    J: 8,
    X: 8,
    Q: 10,
    Z: 10
  };

  this.score = function (word) {
    return _.reduce(word, function (sum, letter) {
      return sum + letterScores[letter];
    }, 0);
  };

  this.sortByScore = function (words) {
    var scorer = new Scorer();
    return _.sortBy(words.sort(), function (word) {
      return scorer.score(word);
    }).reverse();
  };

  this.findBestWord = function (words) {
    return this.sortByScore(words)[0];
  };

}
