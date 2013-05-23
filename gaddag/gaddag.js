/*global _, Trie */

"use strict";

// Array Remove - By John Resig (MIT Licensed)
// http://ejohn.org/blog/javascript-array-remove/
Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// requires trie.js and util.js

// TODO: Handle no hook case - just use first function?
//      or maybe make each rack letter a hook and call recursive function

function Gaddag() {

  var separator = ">";

  this.addWord = function (word) {
    var i, prefix, ch;

    if (word.length === 0) {
      return;
    }

    _.each(word, function (letter, index) {
      if (index > 0) {
        prefix = word.substring(0, index);
        ch = prefix.split('');
        ch.reverse();
        Gaddag.prototype.add(ch.join('') + separator + word.substring(index));
      }
    });

    ch = word.split('');
    ch.reverse();
    Gaddag.prototype.add(ch.join('') + separator + word.substring(word.length));
  };

  this.findWordsWithHook = function (hook) {
    var trie = Gaddag.prototype.getTrie(),
      starterNode = trie[hook],
      words = [];

    function dig(word, cur, direction) {
      var node, val, ch, part;
      _.each(cur, function (val, node) {
        ch = (node === separator || node === "$" ? '' : node);

        if (val === 0) {
          words.push(word + ch);

        } else {
          // nodes after this form the suffix
          if (node === separator) {
            direction = 'forward';
          }

          part = (direction === 'reverse' ? ch + word : word + ch);
          dig(part, val, direction);

        }

        // done with the previous subtree, reset direction to indicate we are in the prefix part of next subtree
        if (node === separator) {
          direction = 'reverse';
        }
      });
    }

    if (typeof starterNode === 'undefined') {
      return;
    }

    dig(hook, starterNode, 'reverse');
    return words;
  };

  this.findWordsWithRackAndHook = function (rack, hook) {
    var trie = Gaddag.prototype.getTrie(),
      words = [],
      h;

    /* To avoid recursing down duplicate characters more than once, sort the array and check whether we have already
     processed a letter before descending the subtree.
     */
    rack.sort();

    function findWordsRecurse(word, rack, hook, cur, direction) {
      var hookNode = cur[hook],
        hookCh,
        nodeKey,
        nodeVal,
        nodeCh;

      function processRack(word, rack, nodeKey, hookNode, direction) {
        var duplicate, newRack;

        _.each(rack, function (letter, index) {
          if (nodeKey === letter) {
            duplicate = (index > 0 ? (letter === rack[index - 1] ? true : false) : false);
            if (!duplicate) {
              newRack = rack.slice(0);
              newRack.splice(index, 1);
              findWordsRecurse(word, newRack, nodeKey, hookNode, direction);
            }
          }
        });
      }

      if (typeof hookNode === 'undefined') {
        return;
      }

      hookCh = (hook === separator || hook === "$" ? '' : hook);
      word = (direction === "reverse" ? hookCh + word : word + hookCh);

      _.each(hookNode, function (nodeVal, nodeKey) {
        nodeCh = (nodeKey === separator || nodeKey === "$" ? '' : nodeKey);

        // if we have reached the end of this subtree, add the word (+ last character) to output array
        if (nodeVal === 0) {
          if (!(nodeCh !== '' && rack.indexOf(nodeCh) === -1)) {
            words.push(word + nodeCh);
          }
        } else {
          // if this is the character separating the prefix, change direction and continue recursing
          if (nodeKey === separator) {
            findWordsRecurse(word, rack, separator, hookNode, 'forward');
          } else {
            // descend down the next subtree that is rooted at any letter in the rack (which is not a duplicate)
            processRack(word, rack, nodeKey, hookNode, direction);
          }
        }
      });
    }

    if (hook === '') {
      /*
        Each character in the rack acts as a hook with the remaining characters as the new rack.
      */

      while (rack.length > 1) {
        h = rack.shift();
        findWordsRecurse("", rack, h, trie, 'reverse');
      }
    } else {
      findWordsRecurse("", rack, hook, trie, 'reverse');
    }

    return _.uniq(words);
  };
}

// Inherit from Trie
Gaddag.prototype = new Trie();
