/* ============================================================
   UI: router por hash y vistas de portada, introducción de
   cada test, historial, información y privacidad.
   Rutas:  #/  #/test/<id>  #/hacer/<id>  #/resultado/<id>
           #/historial  #/acerca  #/privacidad  #/ver/<id>/<codigo>
   ============================================================ */
(function () {
  "use strict";
  var h = UI.h;
  var cont = null;

  function titulo(t) { document.title = t ? t + " · " + CONFIG.nombre : CONFIG.nombre + " · " + CONFIG.eslogan; }
  function p(t, c) { return h("p", { clase: c || "", texto: t }); }

  /* ---------- PORTADA ---------- */
  function inicio() {
    titulo("");
    UI.vaciar(cont);
    var raiz = h("section", { clase: "vista vista-inicio" });
    cont.appendChild(raiz);
    raiz.appendChild(h("header", { clase: "hero" },
      h("p", { clase: "hero-etiqueta", texto: "Tests de personalidad gratis" }),
      h("h1", { texto: "Conocete mejor. Sin pagar para ver tu resultado." }),
      p("Cinco tests completos con resultados detallados, gráficos y consejos. No pedimos registro, mail ni tarjeta. Tus respuestas quedan en tu propio dispositivo.", "hero-texto")));

    var pend = Motor.listar().filter(function (t) { return Motor.progresoDe(t.id); });
    if (pend.length) {
      var avisoP = h("div", { clase: "nota nota-ver" }, h("strong", { texto: "Tenés un test a medio hacer: " }),
        h("a", { texto: pend[0].nombre + " (continuar)", attrs: { href: "#/hacer/" + pend[0].id } }));
      raiz.appendChild(avisoP);
    }

    var grilla = h("div", { clase: "grilla-tests" });
    Motor.listar().forEach(function (t) {
      var r = Motor.resultadoDe(t.id);
      var prog = Motor.progresoDe(t.id);
      var n = prog ? Motor.cantidadRespondidas(t, prog) : 0;
      var estado = r ? "Hecho · " + (Motor.historial().filter(function (x) { return x.testId === t.id; })[0] || {}).resumen
                     : (n ? "En curso: " + n + " de " + t.items.length : "");
      var tarj = h("a", { clase: "test-tarjeta", attrs: { href: r ? "#/resultado/" + t.id : "#/test/" + t.id }, estilo: { "--color": t.color } },
        h("span", { clase: "test-icono", texto: t.icono, attrs: { "aria-hidden": "true" } }),
        h("span", { clase: "test-cuerpo" },
          h("strong", { texto: t.nombre }),
          h("span", { clase: "test-sub", texto: t.subtitulo }),
          h("span", { clase: "test-meta", texto: t.items.length + " preguntas · " + UI.minutosTexto(t.minutos) })),
        estado ? h("span", { clase: "test-estado", texto: estado }) : null);
      grilla.appendChild(tarj);
    });
    raiz.appendChild(grilla);

    raiz.appendChild(h("section", { clase: "bloque" },
      h("h2", { texto: "Cómo funciona" }),
      h("ol", { clase: "pasos" },
        h("li", { texto: "Elegís un test y respondés con sinceridad, pensando en cómo sos habitualmente." }),
        h("li", { texto: "Al terminar ves el resultado completo al instante: gráficos, fortalezas, puntos a cuidar y consejos." }),
        h("li", { texto: "Si querés, lo guardás como imagen, PDF o enlace. Todo es opcional y gratis." }))));

    raiz.appendChild(h("section", { clase: "nota" }, h("strong", { texto: "Antes de empezar: " }),
      "estos tests sirven para reflexionar y conocerte, no son un diagnóstico ni reemplazan a un psicólogo o psicóloga. Los resultados describen tendencias, no etiquetas fijas. ",
      h("a", { texto: "Leer más sobre los tests", attrs: { href: "#/acerca" } })));

    if (CONFIG.apoyo && CONFIG.apoyo.activo) {
      raiz.appendChild(h("section", { clase: "apoyo" }, p(CONFIG.apoyo.texto),
        CONFIG.apoyo.enlace ? h("a", { clase: "btn btn-sec", texto: "Apoyar el proyecto", attrs: { href: CONFIG.apoyo.enlace, target: "_blank", rel: "noopener" } }) : null));
    }
  }

  /* ---------- INTRODUCCIÓN DE UN TEST ---------- */
  function intro(id) {
    var t = Motor.obtener(id);
    if (!t) { return noEncontrado(); }
    titulo(t.nombre);
    UI.vaciar(cont);
    var prog = Motor.progresoDe(id), r = Motor.resultadoDe(id);
    var n = prog ? Motor.cantidadRespondidas(t, prog) : 0;
    var raiz = h("section", { clase: "vista vista-intro", estilo: { "--color": t.color } });
    cont.appendChild(raiz);
    raiz.appendChild(h("a", { clase: "volver", texto: "← Todos los tests", attrs: { href: "#/" } }));
    raiz.appendChild(h("header", { clase: "res-cabecera", estilo: { "--color": t.color } },
      h("p", { clase: "res-etiqueta", texto: t.icono + "  Test" }),
      h("h1", { texto: t.nombre }),
      p(t.subtitulo, "res-sub")));
    raiz.appendChild(p(t.descripcion, "intro"));
    raiz.appendChild(h("ul", { clase: "datos-rapidos" },
      h("li", {}, h("strong", { texto: String(t.items.length) }), " preguntas"),
      h("li", {}, h("strong", { texto: "≈ " + t.minutos }), " minutos"),
      h("li", {}, h("strong", { texto: "Gratis" }), " y sin registro")));
    raiz.appendChild(h("div", { clase: "nota" }, h("strong", { texto: "Cómo responder: " }), t.instruccion));

    var acc = h("div", { clase: "acciones-fin" });
    if (n > 0 && n < t.items.length) {
      acc.appendChild(h("a", { clase: "btn btn-pri", texto: "Continuar (" + n + "/" + t.items.length + ")", attrs: { href: "#/hacer/" + id } }));
      acc.appendChild(h("button", { clase: "btn btn-sec", texto: "Empezar de nuevo", attrs: { type: "button" }, on: { click: function () {
        UI.confirmar("¿Empezar de nuevo?", "Se borran las respuestas que ya diste en este test.", "Empezar de nuevo", function () {
          Motor.descartarProgreso(id); Motor.iniciar(id); UI.ir("/hacer/" + id); });
      } } }));
    } else {
      acc.appendChild(h("button", { clase: "btn btn-pri", texto: r ? "Hacer el test otra vez" : "Empezar el test", attrs: { type: "button" }, on: { click: function () {
        Motor.descartarProgreso(id); Motor.iniciar(id); UI.ir("/hacer/" + id); } } }));
    }
    if (r) acc.appendChild(h("a", { clase: "btn btn-sec", texto: "Ver mi último resultado", attrs: { href: "#/resultado/" + id } }));
    raiz.appendChild(acc);

    if (t.fuente) raiz.appendChild(p("Base del test: " + t.fuente.texto, "mini"));
  }

  /* ---------- HISTORIAL / MI RESUMEN ---------- */
  function historial() {
    titulo("Mi resumen");
    UI.vaciar(cont);
    var raiz = h("section", { clase: "vista" });
    cont.appendChild(raiz);
    raiz.appendChild(h("header", { clase: "res-cabecera", estilo: { "--color": "#3b6fd4" } },
      h("p", { clase: "res-etiqueta", texto: "Tu espacio" }), h("h1", { texto: "Mi resumen" }),
      p("Todo lo que hiciste, guardado solo en este dispositivo.", "res-sub")));

    var hechos = Motor.listar().filter(function (t) { return Motor.resultadoDe(t.id); });
    if (!hechos.length) {
      raiz.appendChild(p("Todavía no completaste ningún test.", "intro"));
      raiz.appendChild(h("a", { clase: "btn btn-pri", texto: "Elegir un test", attrs: { href: "#/" } }));
    } else {
      var s = h("section", { clase: "bloque" }, h("h2", { texto: "Tus resultados (" + hechos.length + " de " + Motor.listar().length + ")" }));
      hechos.forEach(function (t) {
        var r = Motor.resultadoDe(t.id);
        s.appendChild(h("article", { clase: "tarjeta tarjeta-hist", estilo: { "--color": t.color } },
          h("div", { clase: "tarjeta-top" },
            h("div", {}, h("p", { clase: "mini", texto: UI.fechaLarga(r.fecha) }), h("h3", { texto: t.nombre }),
              p((t.resumen ? t.resumen(r) : ""), "destacado")),
            h("a", { clase: "btn btn-sec", texto: "Ver", attrs: { href: "#/resultado/" + t.id } }))));
      });
      raiz.appendChild(s);
      raiz.appendChild(sintesis(hechos));
    }

    var h2 = h("section", { clase: "bloque" }, h("h2", { texto: "Tus datos" }),
      p("Podés llevarte una copia de todo para guardarla o pasarla a otro dispositivo. Sin cuentas, sin servidores."));
    var fila = h("div", { clase: "botonera" });
    fila.appendChild(h("button", { clase: "btn btn-sec", texto: "Descargar copia (JSON)", attrs: { type: "button" }, on: { click: function () {
      UI.descargar("conocete-copia.json", Motor.exportar(), "application/json"); } } }));
    var inp = h("input", { attrs: { type: "file", accept: "application/json,.json", hidden: true }, on: { change: function (e) {
      var f = e.target.files && e.target.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () { try { Motor.importar(String(rd.result)); UI.aviso("Copia restaurada", "ok"); historial(); }
        catch (x) { UI.aviso("Ese archivo no es una copia válida.", "error"); } };
      rd.readAsText(f);
    } } });
    fila.appendChild(h("button", { clase: "btn btn-sec", texto: "Restaurar copia", attrs: { type: "button" }, on: { click: function () { inp.click(); } } }));
    fila.appendChild(inp);
    fila.appendChild(h("button", { clase: "btn btn-peligro", texto: "Borrar todo", attrs: { type: "button" }, on: { click: function () {
      UI.confirmar("¿Borrar todos tus datos?", "Se eliminan resultados, respuestas y progreso de este dispositivo. No se puede deshacer.", "Borrar todo", function () {
        Motor.borrarTodo(); UI.aviso("Datos borrados", "ok"); historial(); }, true);
    } } }));
    h2.appendChild(fila);
    raiz.appendChild(h2);
  }

  /* resumen cruzado cuando hay más de un resultado */
  function sintesis(hechos) {
    var s = h("section", { clase: "bloque" }, h("h2", { texto: "Todo junto" }));
    var fr = [];
    var bf = Motor.resultadoDe("bigfive"), ie = Motor.resultadoDe("emocional"), va = Motor.resultadoDe("valores"),
        ri = Motor.resultadoDe("intereses"), es = Motor.resultadoDe("estilo");
    if (hechos.length < 2) {
      s.appendChild(p("Cuando completes más tests, acá vas a ver una lectura que los junta."));
      return s;
    }
    if (bf && ie) {
      var a = bf.escalas.N.porcentaje, b = ie.extra.total;
      if (a >= 60 && b >= 60) fr.push("Tu estabilidad emocional y tu inteligencia emocional van de la mano: es una base firme para relaciones y decisiones.");
      else if (a < 40 && b >= 60) fr.push("Aunque sentís las emociones con intensidad, tenés herramientas para manejarlas. Eso es una gran fortaleza.");
      else if (a >= 60 && b < 40) fr.push("Sos emocionalmente estable pero te quedan habilidades por entrenar para conectar con otros: practicar la empatía es tu oportunidad.");
    }
    if (bf && ri) {
      var o = bf.escalas.O.porcentaje, cod = ri.extra.codigo;
      if (o >= 60 && /[IA]/.test(cod.slice(0, 2))) fr.push("Tu apertura a la experiencia y tus intereses investigativos o artísticos se refuerzan: buscá trabajos con espacio para crear o descubrir.");
      if (bf.escalas.C.porcentaje >= 60 && /[CE]/.test(cod.slice(0, 2))) fr.push("Tu responsabilidad combina bien con tus intereses de organización o liderazgo.");
    }
    if (va && bf) {
      if (va.extra.top.indexOf("BE") >= 0 && bf.escalas.A.porcentaje >= 60) fr.push("Valorás el bienestar de los demás y además sos cooperativo/a: los trabajos de cuidado y comunidad pueden darte mucho sentido.");
      if (va.extra.top.indexOf("AU") >= 0 && bf.escalas.C.porcentaje < 40) fr.push("Valorás la libertad y tenés un estilo flexible: tené cuidado con los entornos muy rígidos.");
    }
    if (es && bf && es.extra.codigo[0] === "X" && bf.escalas.E.porcentaje < 40)
      fr.push("Dos tests apuntan a direcciones distintas en energía social. Es normal: dependen del contexto y de cómo respondiste cada día.");
    if (!fr.length) fr.push("Tus resultados no se contradicen ni se potencian de forma marcada: mostrás un perfil variado, lo que suele indicar flexibilidad.");
    fr.forEach(function (t) { s.appendChild(h("p", { clase: "destacado", texto: "• " + t })); });
    s.appendChild(p("Esta lectura es orientativa: cruza porcentajes con reglas simples, no es una evaluación profesional.", "mini"));
    return s;
  }

  /* ---------- ACERCA ---------- */
  function acerca() {
    titulo("Sobre los tests");
    UI.vaciar(cont);
    var raiz = h("section", { clase: "vista vista-texto" });
    cont.appendChild(raiz);
    raiz.appendChild(h("h1", { texto: "Sobre los tests" }));
    var items = [
      ["Qué son y qué no son", "Son cuestionarios de autoconocimiento basados en modelos conocidos de la psicología. No son diagnósticos clínicos ni pruebas psicotécnicas oficiales, y no sirven para decidir contrataciones, tratamientos ni conflictos legales."],
      ["Los Cinco Grandes", "Usa los 50 marcadores del banco IPIP (Goldberg), de dominio público. La traducción al español es propia y no está validada estadísticamente, así que los porcentajes son una referencia, no una norma poblacional."],
      ["Intereses vocacionales (RIASEC)", "Inspirado en el modelo de John Holland. Las preguntas son originales. Sirve para explorar ideas de estudio o trabajo, no para elegir una carrera por sí solo."],
      ["Estilo personal (16 perfiles)", "Una tipología propia inspirada en las ideas de Carl Jung. No es el test MBTI ni está afiliado a él, y los tipos tienen respaldo científico más débil que el Big Five. Tomalo como un juego de reflexión."],
      ["Valores personales", "Inspirado en la teoría de valores de Shalom Schwartz, con preguntas originales. El resultado es relativo a tu propio promedio."],
      ["Inteligencia emocional", "Autoevaluación inspirada en los modelos de Goleman y de Salovey y Mayer. Mide cómo te ves, no tu desempeño real, y por eso puede diferir de cómo te ven los demás."],
      ["Cómo leer los porcentajes", "Cada porcentaje indica en qué punto de la escala te ubicaste según tus respuestas. No es una nota ni una comparación con otras personas."],
      ["Si algo te preocupa", "Si sentís angustia, tristeza persistente o ideas de hacerte daño, hablá con un profesional de la salud mental o con alguien de confianza. En Argentina podés llamar al 135 (CABA y Gran Buenos Aires) o al (011) 5275-1135 desde cualquier lugar del país, línea gratuita de asistencia al suicida. Estos tests no pueden ayudarte con eso."]
    ];
    items.forEach(function (x) { raiz.appendChild(h("section", { clase: "bloque" }, h("h2", { texto: x[0] }), p(x[1]))); });
    raiz.appendChild(h("a", { clase: "btn btn-pri", texto: "Volver a los tests", attrs: { href: "#/" } }));
  }

  /* ---------- PRIVACIDAD ---------- */
  function privacidad() {
    titulo("Privacidad");
    UI.vaciar(cont);
    var raiz = h("section", { clase: "vista vista-texto" });
    cont.appendChild(raiz);
    raiz.appendChild(h("h1", { texto: "Privacidad" }));
    var items = [
      ["Tus respuestas no salen de tu dispositivo", "Todo el cálculo se hace en tu navegador. No hay servidor, base de datos ni cuentas. Nosotros no vemos tus respuestas ni tus resultados."],
      ["Qué se guarda", "Tus respuestas, el progreso y los resultados quedan en el almacenamiento local de tu navegador, para que puedas retomar o volver a verlos. Podés borrarlos cuando quieras desde “Mi resumen”."],
      ["Enlaces compartidos", "Si copiás un enlace de resultado, este contiene solo los porcentajes. Cualquiera con el enlace puede verlos."],
      ["Publicidad y estadísticas", (CONFIG.publicidad && CONFIG.publicidad.activa)
        ? "Este sitio muestra publicidad de terceros que puede usar cookies. Tus respuestas a los tests nunca se envían a anunciantes."
        : "Este sitio no usa publicidad, cookies de seguimiento ni herramientas de analítica."]
    ];
    items.forEach(function (x) { raiz.appendChild(h("section", { clase: "bloque" }, h("h2", { texto: x[0] }), p(x[1]))); });
    if (CONFIG.contacto) raiz.appendChild(p("Contacto: " + CONFIG.contacto));
    raiz.appendChild(h("a", { clase: "btn btn-pri", texto: "Volver", attrs: { href: "#/" } }));
  }

  function noEncontrado() {
    titulo("No encontrado");
    UI.vaciar(cont);
    cont.appendChild(h("section", { clase: "vista vista-texto" }, h("h1", { texto: "No encontramos esa página" }),
      h("a", { clase: "btn btn-pri", texto: "Ir al inicio", attrs: { href: "#/" } })));
  }

  /* ---------- ROUTER ---------- */
  function ruta() {
    var partes = (location.hash || "#/").replace(/^#\/?/, "").split("/");
    var a = partes[0] || "", id = partes[1];
    var t = id ? Motor.obtener(id) : null;
    marcarMenu(a);
    if (a === "" || a === "inicio") return inicio();
    if (a === "test") return t ? intro(id) : noEncontrado();
    if (a === "hacer") {
      if (!t) return noEncontrado();
      titulo(t.nombre);
      return VistaPreguntas.render(cont, id);
    }
    if (a === "resultado") {
      if (!t) return noEncontrado();
      if (!Motor.resultadoDe(id)) return UI.ir("/test/" + id);
      titulo("Resultado · " + t.nombre);
      return VistaResultados.render(cont, id);
    }
    if (a === "ver") {
      if (!t) return noEncontrado();
      var r = Compartir.decodificar(t, partes[2]);
      if (!r) return noEncontrado();
      titulo("Resultado compartido · " + t.nombre);
      return VistaResultados.render(cont, id, r, { soloLectura: true });
    }
    if (a === "historial") return historial();
    if (a === "acerca") return acerca();
    if (a === "privacidad") return privacidad();
    noEncontrado();
  }

  function marcarMenu(a) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-nav]"), function (el) {
      el.classList.toggle("activo", el.getAttribute("data-nav") === (a || "inicio"));
    });
  }

  /* ---------- tema claro/oscuro ---------- */
  function iniciarTema() {
    var guardado = null;
    try { guardado = localStorage.getItem("conocete.tema"); } catch (e) {}
    if (guardado) document.documentElement.setAttribute("data-tema", guardado);
    var btn = document.getElementById("btn-tema");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var actual = document.documentElement.getAttribute("data-tema");
      var oscuroSistema = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      var esOscuro = actual ? actual === "oscuro" : oscuroSistema;
      var nuevo = esOscuro ? "claro" : "oscuro";
      document.documentElement.setAttribute("data-tema", nuevo);
      try { localStorage.setItem("conocete.tema", nuevo); } catch (e) {}
    });
  }

  function arrancar() {
    cont = document.getElementById("app");
    var nombre = document.getElementById("nombre-sitio"); if (nombre) nombre.textContent = CONFIG.nombre;
    var pie = document.getElementById("pie-texto");
    if (pie) pie.textContent = CONFIG.nombre + " · v" + CONFIG.version + " · Herramienta de autoconocimiento, no sustituye la consulta profesional.";
    iniciarTema();
    window.addEventListener("hashchange", function () { ruta(); if (!/^#\/hacer/.test(location.hash)) UI.arriba(); });
    ruta();
    if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  }

  window.addEventListener("error", function (e) {
    var c = document.getElementById("avisos");
    if (c && !c.firstChild) UI.aviso("Ocurrió un error inesperado. Recargá la página.", "error");
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", arrancar); else arrancar();
})();
