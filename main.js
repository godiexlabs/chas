// Web de Chas · pregunta de prueba de la portada y año del pie. Sin dependencias.
(function () {
  'use strict';

  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });

  var quiz = document.querySelector('[data-quiz]');
  if (!quiz) return;

  var correct = quiz.getAttribute('data-answer');
  var buttons = Array.prototype.slice.call(quiz.querySelectorAll('.opt'));
  var result = quiz.querySelector('.quiz-result');
  var message = quiz.querySelector('[data-message]');
  var again = quiz.querySelector('[data-again]');

  function pick(button) {
    var chosen = button.getAttribute('data-value');
    buttons.forEach(function (b) {
      var value = b.getAttribute('data-value');
      var mark = b.querySelector('.mark');
      b.disabled = true;
      if (value === correct) {
        b.classList.add('is-right');
        mark.textContent = '✓';
      } else if (value === chosen) {
        b.classList.add('is-wrong');
        mark.textContent = '✕';
      } else {
        b.classList.add('is-off');
      }
    });
    message.textContent = chosen === correct
      ? '¡Correcto! Así se empieza la racha.'
      : 'Casi. Era ' + correct + ': mañana, otra oportunidad.';
    result.hidden = false;
    again.focus();
  }

  function reset() {
    buttons.forEach(function (b) {
      b.disabled = false;
      b.classList.remove('is-right', 'is-wrong', 'is-off');
      b.querySelector('.mark').textContent = '';
    });
    result.hidden = true;
    buttons[0].focus();
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { pick(b); });
  });
  again.addEventListener('click', reset);
})();
