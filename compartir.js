/* ============================================================
   COMPARTIR: enlace de solo lectura, imagen, imprimir y copia.
   El enlace guarda SOLO los porcentajes (no las respuestas)
   dentro de la propia dirección: no hay servidor ni cuentas.
   ============================================================ */
(function () {
  "use strict";
  var h = UI.h;

  /* Cada escala = 2 caracteres en base 36 (0..100) */
  function codificar(test, r) {
    return Object.keys(test.escalas).map(function (k) {
      var v = Math.round(Motor.util.limitar(r.escalas[k].porcentaje, 0, 100));
      var s = v.toString(36);
      return s.length < 2 ? "0" + s : s;
    }).join("");
  }

  function decodificar(test, codigo) {
    var claves = Object.keys(test.escalas);
    if (!codigo || codigo.length !== claves.length * 2 || /[^0-9a-z]/.test(codigo)) return null;
    var min = test.rango[0], max = test.rango[1];
    var esc = {};
    for (var i = 0; i < claves.length; i++) {
      var v = parseInt(codigo.substr(i * 2, 2), 36);
      if (isNaN(v) || v > 100) return null;
      esc[claves[i]] = { clave: claves[i], n: 0, suma: 0, porcentaje: v,
        promedio: min + (v / 100) * (max - min) };
    }
    var r = { testId: test.id, fecha: Date.now(), escalas: esc, calidad: { avisos: [], confiable: true } };
    try { r.extra = test.calcular ? test.calcular(esc) : {}; } catch (e) { return null; }
    return r;
  }

  function enlace(test, r) {
    var base = location.href.split("#")[0];
    return base + "#/ver/" + test.id + "/" + codificar(test, r);
  }

  /* ---------- imagen para redes (canvas 1080x1350) ---------- */
  function lineas(ctx, texto, ancho) {
    var palabras = texto.split(" "), out = [], l = "";
    palabras.forEach(function (w) {
      var t = l ? l + " " + w : w;
      if (ctx.measureText(t).width > ancho && l) { out.push(l); l = w; } else l = t;
    });
    if (l) out.push(l);
    return out;
  }

  function filasImagen(test, r) {
    var filas = [];
    var ord = Motor.ordenarEscalas(r.escalas);
    if (test.id === "valores") {
      r.extra.orden.slice(0, 6).forEach(function (k) {
        filas.push({ t: test.escalas[k].nombre, v: r.escalas[k].porcentaje, c: test.escalas[k].color });
      });
    } else {
      ord.forEach(function (k) {
        filas.push({ t: test.escalas[k].nombre, v: r.escalas[k].porcentaje, c: test.escalas[k].color });
      });
    }
    return filas.slice(0, 7);
  }

  function titularImagen(test, r) {
    var tx = window.Textos[test.id] || {};
    if (test.id === "estilo") { var pf = tx.perfiles && tx.perfiles[r.extra.codigo]; return pf ? pf.nombre : r.extra.codigo; }
    if (test.id === "intereses") return "Código " + r.extra.codigo;
    if (test.id === "emocional") return "Global: " + Math.round(r.extra.total) + "%";
    if (test.id === "valores") return "Valores: " + r.extra.top.slice(0, 2).map(function (k) { return test.escalas[k].nombre; }).join(" y ");
    var o = Motor.ordenarEscalas(r.escalas);
    return test.escalas[o[0]].nombre + " y " + test.escalas[o[1]].nombre;
  }

  function dibujarImagen(test, r) {
    var W = 1080, H = 1350;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var ctx = cv.getContext("2d");
    var g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#14213d"); g.addColorStop(1, test.color);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255,255,255,0.07)"; ctx.beginPath(); ctx.arc(W - 120, 140, 260, 0, 7); ctx.fill();
    var fuente = '"Segoe UI", Roboto, Helvetica, Arial, sans-serif';
    ctx.fillStyle = "rgba(255,255,255,.8)"; ctx.font = "600 38px " + fuente;
    ctx.fillText(test.nombre.toUpperCase(), 80, 140);
    ctx.fillStyle = "#fff"; ctx.font = "800 84px " + fuente;
    lineas(ctx, titularImagen(test, r), W - 160).slice(0, 3).forEach(function (l, i) { ctx.fillText(l, 80, 260 + i * 96); });

    var filas = filasImagen(test, r), y0 = 560, alto = Math.min(100, 640 / Math.max(1, filas.length));
    filas.forEach(function (f, i) {
      var y = y0 + i * alto;
      ctx.fillStyle = "#fff"; ctx.font = "600 34px " + fuente; ctx.fillText(f.t, 80, y);
      ctx.fillStyle = "rgba(255,255,255,.2)"; rr(ctx, 80, y + 14, 920, 26, 13); ctx.fill();
      ctx.fillStyle = "#fff"; rr(ctx, 80, y + 14, Math.max(26, 920 * f.v / 100), 26, 13); ctx.fill();
      ctx.font = "700 30px " + fuente; ctx.textAlign = "right"; ctx.fillText(Math.round(f.v) + "%", 1000, y); ctx.textAlign = "left";
    });
    ctx.fillStyle = "rgba(255,255,255,.85)"; ctx.font = "500 32px " + fuente;
    ctx.fillText("Hacelo gratis, sin registro ni pagos:", 80, H - 130);
    ctx.font = "700 36px " + fuente; ctx.fillStyle = "#fff";
    ctx.fillText(window.CONFIG.nombre + " · " + location.host, 80, H - 78);
    return cv;
  }

  function rr(ctx, x, y, w, h2, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h2, r); ctx.arcTo(x + w, y + h2, x, y + h2, r);
    ctx.arcTo(x, y + h2, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  function guardarImagen(test, r) {
    try {
      var cv = dibujarImagen(test, r);
      cv.toBlob(function (b) {
        if (!b) { UI.aviso("No se pudo crear la imagen.", "error"); return; }
        var archivo = new File([b], "mi-resultado-" + test.id + ".png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [archivo] }) && navigator.share) {
          navigator.share({ files: [archivo], title: window.CONFIG.nombre }).catch(function () {});
        } else UI.descargar(archivo.name, b);
      }, "image/png");
    } catch (e) { UI.aviso("Tu navegador no pudo crear la imagen.", "error"); }
  }

  function textoPlano(test, r) {
    var l = [window.CONFIG.nombre + " · " + test.nombre, titularImagen(test, r), ""];
    Motor.ordenarEscalas(r.escalas).forEach(function (k) {
      l.push("• " + test.escalas[k].nombre + ": " + Math.round(r.escalas[k].porcentaje) + "%");
    });
    return l.join("\n");
  }

  /* ---------- panel de botones ---------- */
  function panel(test, r, opciones) {
    var cont = h("section", { clase: "bloque panel-compartir no-imprimir" }, h("h2", { texto: "Guardar y compartir" }));
    var fila = h("div", { clase: "botonera" });
    fila.appendChild(h("button", { clase: "btn btn-sec", texto: "Imprimir o guardar PDF", attrs: { type: "button" },
      on: { click: function () { window.print(); } } }));
    if (!opciones.soloLectura) {
      fila.appendChild(h("button", { clase: "btn btn-sec", texto: "Descargar imagen", attrs: { type: "button" },
        on: { click: function () { guardarImagen(test, r); } } }));
      fila.appendChild(h("button", { clase: "btn btn-sec", texto: "Copiar enlace", attrs: { type: "button" },
        on: { click: function () { UI.copiar(enlace(test, r), "Enlace copiado"); } } }));
      fila.appendChild(h("button", { clase: "btn btn-sec", texto: "Copiar como texto", attrs: { type: "button" },
        on: { click: function () { UI.copiar(textoPlano(test, r), "Texto copiado"); } } }));
    }
    cont.appendChild(fila);
    if (!opciones.soloLectura) {
      cont.appendChild(h("p", { clase: "mini", texto: "El enlace incluye solo tus porcentajes y lo abre cualquiera que lo reciba. No incluye tus respuestas ni tu nombre. Compartilo solo con quien quieras." }));
    }
    return cont;
  }

  window.Compartir = { panel: panel, codificar: codificar, decodificar: decodificar, enlace: enlace, imagen: dibujarImagen };
})();
