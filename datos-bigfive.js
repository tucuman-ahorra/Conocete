/* ============================================================
   TEST 1: LOS CINCO GRANDES (Big Five)
   Basado en los 50 marcadores del International Personality
   Item Pool (IPIP, Goldberg 1992), de dominio público.
   La traducción al español es nuestra y no está validada
   científicamente: es una herramienta de autoconocimiento,
   no un diagnóstico.
   ============================================================ */
(function () {
  var Likert5 = [
    { v: 1, t: "Muy en desacuerdo" },
    { v: 2, t: "En desacuerdo" },
    { v: 3, t: "Ni de acuerdo ni en desacuerdo" },
    { v: 4, t: "De acuerdo" },
    { v: 5, t: "Muy de acuerdo" }
  ];

  var escalas = {
    E: { nombre: "Extraversión", polo: ["Reservado", "Sociable"], color: "#e8833a",
         corta: "Cuánta energía sacás de estar con otras personas y de la acción.",
         facetas: "sociabilidad, asertividad, nivel de actividad, búsqueda de emociones" },
    A: { nombre: "Amabilidad", polo: ["Competitivo", "Cooperativo"], color: "#2f9e6f",
         corta: "Cómo te relacionás con los demás: confianza, empatía y cooperación.",
         facetas: "confianza, altruismo, cooperación, modestia, empatía" },
    C: { nombre: "Responsabilidad", polo: ["Flexible", "Organizado"], color: "#3b6fd4",
         corta: "Qué tan ordenado, disciplinado y orientado a objetivos sos.",
         facetas: "orden, autodisciplina, cumplimiento del deber, esfuerzo por logros" },
    N: { nombre: "Estabilidad emocional", polo: ["Sensible", "Estable"], color: "#8a5cc7", invertida: true,
         corta: "Con qué intensidad vivís el estrés, la preocupación y los cambios de ánimo.",
         facetas: "ansiedad, irritabilidad, vulnerabilidad al estrés, cambios de humor" },
    O: { nombre: "Apertura a la experiencia", polo: ["Práctico", "Curioso"], color: "#d4a017",
         corta: "Tu curiosidad, imaginación y gusto por las ideas y lo nuevo.",
         facetas: "imaginación, intelecto, curiosidad, apreciación de la belleza" }
  };

  // dir: "+" directo, "-" invertido. Textos en primera persona.
  var items = [
    // Extraversión
    ["E1", "Soy el alma de la fiesta.", "+"],
    ["E2", "Hablo poco.", "-"],
    ["E3", "Me siento cómodo/a rodeado de gente.", "+"],
    ["E4", "Prefiero quedarme en un segundo plano.", "-"],
    ["E5", "Suelo iniciar las conversaciones.", "+"],
    ["E6", "Tengo poco para decir.", "-"],
    ["E7", "En las reuniones hablo con muchas personas distintas.", "+"],
    ["E8", "No me gusta llamar la atención.", "-"],
    ["E9", "No me molesta ser el centro de atención.", "+"],
    ["E10", "Me quedo callado/a cuando estoy con desconocidos.", "-"],
    // Neuroticismo (se presenta como estabilidad emocional invirtiendo el resultado)
    ["N1", "Me estreso con facilidad.", "+"],
    ["N2", "Estoy relajado/a la mayor parte del tiempo.", "-"],
    ["N3", "Me preocupo por las cosas.", "+"],
    ["N4", "Rara vez me siento decaído/a.", "-"],
    ["N5", "Me altero fácilmente.", "+"],
    ["N6", "Me enojo o me molesto con facilidad.", "+"],
    ["N7", "Mi estado de ánimo cambia mucho.", "+"],
    ["N8", "Tengo cambios de humor frecuentes.", "+"],
    ["N9", "Me irrito con facilidad.", "+"],
    ["N10", "Con frecuencia me siento triste o bajoneado/a.", "+"],
    // Amabilidad
    ["A1", "Me importa poco lo que les pasa a los demás.", "-"],
    ["A2", "Me interesan las personas.", "+"],
    ["A3", "A veces ofendo a la gente.", "-"],
    ["A4", "Entiendo lo que sienten los demás.", "+"],
    ["A5", "No me interesan los problemas ajenos.", "-"],
    ["A6", "Tengo un corazón blando.", "+"],
    ["A7", "En realidad los demás no me interesan.", "-"],
    ["A8", "Me tomo tiempo para ayudar a otros.", "+"],
    ["A9", "Siento las emociones de los demás como propias.", "+"],
    ["A10", "Hago que la gente se sienta cómoda.", "+"],
    // Responsabilidad
    ["C1", "Siempre estoy preparado/a.", "+"],
    ["C2", "Dejo mis cosas tiradas por cualquier lado.", "-"],
    ["C3", "Presto atención a los detalles.", "+"],
    ["C4", "Hago lío con las cosas.", "-"],
    ["C5", "Hago las tareas enseguida, sin dejarlas para después.", "+"],
    ["C6", "Con frecuencia me olvido de guardar las cosas en su lugar.", "-"],
    ["C7", "Me gusta el orden.", "+"],
    ["C8", "Eludo mis obligaciones.", "-"],
    ["C9", "Me manejo con horarios y rutinas.", "+"],
    ["C10", "Soy exigente con la calidad de mi trabajo.", "+"],
    // Apertura
    ["O1", "Tengo un vocabulario amplio.", "+"],
    ["O2", "Me cuesta entender ideas abstractas.", "-"],
    ["O3", "Tengo una imaginación muy viva.", "+"],
    ["O4", "Las ideas abstractas no me interesan.", "-"],
    ["O5", "Tengo ideas excelentes.", "+"],
    ["O6", "No tengo buena imaginación.", "-"],
    ["O7", "Entiendo las cosas rápido.", "+"],
    ["O8", "Uso palabras difíciles.", "+"],
    ["O9", "Dedico tiempo a reflexionar sobre las cosas.", "+"],
    ["O10", "Estoy lleno/a de ideas.", "+"]
  ].map(function (a) {
    return { id: a[0], texto: a[1], escala: a[0].charAt(0), inv: a[2] === "-" };
  });

  Motor.registrar({
    id: "bigfive",
    nombre: "Los Cinco Grandes",
    subtitulo: "El modelo de personalidad más estudiado por la psicología",
    icono: "★",
    color: "#3b6fd4",
    minutos: 8,
    descripcion: "Mide cinco rasgos amplios de tu personalidad: extraversión, amabilidad, responsabilidad, estabilidad emocional y apertura. Es la base de la mayoría de las investigaciones actuales.",
    instruccion: "Indicá qué tan bien te describe cada frase, pensando en cómo sos en general (no en cómo te gustaría ser).",
    rango: [1, 5],
    opciones: Likert5,
    escalas: escalas,
    items: items,
    resumen: function (r) {
      var ord = Motor.ordenarEscalas(r.escalas);
      return escalas[ord[0]].nombre + " y " + escalas[ord[1]].nombre;
    },
    fuente: {
      texto: "Basado en los marcadores IPIP de 50 ítems (Goldberg, 1992). El IPIP es de dominio público.",
      enlace: "https://ipip.ori.org/"
    }
  });
})();
