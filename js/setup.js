'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var COUNT_WIZARDS = 4;

var modal = document.querySelector('.setup');
var modalOpen = document.querySelector('.setup-open');
var modalClose = document.querySelector('.setup-close');
var blockSimilar = document.querySelector('.setup-similar');


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

function showBlockSimilar() {
  renderWizards();
  blockSimilar.classList.remove('hidden');
}

function showModal() {
  modal.classList.remove('hidden');
  modalClose.addEventListener('click', hideModal);
}

function hideModal() {
  modal.classList.add('hidden');
  modalClose.removeEventListener('click', hideModal);
}

modalOpen.addEventListener('click', function (e) {
  e.preventDefault();
  showModal();
  showBlockSimilar();
});
