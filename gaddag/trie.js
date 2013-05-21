/*jslint indent: 2 */
/*jslint plusplus: true */
/*jslint browser: true */

"use strict";

function Trie() {

  var trie = {};

  this.removeAll = function () {
    trie = {};
  };

  this.addAll = function (words) {
    var i, l, percent;

    for (i = 0, l = words.length; i < l; i++) {
      percent = 100 * i / words.length;
      console.log("adding word " + i + " of " + l + " (" + percent + "% complete)");
      this.add(words[i]);
    }

    return this;
  };

  this.add = function (word) {
    var letters = word.split(""),
      cur = trie,
      j,
      letter,
      pos;

    for (j = 0; j < letters.length; j++) {
      letter = letters[j];
      pos = cur[letter];

      if (pos === undefined) {
        cur = cur[letter] = j === letters.length - 1 ? 0 : {};

      } else if (pos === 0) {
        cur = cur[letter] = { $: 0 };

      } else {
        cur = cur[letter];
      }
    }

    return this;
  };

  // Returns the JSON structure
  this.getTrie = function () {
    return trie;
  };

  // Prints all words contained in the Trie
  this.getWords = function () {
    var words = [];

    // from John Resig's dump-trie.js
    function dig(word, cur) {
      var node, val;

      for (node in cur) {
        if (cur.hasOwnProperty(node)) {
          val = cur[node];

          if (node === "$") {
            words.push(word);

          } else if (val === 0) {
            words.push(word + node);

          } else {
            dig(word + node, val);
          }
        }
      }
    }

    dig("", trie);
    return words;
  };

  this.getJson = function () {

    // Commented .replace(...) for debugging as I need the quotes to visualize JSON.
    var ret = JSON.stringify(trie), //.replace(/"/g, "");
      reserved = [ "abstract", "boolean", "break", "byte", "case", "catch", "char", "class", "const",
        "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "export", "extends",
        "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in",
        "instanceof", "int", "interface", "long", "native", "new", "null", "package", "private", "protected",
        "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws",
        "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with" ],
      i;

    for (i = 0; i < reserved.length; i++) {
      ret = ret.replace(new RegExp("([{,])(" + reserved[i] + "):", "g"), "$1'$2':");
    }

    return ret;
  };
}

/*
// Test code
var t = new Trie();
t.addAll(["CAR", "CARE", "CARREL", "PRECEDE", "PRESTO", "RADIUS"]);
console.log("JSON string: " + t.getJson() + "\n");
console.log("Words: " + t.getWords().join(', '));
*/
