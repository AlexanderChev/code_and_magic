'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#fff';
var SHADOW_X = 110;
var SHADOW_Y = 20;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = '#000';

var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var USER_CURRENT_NAME = 'Вы';
var USER_CURRENT_COLOR = 'rgba(255, 0, 0, 1)';

// Отступ от краев прямоугольника
var indent = 30;

// Отрисовка многоугольников
function renderRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// Печать текста
function renderText(ctx, text, x, y, color, font) {
  ctx.fillStyle = color || TEXT_COLOR;
  ctx.font = font || TEXT_FONT;
  ctx.fillText(text, x, y);
}

// Находит максимальный элемент
function getMaxElement(arr) {
  var max = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}

// Создает гистограмму
function renderBar(ctx, names, times, x, y) {
  var maxTime = getMaxElement(times);
  var step = BAR_MAX_HEIGHT / maxTime;
  var colorRect;
  var initialX;
  var initialY;
  var barHeight;

  for (var i = 0; i < names.length; i++) {
    initialX = x + indent + (BAR_WIDTH + BAR_GAP) * i;
    initialY = y + CLOUD_HEIGHT - indent;
    barHeight = Math.round(times[i] * step);
    colorRect = names[i] === USER_CURRENT_NAME ? USER_CURRENT_COLOR : 'rgba(0, 0, 255, ' + Math.random() + ')';

    renderText(ctx, names[i], initialX, initialY + indent / 2);
    renderText(ctx, Math.round(times[i]), initialX, initialY - barHeight - indent / 6);
    renderRect(ctx, initialX, initialY, BAR_WIDTH, -barHeight, colorRect);
  }
}

window.renderStatistics = function (ctx, names, times) {
  renderRect(ctx, SHADOW_X, SHADOW_Y, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
  renderRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);
  renderText(ctx, 'Ура Вы победили!', CLOUD_X + indent, CLOUD_Y + indent);
  renderText(ctx, 'Список результатов:', CLOUD_X + indent, CLOUD_Y + indent * 2);
  renderBar(ctx, names, times, CLOUD_X, CLOUD_Y);
};
