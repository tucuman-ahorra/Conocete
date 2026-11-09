/* ============================================================
   TEST 4: VALORES PERSONALES
   Diez valores universales inspirados en la teoría de Shalom
   Schwartz. Preguntas originales. Muestra qué es más
   importante para vos RELATIVAMENTE a tus otros valores.
   ============================================================ */
(function () {
  var Likert = [
    { v: 1, t: "Nada parecido a mí" },
    { v: 2, t: "Poco parecido a mí" },
    { v: 3, t: "Algo parecido a mí" },
    { v: 4, t: "Parecido a mí" },
    { v: 5, t: "Muy parecido a mí" }
  ];

  var escalas = {
    AU: { nombre: "Autonomía", corta: "Pensar y decidir por vos mismo/a, explorar y crear.", color: "#3b6fd4" },
    ES: { nombre: "Estimulación", corta: "Novedad, aventura y desafíos que te despierten.", color: "#e8833a" },
    HE: { nombre: "Disfrute", corta: "Pasarla bien, darte gustos y disfrutar de la vida.", color: "#d4a017" },
    LO: { nombre: "Logro", corta: "Éxito personal, competencia y reconocimiento.", color: "#c8642b" },
    PO: { nombre: "Poder", corta: "Influencia, estatus y control de los recursos.", color: "#8a5cc7" },
    SE: { nombre: "Seguridad", corta: "Estabilidad, protección y previsibilidad.", color: "#5f7a8c" },
    CO: { nombre: "Conformidad", corta: "Respetar normas y no incomodar a los demás.", color: "#7a8f3b" },
    TR: { nombre: "Tradición", corta: "Costumbres, creencias y raíces familiares o culturales.", color: "#a8603b" },
    BE: { nombre: "Benevolencia", corta: "Cuidar y ayudar a las personas cercanas.", color: "#2f9e6f" },
    UN: { nombre: "Universalismo", corta: "Justicia, igualdad y cuidado del ambiente y de todos.", color: "#1d9aa8" }
  };

  var base = [
    ["AU1", "Es importante para mí tomar mis propias decisiones y ser libre en lo que hago.", "AU"],
    ["AU2", "Me gusta tener ideas propias y desarrollarlas, aunque nadie las comparta.", "AU"],
    ["AU3", "Me resulta importante entender las cosas por mí mismo/a, sin depender de otros.", "AU"],
    ["ES1", "Busco una vida con novedad y variedad, no con rutina.", "ES"],
    ["ES2", "Me gusta correr algún riesgo y probar cosas que dan un poco de miedo.", "ES"],
    ["ES3", "Me aburre hacer siempre lo mismo; necesito emociones nuevas.", "ES"],
    ["HE1", "Disfrutar de la vida y darme gustos es muy importante para mí.", "HE"],
    ["HE2", "Busco aprovechar cada oportunidad de pasarla bien.", "HE"],
    ["HE3", "Me parece valioso dedicar tiempo al placer y al descanso sin culpa.", "HE"],
    ["LO1", "Para mí es importante demostrar mi capacidad y que se reconozca mi trabajo.", "LO"],
    ["LO2", "Quiero ser exitoso/a en lo que hago y que los demás lo noten.", "LO"],
    ["LO3", "Me esfuerzo mucho por alcanzar metas ambiciosas.", "LO"],
    ["PO1", "Me importa tener autoridad y que otros sigan mis indicaciones.", "PO"],
    ["PO2", "Quiero tener dinero y recursos para poder influir y decidir.", "PO"],
    ["PO3", "Me gusta que me respeten por mi posición o mi estatus.", "PO"],
    ["SE1", "Es muy importante para mí vivir en un entorno seguro y estable.", "SE"],
    ["SE2", "Evito las situaciones inciertas o riesgosas, prefiero lo previsible.", "SE"],
    ["SE3", "Me preocupa tener cubierto el futuro: ahorros, salud, vivienda.", "SE"],
    ["CO1", "Creo que hay que cumplir las reglas aunque nadie nos vea.", "CO"],
    ["CO2", "Trato de comportarme siempre de manera correcta y educada.", "CO"],
    ["CO3", "Evito hacer cosas que otros puedan considerar inapropiadas.", "CO"],
    ["TR1", "Las tradiciones y costumbres de mi familia o mi comunidad son importantes para mí.", "TR"],
    ["TR2", "Valoro la humildad y no pedir más de lo que me corresponde.", "TR"],
    ["TR3", "Respeto las creencias y las costumbres con las que me crié.", "TR"],
    ["BE1", "Es muy importante para mí ayudar a las personas que quiero.", "BE"],
    ["BE2", "Quiero ser alguien en quien se pueda confiar completamente.", "BE"],
    ["BE3", "Me importa el bienestar de mis amigos y mi familia por encima de casi todo.", "BE"],
    ["UN1", "Creo que todas las personas deberían ser tratadas con igualdad y justicia.", "UN"],
    ["UN2", "Me importa cuidar la naturaleza y el medio ambiente.", "UN"],
    ["UN3", "Quiero entender y respetar a personas muy distintas a mí.", "UN"]
  ];

  Motor.registrar({
    id: "valores",
    nombre: "Valores personales",
    subtitulo: "Qué es lo que de verdad te mueve y guía tus decisiones",
    icono: "♥",
    color: "#d4a017",
    minutos: 6,
    descripcion: "Diez valores universales ordenados según tu propia jerarquía. Sirve para tomar decisiones importantes de vida y trabajo con más claridad.",
    instruccion: "Leé cada descripción de una persona y elegí qué tanto se parece a vos.",
    rango: [1, 5],
    opciones: Likert,
    escalas: escalas,
    items: base.map(function (a) { return { id: a[0], texto: a[1], escala: a[2] }; }),
    calcular: function (esc) {
      var claves = Object.keys(esc);
      var m = claves.reduce(function (s, k) { return s + esc[k].promedio; }, 0) / claves.length;
      var rel = {};
      claves.forEach(function (k) { rel[k] = Motor.util.redondear(esc[k].promedio - m, 2); });
      var orden = claves.sort(function (a, b) { return rel[b] - rel[a]; });
      return { media: Motor.util.redondear(m, 2), relativo: rel, orden: orden, top: orden.slice(0, 3) };
    },
    resumen: function (r) {
      return r.extra.top.slice(0, 2).map(function (k) { return escalas[k].nombre; }).join(" y ");
    },
    fuente: {
      texto: "Inspirado en la teoría de los valores humanos básicos de Shalom H. Schwartz. Preguntas originales.",
      enlace: ""
    }
  });
})();
