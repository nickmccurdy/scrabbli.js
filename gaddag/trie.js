/*global _ */

"use strict";

function Trie() {

  var trie = {};

  this.clear = function () {
    trie = {};
  };

  this.add = function (words) {
    var percent, thisTrie = this;

    if (typeof words === "string") {
      this.addWord(words);
    } else {
      _.each(words, function (word, index) {
        percent = 100 * index / words.length;
        console.log("adding word " + index + " of " + words.length + " (" + percent + "% complete)");
        thisTrie.addWord(word);
      });
    }

    return this;
  };

  this.addWord = function (word) {
    var letters = word.split(""),
      cur = trie,
      pos;

    _.each(letters, function (letter, index) {
      pos = cur[letter];

      if (pos === undefined) {
        cur[letter] = index === letters.length - 1 ? 0 : {};
      } else if (pos === 0) {
        cur[letter] = { $: 0 };
      }

      cur = cur[letter];
    });

    return this;
  };

  // Returns the JSON structure
  this.getTrie = function () {
    return trie;
  };

  // from John Resig's dump-trie.js
  function dig(words, word, cur) {
    _.each(cur, function (childVal, childNode) {
      if (childNode === "$") {
        words.push(word);
      } else if (childVal === 0) {
        words.push(word + childNode);
      } else {
        words = dig(words, word + childNode, childVal);
      }
    });

    return words;
  }

  // Prints all words contained in the Trie
  this.getWords = function () {
    return dig([], "", trie);
  };

  this.getJSON = function () {

    // Commented .replace(...) for debugging as I need the quotes to visualize JSON.
    var result = JSON.stringify(trie), //.replace(/"/g, "");
      reserved = [ "abstract", "boolean", "break", "byte", "case", "catch", "char", "class", "const",
        "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "export", "extends",
        "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in",
        "instanceof", "int", "interface", "long", "native", "new", "null", "package", "private", "protected",
        "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws",
        "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with" ],
      i;

    _.each(reserved, function (keyword) {
      result = result.replace(new RegExp("([{,])(" + keyword + "):", "g"), "$1'$2':");
    });

    return result;
  };
}
