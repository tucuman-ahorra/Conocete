/* ============================================================
   TEST 3: ESTILO DE PERSONALIDAD (16 perfiles)
   Inspirado en la idea clásica de las cuatro preferencias de
   Carl Jung, con preguntas, nombres y descripciones propios.
   NO es el MBTI ni ninguna prueba oficial, y la tipología
   tiene menos respaldo científico que el modelo Big Five.
   Se presenta como herramienta de reflexión y entretenimiento.
   ============================================================ */
(function () {
  var Likert = [
    { v: 1, t: "Nada de acuerdo" },
    { v: 2, t: "Poco de acuerdo" },
    { v: 3, t: "Intermedio" },
    { v: 4, t: "Bastante de acuerdo" },
    { v: 5, t: "Totalmente de acuerdo" }
  ];

  // cada escala mide el POLO A (alto = polo A). Los ítems del polo B van invertidos.
  var escalas = {
    EN: { nombre: "Energía", polos: ["Hacia afuera", "Hacia adentro"], letras: ["X", "I"], color: "#e8833a",
          corta: "Dónde recargás energía: en la acción y la gente, o en la calma y tu mundo interno." },
    PE: { nombre: "Percepción", polos: ["Concreta", "Abstracta"], letras: ["C", "A"], color: "#3b6fd4",
          corta: "A qué le prestás atención: a los hechos y el presente, o a las ideas y posibilidades." },
    DE: { nombre: "Decisión", polos: ["Lógica", "Valores"], letras: ["L", "V"], color: "#2f9e6f",
          corta: "Cómo decidís: con análisis objetivo o priorizando valores y personas." },
    ES: { nombre: "Estructura", polos: ["Planificada", "Flexible"], letras: ["P", "F"], color: "#8a5cc7",
          corta: "Cómo organizás tu vida: con planes y cierres, o con apertura y adaptación." }
  };

  // [id, texto, escala, polo ("A" suma, "B" invierte)]
  var base = [
    // ENERGÍA: A = hacia afuera, B = hacia adentro
    ["EN1", "Después de un día largo, prefiero salir con gente antes que quedarme solo/a.", "EN", "A"],
    ["EN2", "Necesito tiempo a solas para recuperarme después de mucha interacción.", "EN", "B"],
    ["EN3", "Pienso mejor cuando hablo las ideas en voz alta con alguien.", "EN", "A"],
    ["EN4", "Prefiero pensar bien las cosas por dentro antes de decirlas.", "EN", "B"],
    ["EN5", "Me resulta fácil iniciar conversación con personas que no conozco.", "EN", "A"],
    ["EN6", "Elijo pocas amistades pero muy profundas antes que muchas conocidas.", "EN", "B"],
    ["EN7", "Me siento a gusto en eventos con mucha gente y movimiento.", "EN", "A"],
    ["EN8", "Mi mundo interior, con mis pensamientos y fantasías, me resulta muy rico.", "EN", "B"],
    ["EN9", "Aprendo mejor haciendo cosas y en grupo que leyendo en soledad.", "EN", "A"],
    ["EN10", "Un plan ideal para mí es una tarde tranquila en casa o con una sola persona.", "EN", "B"],
    // PERCEPCIÓN: A = concreta, B = abstracta
    ["PE1", "Prefiero instrucciones claras y paso a paso antes que un panorama general.", "PE", "A"],
    ["PE2", "Me atraen las teorías, los significados ocultos y las posibilidades futuras.", "PE", "B"],
    ["PE3", "Confío más en la experiencia y en lo que ya se probó que funciona.", "PE", "A"],
    ["PE4", "Me aburro con los detalles y prefiero ver el cuadro completo.", "PE", "B"],
    ["PE5", "Me fijo mucho en lo que ocurre en el momento: sonidos, olores, detalles del entorno.", "PE", "A"],
    ["PE6", "Con frecuencia me pierdo en mis pensamientos imaginando escenarios posibles.", "PE", "B"],
    ["PE7", "Prefiero hablar de cosas reales y prácticas antes que de conceptos abstractos.", "PE", "A"],
    ["PE8", "Disfruto encontrar conexiones entre ideas que parecen no tener relación.", "PE", "B"],
    ["PE9", "Cuando aprendo algo nuevo, quiero ver primero para qué sirve en la vida real.", "PE", "A"],
    ["PE10", "Prefiero innovar y probar caminos nuevos antes que repetir métodos conocidos.", "PE", "B"],
    // DECISIÓN: A = lógica, B = valores
    ["DE1", "Al decidir, priorizo lo que es objetivamente más justo o más eficiente.", "DE", "A"],
    ["DE2", "Al decidir, pienso mucho en cómo le va a caer a las personas involucradas.", "DE", "B"],
    ["DE3", "Prefiero que me digan la verdad directa, aunque duela.", "DE", "A"],
    ["DE4", "Evito decir cosas que puedan herir, aunque sean ciertas.", "DE", "B"],
    ["DE5", "En una discusión me importa más tener razón que mantener el clima.", "DE", "A"],
    ["DE6", "Me afectan mucho los problemas de los demás y me cuesta ser indiferente.", "DE", "B"],
    ["DE7", "Valoro más la competencia y la capacidad que la simpatía en una persona.", "DE", "A"],
    ["DE8", "Para mí la armonía en el grupo es más importante que tener la mejor solución.", "DE", "B"],
    ["DE9", "Analizo pros y contras de forma fría antes de decidir algo importante.", "DE", "A"],
    ["DE10", "Mis decisiones se guían principalmente por lo que siento que es correcto.", "DE", "B"],
    // ESTRUCTURA: A = planificada, B = flexible
    ["ES1", "Me siento mejor cuando tengo un plan claro para el día o la semana.", "ES", "A"],
    ["ES2", "Prefiero dejar las opciones abiertas por si surge algo mejor.", "ES", "B"],
    ["ES3", "Termino lo que empiezo antes de pasar a otra cosa.", "ES", "A"],
    ["ES4", "Trabajo mejor con la presión de último momento.", "ES", "B"],
    ["ES5", "Me incomoda que cambien los planes a último minuto.", "ES", "A"],
    ["ES6", "Me gusta improvisar y ver cómo se dan las cosas.", "ES", "B"],
    ["ES7", "Armo listas y las voy tachando una por una.", "ES", "A"],
    ["ES8", "Los horarios y las reglas estrictas me hacen sentir limitado/a.", "ES", "B"],
    ["ES9", "Prefiero tomar una decisión y cerrar el tema cuanto antes.", "ES", "A"],
    ["ES10", "Prefiero seguir explorando opciones antes de comprometerme con una.", "ES", "B"]
  ];

  var items = base.map(function (a) {
    return { id: a[0], texto: a[1], escala: a[2], inv: a[3] === "B", bloque: a[2] };
  });

  Motor.registrar({
    id: "estilo",
    nombre: "Estilo de personalidad",
    subtitulo: "Descubrí cuál de los 16 perfiles se parece más a vos",
    icono: "◎",
    color: "#b44fa0",
    minutos: 9,
    descripcion: "Cuatro preferencias que combinadas forman 16 perfiles. Es una herramienta de reflexión y conversación, ideal para conocerte y entender cómo te llevás con otros estilos.",
    instruccion: "Elegí qué tan de acuerdo estás con cada frase. No hay respuestas correctas: pensá en lo que te sale naturalmente.",
    rango: [1, 5],
    opciones: Likert,
    escalas: escalas,
    items: items,
    agruparPorBloques: false,
    calcular: function (esc) {
      var codigo = "";
      var dim = {};
      Object.keys(escalas).forEach(function (k) {
        var p = esc[k].porcentaje;
        var a = p >= 50;
        codigo += escalas[k].letras[a ? 0 : 1];
        var fuerza = Math.abs(p - 50) * 2;
        dim[k] = { polo: a ? 0 : 1, fuerza: Math.round(fuerza), pct: p };
      });
      return { codigo: codigo, dim: dim };
    },
    resumen: function (r) { return "Perfil " + r.extra.codigo; },
    fuente: {
      texto: "Preguntas y perfiles originales, inspirados en las preferencias psicológicas de Carl Jung. No es el MBTI.",
      enlace: ""
    }
  });
})();
