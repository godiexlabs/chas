// Web de Chas · pregunta de prueba de la portada y año del pie. Sin dependencias.
(function () {
  'use strict';

  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });

  // Lista de espera: llama a la función join_waitlist de Supabase con la clave anon (pública).
  var cfg = window.CHAS_WAITLIST || {};
  var source = (new URLSearchParams(location.search).get('s') || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40) || null;
  var MSG = {
    ok: '¡Apuntado! Te avisamos el día del lanzamiento.',
    invalid_email: 'Ese correo no parece válido. Revísalo.',
    consent_required: 'Marca la casilla para que podamos avisarte.',
    rate_limited: 'Hay mucha gente apuntándose. Prueba en un minuto.',
    error: 'No hemos podido apuntarte. Prueba de nuevo en un rato.'
  };
  document.querySelectorAll('[data-waitlist]').forEach(function (form) {
    var msg = form.querySelector('.wait-msg');
    var btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var email = form.elements.email.value.trim();
      if (form.elements.website.value) return;               // trampa para bots
      if (!form.elements.consent.checked) { msg.textContent = MSG.consent_required; return; }
      if (!form.elements.email.checkValidity()) { msg.textContent = MSG.invalid_email; return; }
      if (!cfg.url || !cfg.key) { msg.textContent = MSG.error; return; }
      btn.disabled = true; msg.textContent = '';
      fetch(cfg.url + '/rest/v1/rpc/join_waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: cfg.key, Authorization: 'Bearer ' + cfg.key },
        body: JSON.stringify({ p_email: email, p_consent: true, p_source: source })
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (b) { return { ok: r.ok, body: b }; });
      }).then(function (res) {
        if (res.ok) { msg.textContent = MSG.ok; form.classList.add('is-done'); return; }
        var m = String((res.body && res.body.message) || '');
        msg.textContent = MSG[m] || MSG.error;
        btn.disabled = false;
      }).catch(function () { msg.textContent = MSG.error; btn.disabled = false; });
    });
  });

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
