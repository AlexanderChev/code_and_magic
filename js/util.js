'use strict';

window.util = function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, callback) {
      if (evt.keyCode === ESC_KEYCODE) {
        callback();
      }
    },

    isEnterEvent: function (evt, callback) {
      if (evt.keyCode === ENTER_KEYCODE) {
        callback();
      }
    },

    getRandomItem: function (arr) {
      var index = Math.floor(Math.random() * arr.length);

      return arr[index];
    }
  };
}();
