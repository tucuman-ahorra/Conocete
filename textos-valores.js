/* ============================================================
   TEXTOS DEL TEST DE VALORES PERSONALES
   ============================================================ */
window.Textos = window.Textos || {};
window.Textos.valores = {
  intro: "Tus valores son los principios que orientan lo que hacés y cómo decidís. Este resultado los ordena de acuerdo a tu propia escala: lo importante no es el número absoluto sino qué valores quedan arriba y cuáles abajo.",
  advertencia: "No hay valores buenos ni malos. Los conflictos aparecen cuando dos valores importantes se oponen. Esta herramienta es de autoconocimiento.",
  tipos: {
    AU: {
      titulo: "Autonomía",
      resumen: "Valorás pensar con cabeza propia, la libertad y la creatividad.",
      detalle: "Te gusta elegir tu camino, explorar y crear. Sentís que la libertad de decisión es fundamental. En lo laboral, suele ir de la mano con trabajos con autonomía y espacio para la iniciativa.",
      equilibrio: "Contrapesa con: conformidad y seguridad. Puede costarte seguir normas rígidas o rutinas impuestas.",
      consejo: "Buscá trabajos y proyectos donde puedas decidir cómo hacer las cosas."
    },
    ES: {
      titulo: "Estimulación",
      resumen: "Te mueven la novedad, la aventura y los desafíos.",
      detalle: "Necesitás variedad y retos para sentirte vivo/a. La rutina te cansa y tenés ganas de probar cosas nuevas.",
      equilibrio: "Contrapesa con: seguridad y tradición. Puede generar tensión con quienes valoran la estabilidad.",
      consejo: "Incorporá novedades a tu vida de forma planificada, para que la aventura no desordene lo importante."
    },
    HE: {
      titulo: "Disfrute",
      resumen: "Querés que la vida sea placentera y la disfrutás sin culpa.",
      detalle: "Priorizás el bienestar, los gustos y el descanso. Tenés una actitud de aprovechar el presente.",
      equilibrio: "Contrapesa con: logro y conformidad. Puede chocar con entornos muy exigentes o austeros.",
      consejo: "Buscá un equilibrio entre disfrute inmediato y objetivos a largo plazo."
    },
    LO: {
      titulo: "Logro",
      resumen: "Querés demostrar tu capacidad y alcanzar metas ambiciosas.",
      detalle: "Te impulsa el éxito personal, el reconocimiento y la mejora continua. Sos muy buen/a ejecutor/a de objetivos.",
      equilibrio: "Contrapesa con: benevolencia y disfrute. El riesgo es medir tu valor solo por resultados.",
      consejo: "Definí qué significa éxito para vos, y no solo para los demás."
    },
    PO: {
      titulo: "Poder",
      resumen: "Valorás la influencia, el estatus y el control sobre los recursos.",
      detalle: "Te interesa liderar, tener peso en las decisiones y contar con recursos propios. Bien canalizado, impulsa liderazgo y emprendimiento.",
      equilibrio: "Contrapesa con: universalismo y benevolencia. Importa cuidar cómo ejercés tu influencia.",
      consejo: "Buscá roles de liderazgo con responsabilidad y rendición de cuentas."
    },
    SE: {
      titulo: "Seguridad",
      resumen: "Necesitás estabilidad, orden y sentirte protegido/a.",
      detalle: "Valorás la tranquilidad, la previsibilidad y el cuidado del futuro. Planificás para evitar sorpresas.",
      equilibrio: "Contrapesa con: estimulación y autonomía. Los cambios bruscos pueden generarte estrés.",
      consejo: "Armá un colchón (ahorros, rutinas, redes de apoyo) que te permita animarte a cambios."
    },
    CO: {
      titulo: "Conformidad",
      resumen: "Valorás respetar las normas y cuidar la convivencia.",
      detalle: "Tratás de actuar correctamente y de no incomodar a los demás. Valorás el respeto, la cortesía y la responsabilidad social.",
      equilibrio: "Contrapesa con: autonomía y estimulación. A veces puede costarte expresar desacuerdos.",
      consejo: "Practicá decir lo que pensás con respeto, aun cuando no coincida con el grupo."
    },
    TR: {
      titulo: "Tradición",
      resumen: "Te importan las raíces, las costumbres y las creencias que te formaron.",
      detalle: "Valorás lo heredado de tu familia, tu cultura o tu fe, y te da sentido de pertenencia. Sos humilde y respetuoso/a de lo establecido.",
      equilibrio: "Contrapesa con: estimulación, autonomía y disfrute. Puede haber tensión con quienes buscan cambios rápidos.",
      consejo: "Conversá con personas de distintas generaciones: enriquece tu mirada sin perder tus raíces."
    },
    BE: {
      titulo: "Benevolencia",
      resumen: "Te importa cuidar y estar presente para tu gente.",
      detalle: "Tus vínculos cercanos son prioritarios. Sos leal, solidario/a y confiable, y encontrás sentido en ayudar.",
      equilibrio: "Contrapesa con: logro y poder. Podés descuidar tus propias necesidades.",
      consejo: "Cuidarte a vos también es parte de poder cuidar a otros."
    },
    UN: {
      titulo: "Universalismo",
      resumen: "Te importan la justicia, la igualdad y el bienestar de todos y del planeta.",
      detalle: "Tenés una mirada amplia: valorás la diversidad, el cuidado ambiental y los derechos de las personas más allá de tu círculo cercano.",
      equilibrio: "Contrapesa con: seguridad y tradición. Puede generar frustración cuando el mundo no cambia al ritmo que querés.",
      consejo: "Elegí una causa concreta y local para volcar tu energía y ver resultados."
    }
  },
  combos: [
    { top: ["BE", "UN"], texto: "Tus valores principales giran en torno al cuidado de los demás y de la comunidad: tu mejor realización suele estar en trabajos con propósito social." },
    { top: ["LO", "PO"], texto: "Valorás el éxito y la influencia: encajás en entornos competitivos, de liderazgo y de resultados." },
    { top: ["AU", "ES"], texto: "Libertad y novedad: te realizás en proyectos propios, creativos o con mucha autonomía." },
    { top: ["SE", "TR"], texto: "Estabilidad y raíces: te sentís bien en entornos previsibles, con vínculos de largo plazo." },
    { top: ["HE", "ES"], texto: "Disfrute y aventura: buscás una vida con experiencias y energía, más que con rutinas largas." },
    { top: ["CO", "SE"], texto: "Orden y seguridad: tu fortaleza es la confiabilidad y la constancia." }
  ]
};
