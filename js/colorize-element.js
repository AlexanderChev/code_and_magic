'use strict';

window.colorizeElement = function (element, colors, callback) {
  var color = window.util.getRandomItem(colors);
  callback(element, color);
};
