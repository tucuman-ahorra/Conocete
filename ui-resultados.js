/* ============================================================
   VISTA: resultados de cada test (gratis y completos).
   render(cont, testId, resultado, opciones{soloLectura})
   ============================================================ */
(function () {
  "use strict";
  var h = UI.h;
  var T = function () { return window.Textos; };

  function p(txt, clase) { return h("p", { clase: clase || "", texto: txt }); }
  function lista(items, clase) {
    if (typeof items === "string") items = [items];
    return h("ul", { clase: "lista-puntos " + (clase || "") }, (items || []).map(function (t) { return h("li", { texto: t }); }));
  }
  function tarjeta(titulo, hijos, color, clase) {
    var c = h("article", { clase: "tarjeta " + (clase || ""), estilo: color ? { "--color": color } : {} });
    if (titulo) c.appendChild(h("h3", { texto: titulo }));
    [].concat(hijos || []).forEach(function (x) { c.appendChild(x); });
    return c;
  }
  function seccion(titulo, sub) {
    var s = h("section", { clase: "bloque" });
    if (titulo) s.appendChild(h("h2", { texto: titulo }));
    if (sub) s.appendChild(p(sub, "sub"));
    return s;
  }
  function insignia(texto, color) {
    return h("span", { clase: "insignia", texto: texto, estilo: color ? { "--color": color } : {} });
  }

  /* ---------- cabecera común ---------- */
  function cabecera(test, r, tituloGrande, sub) {
    var c = h("header", { clase: "res-cabecera", estilo: { "--color": test.color } },
      h("p", { clase: "res-etiqueta", texto: test.nombre }),
      h("h1", { texto: tituloGrande }));
    if (sub) c.appendChild(p(sub, "res-sub"));
    c.appendChild(p("Realizado el " + UI.fechaLarga(r.fecha), "res-fecha"));
    return c;
  }

  function avisosCalidad(r) {
    if (!r.calidad || r.calidad.confiable) return null;
    var caja = h("div", { clase: "nota nota-aviso", attrs: { role: "note" } },
      h("strong", { texto: "Una observación sobre tus respuestas" }));
    caja.appendChild(lista(r.calidad.avisos));
    caja.appendChild(p("Podés repetir el test con calma cuando quieras. Esto no cambia nada de lo que ves acá, solo te avisa que el resultado podría ser menos preciso."));
    return caja;
  }

  function leyenda(txt) { return h("p", { clase: "leyenda", texto: txt }); }

  /* ---------- BIG FIVE ---------- */
  function bigfive(test, r, raiz) {
    var tx = T().bigfive;
    var claves = Object.keys(test.escalas);
    var ord = Motor.ordenarEscalas(r.escalas);
    raiz.appendChild(cabecera(test, r, "Tus cinco rasgos",
      "Tus rasgos más marcados: " + test.escalas[ord[0]].nombre + " y " + test.escalas[ord[1]].nombre + "."));
    var av = avisosCalidad(r); if (av) raiz.appendChild(av);
    raiz.appendChild(p(tx.intro, "intro"));

    var s1 = seccion("Tu perfil en un vistazo");
    s1.appendChild(UI.svg(Graficos.radar(claves.map(function (k) {
      return { etiqueta: test.escalas[k].nombre.split(" ")[0], valor: r.escalas[k].porcentaje, color: test.escalas[k].color };
    }), { titulo: "Radar de los cinco rasgos" })));
    s1.appendChild(UI.svg(Graficos.bipolar(claves.map(function (k) {
      return { izq: test.escalas[k].polo[0], der: test.escalas[k].polo[1], titulo: test.escalas[k].nombre,
        valor: r.escalas[k].porcentaje, color: test.escalas[k].color,
        nota: Math.round(r.escalas[k].porcentaje) + "%" };
    }), { titulo: "Posición en cada rasgo" })));
    s1.appendChild(leyenda("El porcentaje indica dónde te ubicás entre los dos extremos. Es una autoevaluación, no una comparación con otras personas."));
    raiz.appendChild(s1);

    var s2 = seccion("Rasgo por rasgo");
    ord.forEach(function (k) {
      var e = r.escalas[k];
      var niv = Motor.nivelSimple(e.porcentaje);
      var t = tx[k][niv];
      var c = tarjeta(null, [], test.escalas[k].color, "tarjeta-rasgo");
      c.appendChild(h("div", { clase: "tarjeta-top" },
        h("div", {}, h("p", { clase: "mini", texto: test.escalas[k].nombre + " · " + Motor.nivelDe(e.porcentaje) }),
          h("h3", { texto: t.titulo })),
        h("div", { clase: "num-grande", texto: Math.round(e.porcentaje) + "%" })));
      c.appendChild(p(t.resumen, "destacado"));
      c.appendChild(p(t.detalle));
      c.appendChild(h("h4", { texto: "Tus fortalezas" })); c.appendChild(lista(t.fortalezas, "verde"));
      c.appendChild(h("h4", { texto: "A tener en cuenta" })); c.appendChild(lista(t.cuidado, "ambar"));
      c.appendChild(h("h4", { texto: "Consejos" })); c.appendChild(lista(t.consejos));
      c.appendChild(p(test.escalas[k].corta + " Incluye: " + test.escalas[k].facetas + ".", "mini"));
      s2.appendChild(c);
    });
    raiz.appendChild(s2);

    var niveles = {};
    claves.forEach(function (k) { niveles[k] = Motor.nivelSimple(r.escalas[k].porcentaje); });
    var coinc = (tx.combos || []).filter(function (c) {
      return Object.keys(c.si).every(function (k) { return niveles[k] === c.si[k]; });
    });
    if (coinc.length) {
      var s3 = seccion("Cómo se combinan tus rasgos");
      coinc.forEach(function (c) { s3.appendChild(tarjeta(null, [p(c.texto)], null, "tarjeta-combo")); });
      raiz.appendChild(s3);
    }
  }

  /* ---------- INTERESES ---------- */
  function intereses(test, r, raiz) {
    var tx = T().intereses;
    var cod = r.extra.codigo;
    raiz.appendChild(cabecera(test, r, "Tu código: " + cod,
      cod.split("").map(function (k) { return test.escalas[k].nombre; }).join(" · ")));
    var av = avisosCalidad(r); if (av) raiz.appendChild(av);
    raiz.appendChild(p(tx.intro, "intro"));

    var codigoVista = h("div", { clase: "codigo-letras" }, cod.split("").map(function (k) {
      return h("span", { clase: "letra", texto: k, estilo: { "--color": test.escalas[k].color } });
    }));
    raiz.appendChild(codigoVista);

    var s1 = seccion("Tus seis áreas de interés");
    var orden = r.extra.orden;
    s1.appendChild(UI.svg(Graficos.radar(Object.keys(test.escalas).map(function (k) {
      return { etiqueta: test.escalas[k].nombre, valor: r.escalas[k].porcentaje, color: test.escalas[k].color };
    }), { titulo: "Radar de intereses RIASEC", margen: 62 })));
    s1.appendChild(UI.svg(Graficos.barras(orden.map(function (k) {
      return { etiqueta: test.escalas[k].nombre, valor: r.escalas[k].porcentaje, color: test.escalas[k].color };
    }), { titulo: "Intereses ordenados" })));
    raiz.appendChild(s1);

    var par = cod.slice(0, 2), parInv = cod[1] + cod[0];
    var textoPar = (tx.pares || {})[par] || (tx.pares || {})[parInv];
    if (textoPar) {
      var sp = seccion("Tus dos áreas principales combinadas");
      sp.appendChild(tarjeta(par[0] + " + " + par[1], [p(textoPar)], test.escalas[par[0]].color));
      raiz.appendChild(sp);
    }

    var s2 = seccion("Tus tres áreas, en detalle");
    cod.split("").forEach(function (k, i) {
      var t = tx.tipos[k];
      var c = tarjeta(null, [], test.escalas[k].color);
      c.appendChild(h("div", { clase: "tarjeta-top" },
        h("div", {}, h("p", { clase: "mini", texto: "Interés n.º " + (i + 1) }), h("h3", { texto: t.titulo })),
        h("div", { clase: "num-grande", texto: Math.round(r.escalas[k].porcentaje) + "%" })));
      c.appendChild(p(t.resumen, "destacado"));
      c.appendChild(p(t.detalle));
      c.appendChild(h("h4", { texto: "Entornos donde suelen sentirse bien" })); c.appendChild(lista(t.entornos));
      c.appendChild(h("h4", { texto: "Ocupaciones para explorar" }));
      c.appendChild(h("div", { clase: "chips" }, (t.ocupaciones || []).map(function (o) { return insignia(o, test.escalas[k].color); })));
      s2.appendChild(c);
    });
    raiz.appendChild(s2);

    var resto = orden.slice(3);
    var s3 = seccion("Tus áreas menos marcadas", "Que un área puntúe bajo no significa que no puedas hacerla: solo que hoy te atrae menos.");
    resto.forEach(function (k) {
      s3.appendChild(tarjeta(test.escalas[k].nombre + " · " + Math.round(r.escalas[k].porcentaje) + "%", [p(test.escalas[k].corta)], test.escalas[k].color, "tarjeta-chica"));
    });
    raiz.appendChild(s3);
  }

  /* ---------- ESTILO (16 perfiles propios) ---------- */
  function estilo(test, r, raiz) {
    var tx = T().estilo;
    var perfil = tx.perfiles[r.extra.codigo];
    raiz.appendChild(cabecera(test, r, perfil ? perfil.nombre : r.extra.codigo, "Perfil " + r.extra.codigo));
    var av = avisosCalidad(r); if (av) raiz.appendChild(av);
    raiz.appendChild(p(tx.intro, "intro"));
    raiz.appendChild(h("div", { clase: "nota" }, h("strong", { texto: "Importante: " }), tx.advertencia));

    var claves = Object.keys(test.escalas);
    var s1 = seccion("Tus cuatro preferencias");
    s1.appendChild(UI.svg(Graficos.bipolar(claves.map(function (k) {
      var e = test.escalas[k];
      return { izq: e.polos[0], der: e.polos[1], titulo: e.nombre,
        valor: 100 - r.escalas[k].porcentaje, color: e.color,
        nota: r.extra.dim[k].fuerza + "% hacia " + e.polos[r.extra.dim[k].polo].toLowerCase() };
    }), { titulo: "Preferencias del estilo" })));
    claves.forEach(function (k) {
      var e = test.escalas[k], d = r.extra.dim[k];
      s1.appendChild(tarjeta(e.nombre + ": " + e.polos[d.polo], [p(tx.dimensiones[k][d.polo]),
        p(d.fuerza < 25 ? "Tu preferencia es suave: según la situación podés moverte con comodidad hacia el otro lado." :
          d.fuerza > 60 ? "Tu preferencia es muy clara." : "Tu preferencia es moderada.", "mini")], e.color, "tarjeta-chica"));
    });
    raiz.appendChild(s1);

    if (perfil) {
      var s2 = seccion(perfil.nombre);
      var c = tarjeta(null, [], test.color);
      c.appendChild(p(perfil.resumen, "destacado"));
      c.appendChild(p(perfil.detalle));
      c.appendChild(h("h4", { texto: "Fortalezas" })); c.appendChild(lista(perfil.fortalezas, "verde"));
      c.appendChild(h("h4", { texto: "A tener en cuenta" })); c.appendChild(lista(perfil.cuidado, "ambar"));
      c.appendChild(h("h4", { texto: "En el trabajo" })); c.appendChild(p(perfil.trabajo));
      c.appendChild(h("h4", { texto: "En las relaciones" })); c.appendChild(p(perfil.relaciones));
      s2.appendChild(c);
      raiz.appendChild(s2);
    }
  }

  /* ---------- VALORES ---------- */
  function valores(test, r, raiz) {
    var tx = T().valores;
    var top = r.extra.top;
    raiz.appendChild(cabecera(test, r, "Tus valores principales",
      top.map(function (k) { return test.escalas[k].nombre; }).join(" · ")));
    var av = avisosCalidad(r); if (av) raiz.appendChild(av);
    raiz.appendChild(p(tx.intro, "intro"));
    raiz.appendChild(h("div", { clase: "nota" }, h("strong", { texto: "Cómo se calcula: " }),
      "los valores se comparan contra tu propio promedio. Por eso un valor “bajo” significa “menos prioritario para vos que el resto”, no que no te importe."));

    var s1 = seccion("Tu ranking de valores");
    s1.appendChild(UI.svg(Graficos.puntos(r.extra.orden.map(function (k) {
      return { etiqueta: test.escalas[k].nombre, valor: r.extra.relativo[k], color: test.escalas[k].color };
    }), { titulo: "Ranking relativo de valores" })));
    s1.appendChild(leyenda("A la derecha del centro: valores que priorizás más que tu promedio. A la izquierda: los que priorizás menos."));
    raiz.appendChild(s1);

    var coinc = (tx.combos || []).filter(function (c) {
      return c.top.every(function (k) { return top.indexOf(k) >= 0; });
    });
    if (coinc.length) {
      var sc = seccion("La combinación de tus valores");
      coinc.forEach(function (c) { sc.appendChild(tarjeta(null, [p(c.texto)], null, "tarjeta-combo")); });
      raiz.appendChild(sc);
    }

    var s2 = seccion("Tus tres valores en detalle");
    top.forEach(function (k, i) {
      var t = tx.tipos[k];
      var c = tarjeta(null, [], test.escalas[k].color);
      c.appendChild(h("div", { clase: "tarjeta-top" },
        h("div", {}, h("p", { clase: "mini", texto: "Valor n.º " + (i + 1) }), h("h3", { texto: t.titulo }))));
      c.appendChild(p(t.resumen, "destacado"));
      c.appendChild(p(t.detalle));
      c.appendChild(h("h4", { texto: "Para mantener el equilibrio" })); c.appendChild(p(t.equilibrio));
      c.appendChild(h("h4", { texto: "Un consejo" })); c.appendChild(p(t.consejo));
      s2.appendChild(c);
    });
    raiz.appendChild(s2);

    var s3 = seccion("Los que quedaron más abajo");
    r.extra.orden.slice(-3).forEach(function (k) {
      s3.appendChild(tarjeta(test.escalas[k].nombre, [p(tx.tipos[k].resumen)], test.escalas[k].color, "tarjeta-chica"));
    });
    raiz.appendChild(s3);
  }

  /* ---------- INTELIGENCIA EMOCIONAL ---------- */
  function emocional(test, r, raiz) {
    var tx = T().emocional;
    var total = r.extra.total;
    var nivel = Motor.nivelSimple(total);
    raiz.appendChild(cabecera(test, r, "Tu inteligencia emocional: " + Motor.nivelDe(total),
      "Resultado global de la autoevaluación: " + Math.round(total) + "%"));
    var av = avisosCalidad(r); if (av) raiz.appendChild(av);
    raiz.appendChild(p(tx.intro, "intro"));
    raiz.appendChild(h("div", { clase: "nota" }, h("strong", { texto: "Tené en cuenta: " }), tx.advertencia));

    var claves = Object.keys(test.escalas);
    var s1 = seccion("Tu panorama");
    s1.appendChild(h("div", { clase: "anillo-fila" },
      UI.svg(Graficos.anillo(total, { titulo: "Resultado global", color: test.color, etiqueta: "global" }), "anillo-wrap"),
      p(tx.global[nivel], "destacado")));
    s1.appendChild(UI.svg(Graficos.barras(claves.map(function (k) {
      return { etiqueta: test.escalas[k].nombre, valor: r.escalas[k].porcentaje, color: test.escalas[k].color };
    }), { titulo: "Las cuatro áreas", etiquetaAncho: 140 })));
    s1.appendChild(p("Tu área más fuerte: " + test.escalas[r.extra.fuerte].nombre + ". Tu mejor oportunidad de crecimiento: " + test.escalas[r.extra.mejorar].nombre + ".", "destacado"));
    raiz.appendChild(s1);

    var s2 = seccion("Área por área");
    Motor.ordenarEscalas(r.escalas).forEach(function (k) {
      var e = r.escalas[k], niv = Motor.nivelSimple(e.porcentaje), t = tx.tipos[k][niv];
      var c = tarjeta(null, [], test.escalas[k].color);
      c.appendChild(h("div", { clase: "tarjeta-top" },
        h("div", {}, h("p", { clase: "mini", texto: test.escalas[k].nombre }), h("h3", { texto: t.titulo })),
        h("div", { clase: "num-grande", texto: Math.round(e.porcentaje) + "%" })));
      c.appendChild(p(t.resumen, "destacado"));
      c.appendChild(p(t.detalle));
      c.appendChild(h("h4", { texto: "Ejercicios para practicar" })); c.appendChild(lista(t.ejercicios));
      s2.appendChild(c);
    });
    raiz.appendChild(s2);
  }

  var VISTAS = { bigfive: bigfive, intereses: intereses, estilo: estilo, valores: valores, emocional: emocional };

  function render(cont, testId, resultado, opciones) {
    opciones = opciones || {};
    var test = Motor.obtener(testId);
    var r = resultado || Motor.resultadoDe(testId);
    UI.vaciar(cont);
    if (!test || !r) { UI.ir("/test/" + testId); return; }
    var raiz = h("section", { clase: "vista vista-resultado", estilo: { "--color": test.color } });
    cont.appendChild(raiz);
    if (opciones.soloLectura) {
      raiz.appendChild(h("div", { clase: "nota nota-ver" },
        h("strong", { texto: "Estás viendo un resultado compartido. " }),
        "Solo contiene los porcentajes, no las respuestas. ",
        h("a", { texto: "Hacé el test vos también", attrs: { href: "#/test/" + testId } })));
    }
    (VISTAS[testId] || function () {})(test, r, raiz);
    if (window.Compartir) raiz.appendChild(window.Compartir.panel(test, r, opciones));
    raiz.appendChild(h("div", { clase: "nota nota-pie" }, h("strong", { texto: "Antes de sacar conclusiones: " }),
      (T()[testId] && T()[testId].advertencia) || "Es una herramienta de autoconocimiento, no un diagnóstico.",
      " Si algo de tu bienestar emocional te preocupa, hablalo con un profesional de la salud mental."));
    if (test.fuente) {
      raiz.appendChild(p("Fuente: " + test.fuente.texto + " Traducción y preguntas propias, sin validación científica.", "mini"));
    }
    if (!opciones.soloLectura) {
      raiz.appendChild(h("div", { clase: "acciones-fin" },
        h("a", { clase: "btn btn-pri", texto: "Probar otro test", attrs: { href: "#/" } }),
        h("a", { clase: "btn btn-sec", texto: "Mi resumen", attrs: { href: "#/historial" } }),
        h("button", { clase: "btn btn-sec", texto: "Repetir este test", attrs: { type: "button" }, on: { click: function () {
          UI.confirmar("¿Repetir el test?", "Vas a empezar de cero. Tu resultado actual se mantiene hasta que termines el nuevo.", "Empezar", function () {
            Motor.descartarProgreso(testId); Motor.iniciar(testId); UI.ir("/hacer/" + testId);
          });
        } } })));
    }
    UI.arriba();
  }

  window.VistaResultados = { render: render };
})();
