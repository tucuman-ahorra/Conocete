/* ============================================================
   TEST 5: INTELIGENCIA EMOCIONAL (autopercepción)
   Cuatro áreas inspiradas en los modelos de Goleman y de
   Salovey-Mayer. Preguntas originales. Mide cómo te percibís
   vos, no una habilidad evaluada objetivamente.
   ============================================================ */
(function () {
  var Likert = [
    { v: 1, t: "Nunca" },
    { v: 2, t: "Casi nunca" },
    { v: 3, t: "A veces" },
    { v: 4, t: "Casi siempre" },
    { v: 5, t: "Siempre" }
  ];

  var escalas = {
    AC: { nombre: "Autoconciencia", corta: "Reconocer lo que sentís y cómo te afecta.", color: "#3b6fd4" },
    AR: { nombre: "Autorregulación", corta: "Manejar tus impulsos y emociones intensas.", color: "#8a5cc7" },
    EM: { nombre: "Empatía", corta: "Percibir y comprender lo que sienten los demás.", color: "#2f9e6f" },
    HS: { nombre: "Habilidades sociales", corta: "Comunicarte, influir y resolver conflictos con otros.", color: "#e8833a" }
  };

  var base = [
    // Autoconciencia
    ["AC1", "Puedo ponerle nombre a lo que siento en cada momento.", "AC", "+"],
    ["AC2", "Me doy cuenta de qué situaciones me ponen de mal humor.", "AC", "+"],
    ["AC3", "A veces no sé por qué me siento como me siento.", "AC", "-"],
    ["AC4", "Reconozco mis límites y mis puntos débiles.", "AC", "+"],
    ["AC5", "Noto cómo mi cuerpo reacciona cuando estoy nervioso/a o tenso/a.", "AC", "+"],
    ["AC6", "Me sorprendo con reacciones que no entiendo de mí mismo/a.", "AC", "-"],
    ["AC7", "Sé qué cosas me dan energía y cuáles me la quitan.", "AC", "+"],
    ["AC8", "Puedo reconocer mis errores sin ponerme a la defensiva.", "AC", "+"],
    // Autorregulación
    ["AR1", "Cuando estoy muy enojado/a, puedo esperar antes de responder.", "AR", "+"],
    ["AR2", "Me cuesta calmarme después de una discusión.", "AR", "-"],
    ["AR3", "Puedo mantener la calma bajo presión.", "AR", "+"],
    ["AR4", "Digo cosas de las que después me arrepiento cuando me enojo.", "AR", "-"],
    ["AR5", "Cuando algo sale mal, me recupero pronto y sigo adelante.", "AR", "+"],
    ["AR6", "Soy capaz de postergar un gusto inmediato para lograr algo más importante.", "AR", "+"],
    ["AR7", "Las preocupaciones me dominan y me cuesta pensar en otra cosa.", "AR", "-"],
    ["AR8", "Tengo formas que me sirven para calmarme (respirar, caminar, escribir, hablar).", "AR", "+"],
    // Empatía
    ["EM1", "Noto cuando alguien está mal aunque no lo diga.", "EM", "+"],
    ["EM2", "Me cuesta ponerme en el lugar de quien piensa distinto a mí.", "EM", "-"],
    ["EM3", "Cuando alguien me cuenta un problema, escucho sin interrumpir.", "EM", "+"],
    ["EM4", "Me doy cuenta cuando mis palabras lastimaron a alguien.", "EM", "+"],
    ["EM5", "Las emociones de los demás me importan aunque no me afecten directamente.", "EM", "+"],
    ["EM6", "Suelo dar consejos antes de entender cómo se siente la otra persona.", "EM", "-"],
    ["EM7", "Puedo reconocer el estado de ánimo de un grupo apenas entro a un lugar.", "EM", "+"],
    ["EM8", "Trato de entender las razones de quien me hace enojar antes de reaccionar.", "EM", "+"],
    // Habilidades sociales
    ["HS1", "Puedo expresar un desacuerdo con respeto.", "HS", "+"],
    ["HS2", "Me cuesta pedir lo que necesito.", "HS", "-"],
    ["HS3", "Logro que los demás se sientan escuchados cuando hablo con ellos.", "HS", "+"],
    ["HS4", "Evito los conflictos aunque eso signifique quedarme con el malestar.", "HS", "-"],
    ["HS5", "Puedo motivar a otros a trabajar juntos hacia un objetivo.", "HS", "+"],
    ["HS6", "Cuando hay una tensión en el grupo, sé cómo ayudar a distenderla.", "HS", "+"],
    ["HS7", "Me resulta fácil construir confianza con gente nueva.", "HS", "+"],
    ["HS8", "Sé decir que no de forma clara y amable.", "HS", "+"]
  ];

  Motor.registrar({
    id: "emocional",
    nombre: "Inteligencia emocional",
    subtitulo: "Cómo manejás tus emociones y tus relaciones",
    icono: "❖",
    color: "#2f9e6f",
    minutos: 6,
    descripcion: "Una autoevaluación de cuatro áreas clave: conocer tus emociones, regularlas, comprender a los demás y relacionarte mejor. Incluye ejercicios concretos para mejorar.",
    instruccion: "Indicá con qué frecuencia te pasa cada situación. Respondé según lo que realmente hacés, no según lo que te gustaría.",
    rango: [1, 5],
    opciones: Likert,
    escalas: escalas,
    items: base.map(function (a) { return { id: a[0], texto: a[1], escala: a[2], inv: a[3] === "-" }; }),
    calcular: function (esc) {
      var claves = Object.keys(esc);
      var total = claves.reduce(function (s, k) { return s + esc[k].porcentaje; }, 0) / claves.length;
      var ord = Motor.ordenarEscalas(esc);
      return { total: Motor.util.redondear(total, 1), fuerte: ord[0], mejorar: ord[ord.length - 1] };
    },
    resumen: function (r) { return "Total " + Math.round(r.extra.total) + "%"; },
    fuente: {
      texto: "Inspirado en los modelos de inteligencia emocional de Daniel Goleman y de Salovey y Mayer. Preguntas originales. Mide autopercepción.",
      enlace: ""
    }
  });
})();
