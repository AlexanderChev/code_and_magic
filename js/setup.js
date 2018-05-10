'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var COUNT_WIZARDS = 4;

  var player = document.querySelector('.setup-player');
  var coat = player.querySelector('.wizard-coat');
  var eyes = player.querySelector('.wizard-eyes');
  var fireball = player.querySelector('.setup-fireball-wrap');
  var inputCoatColor = document.querySelector('input[name="coat-color"]');
  var inputEyesColor = document.querySelector('input[name="eyes-color"]');
  var inputFireballColor = document.querySelector('input[name="fireball-color"]');
  var coatColor;
  var eyesColor;
  var DEBOUNCE_TIMEOUT = 500;

  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  function updateWizards() {
    var wizards = window.wizards;
    renderWizards(wizards.slice().sort(function (a, b) {
      var rankDiff = getRank(b) - getRank(a);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(a) - wizards.indexOf(b);
      }

      return rankDiff;
    }));
  }

  function fillCoat(element, color) {
    element.style.fill = color;
    inputCoatColor.value = color;
    coatColor = color;
    window.util.debounce(updateWizards, DEBOUNCE_TIMEOUT);
  }

  function fillEyes(element, color) {
    element.style.fill = color;
    inputEyesColor.value = color;
    eyesColor = color;
    window.util.debounce(updateWizards, DEBOUNCE_TIMEOUT);
  }

  function changeFireballBackground(element, color) {
    element.style.backgroundColor = color;
    inputFireballColor.value = color;
  }

  // Изменеие цвета

  player.addEventListener('click', function (evt) {
    var elem = evt.target;

    if (elem.closest('.wizard-coat')) {
      window.colorizeElement(coat, WIZARD_COAT_COLORS, fillCoat);
    } else if (elem.closest('.wizard-eyes')) {
      window.colorizeElement(eyes, WIZARD_EYE_COLORS, fillEyes);
    } else if (elem.closest('.setup-fireball-wrap')) {
      window.colorizeElement(fireball, WIZARD_FIREBALL_COLORS, changeFireballBackground);
    } else {
      return;
    }
  });

  // Создание магов
  function createWizardElement(wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var element = similarWizardTemplate.cloneNode(true);

    element.querySelector('.setup-similar-label').textContent = wizard.name;
    element.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    element.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return element;
  }


  function renderWizards(wizards) {
    var fragment = document.createDocumentFragment();
    var similarList = document.querySelector('.setup-similar-list');
    var similarBlock = document.querySelector('.setup-similar');

    for (var i = 0; i < COUNT_WIZARDS; i++) {
      fragment.appendChild(createWizardElement(wizards[i]));
    }

    window.util.removeElements(similarList);
    similarList.appendChild(fragment);

    if (similarBlock.classList.contains('hidden')) {
      similarBlock.classList.remove('hidden');
    }
  }

  var form = document.querySelector('.setup-wizard-form');
  var userNameInput = document.querySelector('.setup-user-name');

  function onSuccessSave() {
    document.querySelector('.setup').classList.add('hidden');
  }

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccessSave, window.util.onError);
    evt.preventDefault();
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
    }
  });


  // Перетаскивание предметов

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
    if (evt.target.classList.contains('setup-artifacts-cell')) {
      evt.target.style.backgroundColor = 'yellow';
    }
    evt.preventDefault();
  });

  artifactsContainer.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  window.renderWizards = renderWizards;
})();
