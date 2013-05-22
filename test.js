/*global $, test, ok, equal, deepEqual, _, Trie, Gaddag, Scorer, dictionary_sample */

"use strict";

var trie = new Trie(),
  gaddag = new Gaddag(),
  scorer = new Scorer(),
  wordArray = ["A", "AT", "CAR", "CAT", "CARE", "CARREL", "DATE", "PRECEDE", "PRESTO", "RADIUS"];

test("Trie", function () {
  // Test code
  ok(trie.add(["CAR", "CARE", "CARREL", "PRECEDE", "PRESTO", "RADIUS"]), "should add words to itself");
  equal(trie.getJSON(), '{"C":{"A":{"R":{"$":0,"E":0,"R":{"E":{"L":0}}}}},"P":{"R":{"E":{"C":{"E":{"D":{"E":0}}},"S":{"T":{"O":0}}}}},"R":{"A":{"D":{"I":{"U":{"S":0}}}}}}', "should get its JSON representation");
  deepEqual(trie.getWords(), ["CAR", "CARE", "CARREL", "PRECEDE", "PRESTO", "RADIUS"], "should get the words it contains");
});

test("Gaddag", function () {
  ok(gaddag.add(wordArray), "should add words to its inner trie structure");

  equal(gaddag.getJSON(), '{"A":{">":{"$":0,"T":0},"C":{">":{"R":{"$":0,"E":0,"R":{"E":{"L":0}}},"T":0}},"D":{">":{"T":{"E":0}}},"R":{">":{"D":{"I":{"U":{"S":0}}}}}},"T":{"A":{">":0,"C":{">":0},"D":{">":{"E":0}}},"S":{"E":{"R":{"P":{">":{"O":0}}}}}},"C":{">":{"A":{"R":{"$":0,"E":0,"R":{"E":{"L":0}}},"T":0}},"E":{"R":{"P":{">":{"E":{"D":{"E":0}}}}}}},"R":{"A":{"C":{">":{"$":0,"E":0,"R":{"E":{"L":0}}}}},"R":{"A":{"C":{">":{"E":{"L":0}}}}},"P":{">":{"E":{"C":{"E":{"D":{"E":0}}},"S":{"T":{"O":0}}}}},">":{"A":{"D":{"I":{"U":{"S":0}}}}}},"E":{"R":{"A":{"C":{">":0}},"R":{"A":{"C":{">":{"L":0}}}},"P":{">":{"C":{"E":{"D":{"E":0}}},"S":{"T":{"O":0}}}}},"T":{"A":{"D":{">":0}}},"C":{"E":{"R":{"P":{">":{"D":{"E":0}}}}}},"D":{"E":{"C":{"E":{"R":{"P":{">":0}}}}}}},"L":{"E":{"R":{"R":{"A":{"C":{">":0}}}}}},"D":{">":{"A":{"T":{"E":0}}},"E":{"C":{"E":{"R":{"P":{">":{"E":0}}}}}},"A":{"R":{">":{"I":{"U":{"S":0}}}}}},"P":{">":{"R":{"E":{"C":{"E":{"D":{"E":0}}},"S":{"T":{"O":0}}}}}},"S":{"E":{"R":{"P":{">":{"T":{"O":0}}}}},"U":{"I":{"D":{"A":{"R":{">":0}}}}}},"O":{"T":{"S":{"E":{"R":{"P":{">":0}}}}}},"I":{"D":{"A":{"R":{">":{"U":{"S":0}}}}}},"U":{"I":{"D":{"A":{"R":{">":{"S":0}}}}}}}', "should get its JSON representation");

  deepEqual(gaddag.findWordsWithHook("U"), ["RADIUS"], "should find all words with U");
  deepEqual(gaddag.findWordsWithHook("E"), ["CARE", "CARREL", "PRECEDE", "PRESTO", "DATE", "PRECEDE", "PRECEDE"], "should find all words with E");
  deepEqual(gaddag.findWordsWithHook("D"), ["DATE", "PRECEDE", "RADIUS"], "should find all words with D");

  deepEqual(gaddag.findWordsWithRackAndHook(["S", "T"], "U"), [], "should find all words with U that can be formed using S and T");
  deepEqual(gaddag.findWordsWithRackAndHook(["S", "D", "T", "I", "A", "R"], "U"), ["RADIUS"], "should find all words with U that can be formed using S, D, T, I, A and R");
  deepEqual(gaddag.findWordsWithRackAndHook(["D", "P", "A", "T", "R", "O", "S"], "E"), ["PRESTO", "DATE"], "should find all words with E that can be formed using D, P, A, T, R, O and S");

  deepEqual(gaddag.findWordsWithRackAndHook(["D", "P", "A", "T", "R", "C", "E"], ""), ["A", "AT", "CAR", "CARE", "CAT", "DATE"], 'should find all words that can be formed using ["D", "P", "A", "T", "R", "C", "E"] at start of game (no hook)');
});

test("Scorer", function () {
  equal(scorer.score("RADIUS"), 7, "should find the score for RADIUS");
  deepEqual(scorer.sortByScore(wordArray), ["PRECEDE", "PRESTO", "CARREL", "RADIUS", "CARE", "DATE", "CAR", "CAT", "AT", "A"], "should sort the words by decreasing score");
  equal(scorer.findBestWord(wordArray), "PRECEDE", "should find the best scoring word");
});

test("Performance", function () {
  ok(gaddag.add(dictionary_sample), "for adding words to a GADDAG");
});
