document.addEventListener('DOMContentLoaded', function () {

  var botonArriba = document.querySelector('.boton-flotante--arriba');
  if (botonArriba) {
    botonArriba.addEventListener('click', function (evento) {
      evento.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var formularios = document.querySelectorAll('form[action*="web3forms"]');

  formularios.forEach(function (formulario) {
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();

      var boton = formulario.querySelector('button[type="submit"]');
      var textoOriginal = boton.textContent;
      var aviso = formulario.querySelector('.aviso-formulario');

      if (!aviso) {
        aviso = document.createElement('div');
        aviso.className = 'aviso-formulario alert mt-3 mb-0 d-none';
        aviso.setAttribute('role', 'alert');
        boton.insertAdjacentElement('afterend', aviso);
      }

      boton.disabled = true;
      boton.textContent = 'Enviando...';
      aviso.classList.add('d-none');

      fetch(formulario.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(formulario)
      })
        .then(function (respuesta) { return respuesta.json(); })
        .then(function (datos) {
          if (datos.success) {
            aviso.className = 'aviso-formulario alert alert-success mt-3 mb-0';
            aviso.textContent = '¡Gracias! Tu mensaje fue enviado correctamente.';
            formulario.reset();
          } else {
            aviso.className = 'aviso-formulario alert alert-danger mt-3 mb-0';
            aviso.textContent = 'No se pudo enviar. Revisa los datos e inténtalo de nuevo.';
          }
        })
        .catch(function () {
          aviso.className = 'aviso-formulario alert alert-danger mt-3 mb-0';
          aviso.textContent = 'Hubo un problema de conexión. Inténtalo de nuevo.';
        })
        .finally(function () {
          boton.disabled = false;
          boton.textContent = textoOriginal;
        });
    });
  });

});