'use strict';

(function () {

  var dialog = document.querySelector('.setup');
  var dialogOpen = document.querySelector('.setup-open');
  var dialogClose = dialog.querySelector('.setup-close');
  var dialogHandle = dialog.querySelector('.upload');

  dialogOpen.addEventListener('click', function () {
    showDialog();
  });

  dialogOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, showDialog);
  });

  function onSuccess(response) {
    window.wizards = response;
    window.renderWizards(window.wizards);
  }

  function showDialog() {
    window.backend.load(onSuccess, window.util.onError);
    dialog.classList.remove('hidden');
    dialogClose.addEventListener('click', hideDialog);
    dialogClose.addEventListener('keydown', onDialogCloseEnterPress);
    document.addEventListener('keydown', onDialogEscPress);
    dialogHandle.addEventListener('mousedown', onMouseDown);
  }

  function hideDialog() {
    dialog.classList.add('hidden');
    dialogClose.removeEventListener('click', hideDialog);
    dialogClose.removeEventListener('keydown', onDialogCloseEnterPress);
    document.removeEventListener('keydown', onDialogEscPress);
    dialogHandle.removeEventListener('keydown', onMouseDown);
    dialog.style = '';
  }

  function onDialogEscPress(evt) {
    window.util.isEscEvent(evt, hideDialog);
  }

  function onDialogCloseEnterPress(evt) {
    window.util.isEnterEvent(evt, hideDialog);
  }

  function onMouseDown(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dialog.style.top = (dialog.offsetTop - shift.y) + 'px';
      dialog.style.left = (dialog.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (e) {
          e.preventDefault();
          dragged = false;
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
})();
