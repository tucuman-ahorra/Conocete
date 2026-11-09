/* ============================================================
   VISTA: responder un test, de a pocas preguntas por pantalla.
   Guarda cada respuesta apenas se elige (se puede retomar).
   ============================================================ */
(function () {
  "use strict";
  var h = UI.h;

  function render(cont, testId) {
    var test = Motor.obtener(testId);
    if (!test) { UI.ir("/"); return; }
    var prog = Motor.progresoDe(testId) || Motor.iniciar(testId);
    var lista = Motor.ordenDePreguntas(test, prog);
    var porPagina = Math.max(3, window.CONFIG.preguntasPorPagina || 8);
    var paginas = Math.ceil(lista.length / porPagina);
    var pagina = Math.min(prog.pagina || 0, paginas - 1);

    UI.vaciar(cont);
    var raiz = h("section", { clase: "vista vista-preguntas", attrs: { "aria-label": test.nombre } });
    cont.appendChild(raiz);

    var cabecera = h("div", { clase: "q-cabecera" });
    var barra = h("div", { clase: "progreso", attrs: { role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100" } },
      h("div", { clase: "progreso-relleno", estilo: { "--color": test.color } }));
    var estado = h("div", { clase: "q-estado", attrs: { "aria-live": "polite" } });
    cabecera.appendChild(h("div", { clase: "q-fila" },
      h("a", { clase: "volver", texto: "← Salir", attrs: { href: "#/test/" + testId } }),
      h("strong", { texto: test.nombre })));
    cabecera.appendChild(barra);
    cabecera.appendChild(estado);
    raiz.appendChild(cabecera);

    var caja = h("div", { clase: "q-caja" });
    raiz.appendChild(caja);
    var nav = h("div", { clase: "q-nav" });
    raiz.appendChild(nav);

    function actualizarProgreso() {
      var p = Motor.progresoDe(testId);
      var n = Motor.cantidadRespondidas(test, p);
      var pct = Math.round((n / test.items.length) * 100);
      barra.setAttribute("aria-valuenow", String(pct));
      barra.firstChild.style.width = pct + "%";
      estado.textContent = "Pregunta " + Math.min(n + 1, test.items.length) + " de " + test.items.length +
        " · Página " + (pagina + 1) + " de " + paginas;
    }

    function dibujarPagina() {
      UI.vaciar(caja); UI.vaciar(nav);
      Motor.guardarPagina(testId, pagina);
      var desde = pagina * porPagina;
      var tramo = lista.slice(desde, desde + porPagina);
      var actual = Motor.progresoDe(testId);

      if (pagina === 0 && test.instruccion) {
        caja.appendChild(h("p", { clase: "q-instruccion", texto: test.instruccion }));
      }

      tramo.forEach(function (it, i) {
        caja.appendChild(pregunta(it, desde + i + 1, actual.respuestas[it.id]));
      });

      var ultima = pagina === paginas - 1;
      var atras = h("button", { clase: "btn btn-sec", texto: "Atrás", attrs: { type: "button" },
        on: { click: function () { if (pagina > 0) { pagina--; dibujarPagina(); UI.arriba(); } else UI.ir("/test/" + testId); } } });
      var sig = h("button", { clase: "btn btn-pri", texto: ultima ? "Ver mi resultado" : "Siguiente", attrs: { type: "button" },
        on: { click: avanzar } });
      nav.appendChild(atras);
      nav.appendChild(sig);
      actualizarProgreso();
    }

    function pregunta(it, numero, valor) {
      var grupo = h("div", { clase: "pregunta" + (valor != null ? " respondida" : ""), id: "q-" + it.id,
        attrs: { role: "radiogroup", "aria-labelledby": "t-" + it.id } });
      grupo.appendChild(h("p", { clase: "pregunta-texto", id: "t-" + it.id },
        h("span", { clase: "pregunta-num", texto: numero + "." }), " " + it.texto));
      var escala = h("div", { clase: "escala escala-" + test.opciones.length });
      test.opciones.forEach(function (op) {
        var b = h("button", { clase: "opcion" + (valor === op.v ? " activa" : ""), attrs: {
            type: "button", role: "radio", "aria-checked": valor === op.v ? "true" : "false",
            "aria-label": op.t, title: op.t, "data-v": op.v },
          on: { click: function () { elegir(it, grupo, op.v); } } },
          h("span", { clase: "opcion-punto", texto: String(op.v) }));
        escala.appendChild(b);
      });
      grupo.appendChild(escala);
      var pies = h("div", { clase: "escala-pie" },
        h("span", { texto: test.opciones[0].t }),
        h("span", { texto: test.opciones[test.opciones.length - 1].t }));
      grupo.appendChild(pies);
      grupo.appendChild(h("p", { clase: "pregunta-sel", texto: valor != null ? etiqueta(valor) : "" }));
      return grupo;
    }

    function etiqueta(v) {
      var o = test.opciones.filter(function (x) { return x.v === v; })[0];
      return o ? o.t : "";
    }

    function elegir(it, grupo, v) {
      Motor.responder(testId, it.id, v);
      grupo.classList.add("respondida");
      grupo.classList.remove("falta");
      Array.prototype.forEach.call(grupo.querySelectorAll(".opcion"), function (b) {
        var on = Number(b.getAttribute("data-v")) === v;
        b.classList.toggle("activa", on);
        b.setAttribute("aria-checked", on ? "true" : "false");
      });
      grupo.querySelector(".pregunta-sel").textContent = etiqueta(v);
      actualizarProgreso();
      // pasa solo a la siguiente pregunta sin respuesta de la página
      var sig = grupo.nextElementSibling;
      while (sig && !(sig.classList && sig.classList.contains("pregunta") && !sig.classList.contains("respondida"))) sig = sig.nextElementSibling;
      if (sig) {
        setTimeout(function () {
          try { sig.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) { sig.scrollIntoView(); }
        }, 180);
      }
    }

    function faltantes() {
      var desde = pagina * porPagina;
      var actual = Motor.progresoDe(testId);
      return lista.slice(desde, desde + porPagina).filter(function (it) { return actual.respuestas[it.id] == null; });
    }

    function avanzar() {
      var f = faltantes();
      if (f.length) {
        f.forEach(function (it) { var g = document.getElementById("q-" + it.id); if (g) g.classList.add("falta"); });
        var primero = document.getElementById("q-" + f[0].id);
        if (primero) { try { primero.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) { primero.scrollIntoView(); } }
        UI.aviso("Te faltan " + f.length + (f.length === 1 ? " respuesta" : " respuestas") + " en esta página.", "error");
        return;
      }
      if (pagina < paginas - 1) { pagina++; dibujarPagina(); UI.arriba(); return; }
      var r = Motor.finalizar(testId);
      if (r) UI.ir("/resultado/" + testId);
    }

    // atajos de teclado: teclas 1..5 responden la pregunta que está en foco o la primera sin responder
    function teclado(e) {
      if (!document.body.contains(raiz)) { document.removeEventListener("keydown", teclado); return; }
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      var n = parseInt(e.key, 10);
      if (!n || n < 1 || n > test.opciones.length) return;
      var enFoco = document.activeElement && document.activeElement.closest ? document.activeElement.closest(".pregunta") : null;
      var objetivo = enFoco || raiz.querySelector(".pregunta:not(.respondida)");
      if (!objetivo) return;
      var boton = objetivo.querySelector('.opcion[data-v="' + n + '"]');
      if (boton) boton.click();
    }
    document.addEventListener("keydown", teclado);

    dibujarPagina();
  }

  window.VistaPreguntas = { render: render };
})();
