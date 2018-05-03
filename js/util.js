'use strict';

window.util = function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var timer;

  return {
    isEscEvent: function (evt, callback) {
      if (evt.keyCode === KeyCode.ESC) {
        callback();
      }
    },

    isEnterEvent: function (evt, callback) {
      if (evt.keyCode === KeyCode.ENTER) {
        callback();
      }
    },

    getRandomItem: function (arr) {
      var index = Math.floor(Math.random() * arr.length);

      return arr[index];
    },

    removeElements: function (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    },

    onError: function (errorText) {
      var node = document.createElement('div');
      node.className = 'error';
      node.textContent = errorText;
      document.body.appendChild(node);

      setTimeout(function () {
        document.body.removeChild(node);
      }, 3000);
    },

    debounce: function (callback, duration) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback();
      }, duration);
    }
  };
}();
