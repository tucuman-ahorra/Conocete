/* ============================================================
   UI BASE: utilidades de DOM, avisos, modales y navegación.
   ============================================================ */
(function () {
  "use strict";

  /* h(tag, props, ...hijos): crea un elemento sin usar innerHTML con datos.
     props: clase, id, texto, attrs{}, on{evento: fn}, estilo */
  function h(tag, props) {
    var el = document.createElement(tag);
    props = props || {};
    if (props.clase) el.className = props.clase;
    if (props.id) el.id = props.id;
    if (props.texto != null) el.textContent = props.texto;
    if (props.attrs) Object.keys(props.attrs).forEach(function (k) {
      if (props.attrs[k] != null && props.attrs[k] !== false) el.setAttribute(k, props.attrs[k] === true ? "" : props.attrs[k]);
    });
    if (props.on) Object.keys(props.on).forEach(function (k) { el.addEventListener(k, props.on[k]); });
    if (props.estilo) Object.keys(props.estilo).forEach(function (k) { el.style.setProperty(k, props.estilo[k]); });
    for (var i = 2; i < arguments.length; i++) agregar(el, arguments[i]);
    return el;
  }

  function agregar(el, hijo) {
    if (hijo == null || hijo === false) return;
    if (Array.isArray(hijo)) { hijo.forEach(function (x) { agregar(el, x); }); return; }
    if (typeof hijo === "string" || typeof hijo === "number") { el.appendChild(document.createTextNode(String(hijo))); return; }
    el.appendChild(hijo);
  }

  // inserta SVG generado por Graficos (ya escapado)
  function svg(codigo, clase) {
    var d = document.createElement("div");
    d.className = "svg-wrap" + (clase ? " " + clase : "");
    d.innerHTML = codigo;
    return d;
  }

  function vaciar(el) { while (el.firstChild) el.removeChild(el.firstChild); }

  function ir(ruta) { if (location.hash === "#" + ruta) window.dispatchEvent(new Event("hashchange")); else location.hash = ruta; }

  function arriba(suave) {
    try { window.scrollTo({ top: 0, behavior: suave ? "smooth" : "auto" }); } catch (e) { window.scrollTo(0, 0); }
  }

  /* ---------- aviso corto (toast) ---------- */
  var toastTimer = null;
  function aviso(texto, tipo) {
    var cont = document.getElementById("avisos");
    if (!cont) return;
    vaciar(cont);
    var t = h("div", { clase: "aviso aviso-" + (tipo || "info"), texto: texto, attrs: { role: "status" } });
    cont.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { vaciar(cont); }, 3600);
  }

  /* ---------- confirmación propia (sin confirm()) ---------- */
  function confirmar(titulo, texto, textoOk, alAceptar, peligro) {
    var fondo = h("div", { clase: "modal-fondo" });
    var caja = h("div", { clase: "modal", attrs: { role: "dialog", "aria-modal": "true", "aria-label": titulo } },
      h("h3", { texto: titulo }),
      h("p", { texto: texto }),
      h("div", { clase: "modal-acciones" },
        h("button", { clase: "btn btn-sec", texto: "Cancelar", on: { click: cerrar } }),
        h("button", { clase: "btn " + (peligro ? "btn-peligro" : "btn-pri"), texto: textoOk, on: { click: function () { cerrar(); alAceptar(); } } })
      )
    );
    fondo.appendChild(caja);
    fondo.addEventListener("click", function (e) { if (e.target === fondo) cerrar(); });
    function tecla(e) { if (e.key === "Escape") cerrar(); }
    function cerrar() { document.removeEventListener("keydown", tecla); if (fondo.parentNode) fondo.parentNode.removeChild(fondo); }
    document.addEventListener("keydown", tecla);
    document.body.appendChild(fondo);
    var b = caja.querySelector("button"); if (b) b.focus();
  }

  /* ---------- formato de fecha ---------- */
  function fechaLarga(ms) {
    try {
      return new Date(ms).toLocaleDateString(window.CONFIG.idioma || "es-AR", { day: "numeric", month: "long", year: "numeric" });
    } catch (e) { return new Date(ms).toISOString().slice(0, 10); }
  }

  function minutosTexto(n) { return n + (n === 1 ? " minuto" : " minutos"); }

  /* ---------- descargar texto/archivo ---------- */
  function descargar(nombre, contenido, tipo) {
    var blob = contenido instanceof Blob ? contenido : new Blob([contenido], { type: tipo || "text/plain" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = nombre;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); if (a.parentNode) a.parentNode.removeChild(a); }, 400);
  }

  /* ---------- copiar al portapapeles ---------- */
  function copiar(texto, ok) {
    function respaldo() {
      var t = document.createElement("textarea");
      t.value = texto; t.setAttribute("readonly", "");
      t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      var listo = false;
      try { listo = document.execCommand("copy"); } catch (e) { listo = false; }
      document.body.removeChild(t);
      aviso(listo ? (ok || "Copiado") : "No se pudo copiar. Copialo a mano.", listo ? "ok" : "error");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(function () { aviso(ok || "Copiado", "ok"); }, respaldo);
    } else respaldo();
  }

  window.UI = { h: h, svg: svg, vaciar: vaciar, ir: ir, arriba: arriba, aviso: aviso,
                confirmar: confirmar, fechaLarga: fechaLarga, minutosTexto: minutosTexto,
                descargar: descargar, copiar: copiar };
})();
