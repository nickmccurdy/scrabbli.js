/*jslint indent: 2 */
/*jslint plusplus: true */
/*jslint browser: true */

/*global $, Gaddag */

"use strict";

(function () {
  var gaddag = new Gaddag(),
    wordArray = ["A", "AT", "CAR", "CAT", "CARE", "CARREL", "DATE", "PRECEDE", "PRESTO", "RADIUS"];

  function init() {
    $("body").append('<h1>GADDAG Test</h1>');
    $("body").append('<ul id="test-log"></ul>');
  }

  function log(message) {
    $("#test-log").append("<li>" + message + "</li>");
  }

  function test() {
    init();

    log("Adding words: " + wordArray.join(', '));
    gaddag.addAll(wordArray);

    log("JSON string: " + gaddag.getJson());
    log("All words with U: " + gaddag.findWordsWithHook('U').join(', '));
    log("All words with E: " + gaddag.findWordsWithHook('E').join(', '));
    log("All words with D: " + gaddag.findWordsWithHook('D').join(', '));
    log("All words with U that can be formed using S and T: " + gaddag.findWordsWithRackAndHook(['S', 'T'], 'U').join(', '));
    log("All words with U that can be formed using S, D, T, I, A and R: " + gaddag.findWordsWithRackAndHook(['S', 'D', 'T', 'I', 'A', 'R'], 'U').join(', '));
    log("All words with E that can be formed using D, P, A, T, R, O and S: " + gaddag.findWordsWithRackAndHook(['D', 'P', 'A', 'T', 'R', 'O', 'S'], 'E').join(', '));

    log("All words that can be formed using ['D', 'P', 'A', 'T', 'R', 'C', 'E'] at start of game (no hook): " + gaddag.findWordsWithRackAndHook(['D', 'P', 'A', 'T', 'R', 'C', 'E'], '').join(', '));
  }

  test();
}());
