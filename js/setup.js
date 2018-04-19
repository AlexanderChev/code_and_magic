'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var COUNT_WIZARDS = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var modal = document.querySelector('.setup');
var modalOpen = document.querySelector('.setup-open');
var modalClose = modal.querySelector('.setup-close');
var blockSimilar = modal.querySelector('.setup-similar');
var userNameInput = modal.querySelector('.setup-user-name');

showBlockSimilar();

function showBlockSimilar() {
  renderWizards();
  blockSimilar.classList.remove('hidden');
}

function onModalEscPress(e) {
  if (e.keyCode === ESC_KEYCODE) {
    hideModal();
  }
}

function onModalEnterPress(e) {
  if (e.keyCode === ENTER_KEYCODE) {
    hideModal();
  }
}

function showModal() {
  modal.classList.remove('hidden');
  modalClose.addEventListener('click', hideModal);
  modalClose.addEventListener('keydown', onModalEnterPress);
  document.addEventListener('keydown', onModalEscPress);
}

function hideModal() {
  modal.classList.add('hidden');
  modalClose.removeEventListener('click', hideModal);
  modalClose.removeEventListener('keydown', hideModal);
  document.removeEventListener('keydown', onModalEscPress);
}

modalOpen.addEventListener('click', function () {
  showModal();
});

modalOpen.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    showModal();
  }
});

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
