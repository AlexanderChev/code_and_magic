'use strict';
window.setup = document.querySelector('.setup');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var COUNT_WIZARDS = 4;

function getRandomItem(arr) {
  var index = Math.floor(Math.random() * arr.length);

  return arr[index];
}

function createDataWizards(count) {
  var data = [];
  for (var i = 0; i < count; i++) {
    data.push({
      name: getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SURNAMES),
      coatColor: getRandomItem(WIZARD_COAT_COLORS),
      eyesColor: getRandomItem(WIZARD_EYE_COLORS)
    });
  }

  return data;
}

function createWizardElement(wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var element = similarWizardTemplate.cloneNode(true);

  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return element;
}

function renderWizards() {
  var fragment = document.createDocumentFragment();
  var similarList = document.querySelector('.setup-similar-list');
  var dataWizards = createDataWizards(COUNT_WIZARDS);

  for (var i = 0; i < dataWizards.length; i++) {
    fragment.appendChild(createWizardElement(dataWizards[i]));
  }

  similarList.appendChild(fragment);
}

var blockSimilar = document.querySelector('.setup-similar');
var userNameInput = document.querySelector('.setup-user-name');

showBlockSimilar();

function showBlockSimilar() {
  renderWizards();
  blockSimilar.classList.remove('hidden');
}

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
  }
});

var userWizard = document.querySelector('.setup-player');
var userWizardCoat = userWizard.querySelector('.wizard-coat');
var userWizardEyes = userWizard.querySelector('.wizard-eyes');
var userWizardFireball = userWizard.querySelector('.setup-fireball-wrap');
var inputCoatColor = userWizard.querySelector('input[name="coat-color"]');
var inputEyesColor = userWizard.querySelector('input[name="eyes-color"]');
var inputFireballColor = userWizardFireball.querySelector('input[name="fireball-color"]');
var color;

userWizard.addEventListener('click', function (e) {
  var target = e.target;

  if (target.closest('.wizard-coat')) {
    color = getRandomItem(WIZARD_COAT_COLORS);
    userWizardCoat.style.fill = color;
    inputCoatColor.value = color;
  } else if (target.closest('.wizard-eyes')) {
    color = getRandomItem(WIZARD_EYE_COLORS);
    userWizardEyes.style.fill = color;
    inputEyesColor.value = color;
  } else if (target.closest('.setup-fireball-wrap')) {
    color = getRandomItem(WIZARD_FIREBALL_COLORS);
    userWizardFireball.style.backgroundColor = color;
    inputFireballColor.value = color;
  } else {
    return;
  }
});

var shopContainer = document.querySelector('.setup-artifacts-shop');
var artifactsContainer = document.querySelector('.setup-artifacts');
var draggedItem;

shopContainer.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target;

    evt.dataTransfer.setData('text/plain', evt.target.alt);
    artifactsContainer.style.outline = '2px solid red';
  }
});

shopContainer.addEventListener('dragend', function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    artifactsContainer.style.outline = 'none';
  }
});

artifactsContainer.addEventListener('dragstart', function (evt) {
  evt.preventDefault();
});

artifactsContainer.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});

artifactsContainer.addEventListener('drop', function (evt) {
  evt.target.style.backgroundColor = '';

  if (!evt.target.children.length) {
    evt.target.appendChild(draggedItem.cloneNode(true));
  }
  evt.preventDefault();
});

artifactsContainer.addEventListener('dragenter', function (evt) {
  evt.target.style.backgroundColor = 'yellow';
  evt.preventDefault();
});

artifactsContainer.addEventListener('dragleave', function (evt) {
  evt.target.style.backgroundColor = '';
  evt.preventDefault();
});
