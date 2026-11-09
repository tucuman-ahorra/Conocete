/* ============================================================
   MOTOR: carga de tests, respuestas, puntajes, almacenamiento.
   No tiene nada de interfaz. Todo lo expone en window.Motor
   ============================================================ */
(function () {
  "use strict";

  var CLAVE = "conocete.v1";
  var tests = {};          // registro de tests
  var orden = [];          // orden de aparición en la portada

  /* ---------- registro ---------- */
  function registrar(test) {
    if (!test || !test.id) throw new Error("Test sin id");
    validarTest(test);
    tests[test.id] = test;
    orden.push(test.id);
  }

  function validarTest(t) {
    var ids = {};
    t.items.forEach(function (it, i) {
      if (!it.id) throw new Error(t.id + ": ítem " + i + " sin id");
      if (ids[it.id]) throw new Error(t.id + ": id repetido " + it.id);
      ids[it.id] = true;
      if (it.escala && !t.escalas[it.escala]) {
        throw new Error(t.id + ": escala inexistente " + it.escala);
      }
    });
  }

  function obtener(id) { return tests[id] || null; }
  function listar() { return orden.map(function (id) { return tests[id]; }); }

  /* ---------- utilidades ---------- */
  function semillaDesdeTexto(txt) {
    var h = 2166136261;
    for (var i = 0; i < txt.length; i++) {
      h ^= txt.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function generadorAleatorio(semilla) {
    var s = semilla >>> 0;
    return function () {
      s += 0x6D2B79F5;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function mezclarLista(lista, semilla) {
    var a = lista.slice();
    var azar = generadorAleatorio(semilla);
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(azar() * (i + 1));
      var x = a[i]; a[i] = a[j]; a[j] = x;
    }
    return a;
  }

  function redondear(n, d) {
    var f = Math.pow(10, d || 0);
    return Math.round(n * f) / f;
  }

  function limitar(n, a, b) { return Math.max(a, Math.min(b, n)); }

  function promedio(arr) {
    if (!arr.length) return 0;
    return arr.reduce(function (s, x) { return s + x; }, 0) / arr.length;
  }

  function desvio(arr) {
    if (arr.length < 2) return 0;
    var m = promedio(arr);
    var v = arr.reduce(function (s, x) { return s + (x - m) * (x - m); }, 0) / (arr.length - 1);
    return Math.sqrt(v);
  }

  /* ---------- almacenamiento seguro ---------- */
  var memoria = {};
  function leerTodo() {
    if (!window.CONFIG.guardarLocalmente) return memoria;
    try {
      var txt = window.localStorage.getItem(CLAVE);
      return txt ? JSON.parse(txt) : {};
    } catch (e) { return memoria; }
  }
  function guardarTodo(obj) {
    memoria = obj;
    if (!window.CONFIG.guardarLocalmente) return;
    try { window.localStorage.setItem(CLAVE, JSON.stringify(obj)); } catch (e) { /* sin almacenamiento */ }
  }
  function datosUsuario() {
    var t = leerTodo();
    if (!t.progreso) t.progreso = {};
    if (!t.resultados) t.resultados = {};
    if (!t.historial) t.historial = [];
    if (!t.perfil) t.perfil = {};
    return t;
  }

  /* ---------- progreso (respuestas en curso) ---------- */
  function iniciar(testId) {
    var d = datosUsuario();
    var semilla = Date.now() % 100000;
    d.progreso[testId] = { respuestas: {}, semilla: semilla, inicio: Date.now(), pagina: 0 };
    guardarTodo(d);
    return d.progreso[testId];
  }

  function progresoDe(testId) {
    return datosUsuario().progreso[testId] || null;
  }

  function responder(testId, itemId, valor) {
    var d = datosUsuario();
    var p = d.progreso[testId];
    if (!p) p = d.progreso[testId] = { respuestas: {}, semilla: 1, inicio: Date.now(), pagina: 0 };
    p.respuestas[itemId] = valor;
    p.ultima = Date.now();
    guardarTodo(d);
  }

  function guardarPagina(testId, pagina) {
    var d = datosUsuario();
    if (d.progreso[testId]) { d.progreso[testId].pagina = pagina; guardarTodo(d); }
  }

  function descartarProgreso(testId) {
    var d = datosUsuario();
    delete d.progreso[testId];
    guardarTodo(d);
  }

  function ordenDePreguntas(test, progreso) {
    if (!window.CONFIG.mezclar) return test.items.slice();
    if (test.agruparPorBloques) {
      // mezcla dentro de cada bloque pero respeta el orden de los bloques
      var bloques = {};
      var claves = [];
      test.items.forEach(function (it) {
        var b = it.bloque || "_";
        if (!bloques[b]) { bloques[b] = []; claves.push(b); }
        bloques[b].push(it);
      });
      var salida = [];
      claves.forEach(function (b, i) {
        salida = salida.concat(mezclarLista(bloques[b], progreso.semilla + i));
      });
      return salida;
    }
    return mezclarLista(test.items, progreso.semilla);
  }

  function cantidadRespondidas(test, progreso) {
    if (!progreso) return 0;
    return test.items.filter(function (it) { return progreso.respuestas[it.id] != null; }).length;
  }

  /* ---------- puntaje ---------- */
  // valor bruto -> valor con la clave invertida aplicada
  function valorFinal(item, valor, min, max) {
    return item.inv ? (min + max - valor) : valor;
  }

  function puntuar(test, respuestas) {
    var min = test.rango[0], max = test.rango[1];
    var porEscala = {};
    Object.keys(test.escalas).forEach(function (k) { porEscala[k] = []; });
    var todos = [];
    var seq = test.items.map(function (it) { return respuestas[it.id]; });

    test.items.forEach(function (it) {
      var v = respuestas[it.id];
      if (v == null) return;
      var f = valorFinal(it, v, min, max);
      todos.push(v);
      if (it.escala) porEscala[it.escala].push(f);
      (it.escalas || []).forEach(function (e) { porEscala[e].push(f); });
    });

    var escalas = {};
    Object.keys(porEscala).forEach(function (k) {
      var arr = porEscala[k];
      var suma = arr.reduce(function (s, x) { return s + x; }, 0);
      var prom = arr.length ? suma / arr.length : 0;
      var pct = arr.length ? ((prom - min) / (max - min)) * 100 : 0;
      if (test.escalas[k].invertida) { pct = 100 - pct; prom = min + max - prom; }
      escalas[k] = {
        clave: k,
        n: arr.length,
        suma: suma,
        promedio: redondear(prom, 2),
        porcentaje: redondear(limitar(pct, 0, 100), 1),
        nivel: nivelDe(pct)
      };
    });

    var resultado = {
      testId: test.id,
      fecha: Date.now(),
      escalas: escalas,
      calidad: evaluarCalidad(test, respuestas, seq)
    };
    if (typeof test.calcular === "function") {
      resultado.extra = test.calcular(escalas, respuestas, resultado);
    }
    return resultado;
  }

  function nivelDe(pct) {
    if (pct < 20) return "muy bajo";
    if (pct < 40) return "bajo";
    if (pct < 60) return "medio";
    if (pct < 80) return "alto";
    return "muy alto";
  }

  function nivelSimple(pct) {
    if (pct < 40) return "bajo";
    if (pct < 60) return "medio";
    return "alto";
  }

  /* ---------- calidad de las respuestas ---------- */
  function evaluarCalidad(test, respuestas, seq) {
    var avisos = [];
    var validos = seq.filter(function (x) { return x != null; });
    if (validos.length < test.items.length) {
      avisos.push({ tipo: "incompleto", texto: "Quedaron preguntas sin responder, el resultado es parcial." });
    }
    if (window.CONFIG.detectarRespuestasUniformes && validos.length >= 12) {
      var d = desvio(validos);
      if (d < 0.35) {
        avisos.push({ tipo: "uniforme", texto: "Respondiste casi todo igual. Eso suele dar resultados poco útiles: probá de nuevo con más calma." });
      }
      var maxRacha = 1, racha = 1;
      for (var i = 1; i < validos.length; i++) {
        if (validos[i] === validos[i - 1]) { racha++; if (racha > maxRacha) maxRacha = racha; } else racha = 1;
      }
      if (maxRacha >= 14) {
        avisos.push({ tipo: "racha", texto: "Hubo muchas respuestas seguidas con el mismo valor. Puede indicar que se respondió muy rápido." });
      }
    }
    // coherencia entre ítems directos e invertidos de la misma escala
    var incoherentes = 0, comparados = 0;
    var min = test.rango[0], max = test.rango[1], centro = (min + max) / 2;
    var grupos = {};
    test.items.forEach(function (it) {
      var k = it.escala || (it.escalas && it.escalas[0]);
      if (!k || respuestas[it.id] == null) return;
      (grupos[k] = grupos[k] || []).push({ it: it, v: respuestas[it.id] });
    });
    Object.keys(grupos).forEach(function (k) {
      var g = grupos[k];
      var dir = g.filter(function (x) { return !x.it.inv; });
      var inv = g.filter(function (x) { return x.it.inv; });
      if (dir.length >= 2 && inv.length >= 2) {
        var a = promedio(dir.map(function (x) { return x.v; }));
        var b = promedio(inv.map(function (x) { return max + min - x.v; }));
        comparados++;
        if (Math.abs(a - b) > (max - min) * 0.55) incoherentes++;
      }
    });
    if (comparados >= 2 && incoherentes / comparados > 0.5) {
      avisos.push({ tipo: "incoherente", texto: "Algunas respuestas se contradicen entre sí. Puede ser que alguna pregunta se haya leído al revés." });
    }
    var duracion = null;
    return { avisos: avisos, confiable: avisos.length === 0, duracion: duracion, centro: centro };
  }

  /* ---------- guardar resultado ---------- */
  function finalizar(testId) {
    var test = obtener(testId);
    var d = datosUsuario();
    var p = d.progreso[testId];
    if (!test || !p) return null;
    var r = puntuar(test, p.respuestas);
    r.duracionSeg = Math.round(((p.ultima || Date.now()) - p.inicio) / 1000);
    r.respuestas = p.respuestas;
    d.resultados[testId] = r;
    d.historial.unshift({ testId: testId, fecha: r.fecha, resumen: resumenCorto(test, r) });
    d.historial = d.historial.slice(0, 60);
    delete d.progreso[testId];
    guardarTodo(d);
    return r;
  }

  function resumenCorto(test, r) {
    if (typeof test.resumen === "function") return test.resumen(r);
    var top = Object.keys(r.escalas).sort(function (a, b) {
      return r.escalas[b].porcentaje - r.escalas[a].porcentaje;
    })[0];
    return top ? test.escalas[top].nombre : "";
  }

  function resultadoDe(testId) { return datosUsuario().resultados[testId] || null; }
  function historial() { return datosUsuario().historial; }

  function borrarResultado(testId) {
    var d = datosUsuario();
    delete d.resultados[testId];
    d.historial = d.historial.filter(function (h) { return h.testId !== testId; });
    guardarTodo(d);
  }

  function borrarTodo() { guardarTodo({}); }

  /* ---------- exportar / importar ---------- */
  function exportar() {
    var d = datosUsuario();
    return JSON.stringify({ app: "conocete", version: window.CONFIG.version, exportado: Date.now(), datos: d }, null, 2);
  }
  function importar(texto) {
    var obj = JSON.parse(texto);
    if (!obj || obj.app !== "conocete" || !obj.datos) throw new Error("Archivo no válido");
    guardarTodo(obj.datos);
    return true;
  }

  /* ---------- perfil opcional (edad, para personalizar el tono) ---------- */
  function guardarPerfil(p) {
    var d = datosUsuario(); d.perfil = Object.assign(d.perfil, p); guardarTodo(d);
  }
  function perfil() { return datosUsuario().perfil; }

  /* ---------- clasificación auxiliar ---------- */
  function ordenarEscalas(escalas, desc) {
    return Object.keys(escalas).sort(function (a, b) {
      var x = escalas[a].porcentaje, y = escalas[b].porcentaje;
      return desc === false ? x - y : y - x;
    });
  }

  window.Motor = {
    registrar: registrar, obtener: obtener, listar: listar,
    iniciar: iniciar, progresoDe: progresoDe, responder: responder,
    guardarPagina: guardarPagina, descartarProgreso: descartarProgreso,
    ordenDePreguntas: ordenDePreguntas, cantidadRespondidas: cantidadRespondidas,
    puntuar: puntuar, finalizar: finalizar, resultadoDe: resultadoDe,
    historial: historial, borrarResultado: borrarResultado, borrarTodo: borrarTodo,
    exportar: exportar, importar: importar, guardarPerfil: guardarPerfil, perfil: perfil,
    ordenarEscalas: ordenarEscalas, nivelDe: nivelDe, nivelSimple: nivelSimple,
    util: { redondear: redondear, limitar: limitar, promedio: promedio, desvio: desvio,
            mezclar: mezclarLista, semilla: semillaDesdeTexto }
  };
})();
