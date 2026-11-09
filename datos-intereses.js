/* ============================================================
   TEST 2: INTERESES VOCACIONALES (modelo RIASEC de Holland)
   Preguntas originales escritas para este sitio, inspiradas en
   la teoría de John Holland (1959). No es el cuestionario de
   ninguna institución: es una guía de orientación.
   ============================================================ */
(function () {
  var Likert = [
    { v: 1, t: "No me gusta nada" },
    { v: 2, t: "Me gusta poco" },
    { v: 3, t: "Me da igual" },
    { v: 4, t: "Me gusta" },
    { v: 5, t: "Me encanta" }
  ];

  var escalas = {
    R: { nombre: "Realista", corta: "Hacer, construir, arreglar, trabajar con herramientas, máquinas, la naturaleza o el cuerpo.", color: "#c8642b" },
    I: { nombre: "Investigador", corta: "Analizar, investigar, resolver problemas complejos y entender cómo funcionan las cosas.", color: "#3b6fd4" },
    A: { nombre: "Artístico", corta: "Crear, expresarte, diseñar, escribir, componer o imaginar algo original.", color: "#b44fa0" },
    S: { nombre: "Social", corta: "Ayudar, enseñar, acompañar y trabajar con personas.", color: "#2f9e6f" },
    E: { nombre: "Emprendedor", corta: "Liderar, persuadir, vender, tomar decisiones y arrancar proyectos.", color: "#d4a017" },
    C: { nombre: "Convencional", corta: "Organizar, ordenar información, seguir procesos y cuidar los detalles.", color: "#5f7a8c" }
  };

  var textos = {
    R: [
      "Arreglar un electrodoméstico o un artefacto que dejó de funcionar.",
      "Armar un mueble o una estructura con mis propias manos.",
      "Trabajar al aire libre cuidando plantas, animales o un terreno.",
      "Manejar herramientas o máquinas para fabricar algo.",
      "Reparar una bicicleta, una moto o un auto.",
      "Hacer una obra o una refacción en una casa.",
      "Practicar deportes o actividades físicas exigentes.",
      "Instalar un sistema eléctrico, de agua o de red."
    ],
    I: [
      "Investigar a fondo por qué ocurre un fenómeno.",
      "Hacer experimentos o pruebas para comprobar una hipótesis.",
      "Resolver problemas lógicos o matemáticos difíciles.",
      "Leer artículos científicos o de divulgación sobre cómo funciona el mundo.",
      "Analizar datos para encontrar patrones o conclusiones.",
      "Estudiar el cuerpo humano, la naturaleza o el universo.",
      "Programar o armar sistemas que resuelvan un problema complejo.",
      "Desarmar algo solo para entender cómo está hecho por dentro."
    ],
    A: [
      "Dibujar, pintar o diseñar algo propio.",
      "Escribir cuentos, poemas, guiones o canciones.",
      "Tocar un instrumento, cantar o componer música.",
      "Actuar, bailar o hacer teatro frente a un público.",
      "Sacar fotos o editar videos de forma creativa.",
      "Decorar un espacio o diseñar un estilo propio de ropa.",
      "Inventar historias, personajes o mundos imaginarios.",
      "Visitar museos, galerías o exposiciones de arte."
    ],
    S: [
      "Enseñarle algo a alguien que quiere aprender.",
      "Escuchar a una persona que está pasando un mal momento.",
      "Ser voluntario/a en una actividad comunitaria.",
      "Cuidar a personas mayores, niños o enfermos.",
      "Ayudar a resolver un conflicto entre dos personas.",
      "Organizar actividades para mejorar la vida de un grupo.",
      "Acompañar a alguien en su proceso de cambio o aprendizaje.",
      "Trabajar en equipo con mucho contacto con la gente."
    ],
    E: [
      "Armar un negocio propio o liderar un proyecto desde cero.",
      "Convencer a otras personas de una idea o un producto.",
      "Negociar precios, acuerdos o condiciones.",
      "Dirigir un equipo y tomar decisiones importantes.",
      "Presentar ideas o proyectos frente a un grupo.",
      "Asumir riesgos calculados para lograr un objetivo ambicioso.",
      "Organizar un evento y conseguir que salga bien.",
      "Competir por un puesto, un premio o un objetivo."
    ],
    C: [
      "Ordenar documentos, archivos o datos de forma prolija.",
      "Llevar las cuentas o el presupuesto de un proyecto.",
      "Seguir un procedimiento paso a paso sin errores.",
      "Revisar un texto o un trabajo para corregir los detalles.",
      "Armar planillas, listas o calendarios para organizarme.",
      "Trabajar con reglas claras y tareas bien definidas.",
      "Mantener un sistema en orden para que nada se pierda.",
      "Controlar que un trabajo cumpla con todas las normas."
    ]
  };

  var items = [];
  Object.keys(textos).forEach(function (k) {
    textos[k].forEach(function (t, i) {
      items.push({ id: k + (i + 1), texto: t, escala: k });
    });
  });

  Motor.registrar({
    id: "intereses",
    nombre: "Intereses vocacionales",
    subtitulo: "Qué tipo de actividades y trabajos encajan con vos",
    icono: "◆",
    color: "#2f9e6f",
    minutos: 7,
    descripcion: "Basado en el modelo RIASEC de Holland, uno de los más usados en orientación vocacional. Te muestra tu código de tres letras y áreas de estudio y trabajo afines.",
    instruccion: "Indicá cuánto te gustaría hacer cada actividad, sin pensar en si sos bueno/a o en cuánto se cobra.",
    rango: [1, 5],
    opciones: Likert,
    escalas: escalas,
    items: items,
    calcular: function (esc) {
      var ord = Motor.ordenarEscalas(esc);
      return { codigo: ord.slice(0, 3).join(""), orden: ord };
    },
    resumen: function (r) { return "Código " + r.extra.codigo; },
    fuente: {
      texto: "Inspirado en la teoría de las personalidades vocacionales de John L. Holland. Preguntas originales.",
      enlace: ""
    }
  });
})();
