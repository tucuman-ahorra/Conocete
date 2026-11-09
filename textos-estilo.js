/* ============================================================
   TEXTOS DEL TEST DE ESTILO DE PERSONALIDAD
   16 perfiles con nombres propios. Código: Energía (X/I),
   Percepción (C/A), Decisión (L/V), Estructura (P/F).
   ============================================================ */
window.Textos = window.Textos || {};
window.Textos.estilo = {
  intro: "Tu perfil combina cuatro preferencias. Ninguna es mejor que otra, y la intensidad de cada una importa: cuanto más cerca del centro, más flexible sos entre ambos polos.",
  advertencia: "Esta tipología es una herramienta de reflexión y entretenimiento, con menos respaldo científico que el modelo de los Cinco Grandes. Evitá usarla para decidir contrataciones, parejas o carreras.",
  dimensiones: {
    EN: [
      "Tu energía se dirige hacia afuera: te recargás con la acción, el contacto con gente y los estímulos del entorno.",
      "Tu energía se dirige hacia adentro: te recargás en la calma, la reflexión y los espacios tranquilos."
    ],
    PE: [
      "Percibís desde lo concreto: hechos, detalles, experiencia y lo que se puede comprobar.",
      "Percibís desde lo abstracto: patrones, posibilidades, significados y lo que podría ser."
    ],
    DE: [
      "Decidís con la lógica: análisis objetivo, criterios claros y coherencia.",
      "Decidís desde los valores: el impacto en las personas, la armonía y lo que consideras justo."
    ],
    ES: [
      "Te organizás con estructura: planes, plazos y cierres te dan tranquilidad.",
      "Te organizás con flexibilidad: adaptación, exploración y opciones abiertas te dan libertad."
    ]
  },
  perfiles: {
    XCLP: {
      nombre: "El Organizador",
      resumen: "Práctico, decidido y orientado a resultados; pone orden y hace que las cosas pasen.",
      detalle: "Te sentís cómodo/a liderando, ordenando recursos y cumpliendo metas. Valorás la eficiencia, la claridad y el compromiso. Tu entorno suele contar con vos para que las cosas salgan adelante.",
      fortalezas: ["Liderazgo práctico y decisión", "Gestión de equipos y plazos", "Confiabilidad y constancia"],
      cuidado: ["Impaciencia con quienes van más lento", "Dificultad para escuchar emociones antes de soluciones"],
      trabajo: "Gestión, dirección, administración, logística, fuerzas de seguridad, ventas estructuradas.",
      relaciones: "Mostrás cariño con hechos y compromiso. Ayuda reservar espacio para conversar sin resolver."
    },
    XCLF: {
      nombre: "El Resolutor",
      resumen: "Ágil y práctico; reacciona rápido ante los problemas y disfruta de la acción.",
      detalle: "Te gusta resolver sobre la marcha, probar y ajustar. Los entornos cambiantes te despiertan. Sos persuasivo/a, observador/a y muy bueno/a para leer situaciones en tiempo real.",
      fortalezas: ["Resolución rápida de problemas", "Aplomo en situaciones de crisis", "Habilidad para negociar"],
      cuidado: ["Pueden aburrirte las tareas largas o rutinarias", "Impulsividad al tomar riesgos"],
      trabajo: "Ventas, emergencias, deportes, emprendimientos, mecánica, comercio, producción en vivo.",
      relaciones: "Sos divertido/a y espontáneo/a. Planificar con anticipación fortalece los vínculos."
    },
    XCVP: {
      nombre: "El Anfitrión",
      resumen: "Cálido y atento; cuida a su gente y crea ambientes donde todos se sienten bien.",
      detalle: "Te importa el bienestar del grupo y te movés con naturalidad entre personas. Recordás fechas, gustos y detalles de quienes querés. Valorás las tradiciones y los vínculos estables.",
      fortalezas: ["Empatía y trato cálido", "Organización de eventos y cuidados", "Lealtad y constancia"],
      cuidado: ["Dificultad para decir que no", "Sensibilidad a las críticas"],
      trabajo: "Salud, educación, hospitalidad, atención al cliente, recursos humanos, organización de eventos.",
      relaciones: "Dedicás tiempo y atención. Recordá pedir también lo que necesitás."
    },
    XCVF: {
      nombre: "El Animador",
      resumen: "Espontáneo, alegre y sociable; hace que cualquier lugar se llene de vida.",
      detalle: "Disfrutás de las personas, las experiencias y el presente. Sos generoso/a con tu energía y tenés habilidad para levantar el ánimo del grupo. Te adaptás rápido y te gusta que todo sea un poco divertido.",
      fortalezas: ["Carisma y buen humor", "Adaptación y espontaneidad", "Conexión emocional inmediata"],
      cuidado: ["Evitar temas incómodos o conflictos", "Dificultad con planes a largo plazo"],
      trabajo: "Entretenimiento, turismo, gastronomía, docencia, ventas, redes sociales, estética.",
      relaciones: "Aportás alegría. Ayuda sostener los compromisos aun cuando se pierda la novedad."
    },
    XALP: {
      nombre: "El Estratega",
      resumen: "Visionario y decidido; ve hacia dónde ir y arma el camino para llegar.",
      detalle: "Combinás ideas ambiciosas con capacidad de ejecución. Te gusta planificar a largo plazo, resolver problemas complejos y liderar con claridad. Valorás la competencia y los resultados.",
      fortalezas: ["Visión y planificación", "Liderazgo con propósito", "Pensamiento sistémico"],
      cuidado: ["Exigencia alta con vos y con los demás", "Impaciencia con la lentitud o la ineficiencia"],
      trabajo: "Dirección, consultoría, emprendimientos, derecho, estrategia, tecnología, política.",
      relaciones: "Sos franco/a y comprometido/a. Mostrar vulnerabilidad profundiza la confianza."
    },
    XALF: {
      nombre: "El Innovador",
      resumen: "Curioso e ingenioso; ama debatir ideas y probar enfoques originales.",
      detalle: "Te estimula lo nuevo, las posibilidades y los desafíos intelectuales. Disfrutás conversar, cuestionar y encontrar soluciones creativas. Te aburrís con lo repetitivo.",
      fortalezas: ["Creatividad y rapidez mental", "Facilidad para conectar ideas", "Entusiasmo contagioso"],
      cuidado: ["Dispersión entre muchos proyectos", "Dificultad para terminar lo iniciado"],
      trabajo: "Emprendimiento, marketing, tecnología, consultoría creativa, investigación aplicada, medios.",
      relaciones: "Sos estimulante y divertido/a. Ayuda cumplir las promesas pequeñas con regularidad."
    },
    XAVP: {
      nombre: "El Mentor",
      resumen: "Inspirador y empático; ayuda a otros a crecer y a descubrir su potencial.",
      detalle: "Te mueven las personas y su desarrollo. Tenés visión, calidez y capacidad de organizar a un grupo hacia algo valioso. Sentís responsabilidad por dejar una huella positiva.",
      fortalezas: ["Comunicación inspiradora", "Facilidad para guiar y motivar", "Visión humana del desarrollo"],
      cuidado: ["Te hacés cargo de los problemas de los demás", "Sensibilidad a los conflictos"],
      trabajo: "Docencia, coaching, psicología, liderazgo social, recursos humanos, comunicación, política.",
      relaciones: "Dedicás atención y guía. Ayuda aceptar que cada persona avanza a su ritmo."
    },
    XAVF: {
      nombre: "El Inspirador",
      resumen: "Entusiasta y creativo; contagia ilusión y ve potencial en todo.",
      detalle: "Sos expresivo/a, imaginativo/a y muy conectado/a con los demás. Te gusta descubrir personas y posibilidades, y tenés energía para movilizar a otros con una buena idea.",
      fortalezas: ["Entusiasmo y creatividad", "Empatía y lectura de personas", "Capacidad de motivar"],
      cuidado: ["Pérdida de foco entre ideas", "Agotamiento emocional por sobreimplicarse"],
      trabajo: "Arte, comunicación, docencia, emprendimientos sociales, medios, diseño, terapias.",
      relaciones: "Sos apasionado/a y atento/a. Ayuda poner estructura a las promesas."
    },
    ICLP: {
      nombre: "El Responsable",
      resumen: "Serio, metódico y confiable; cumple lo que dice y cuida los detalles.",
      detalle: "Valorás la responsabilidad, el orden y los hechos comprobables. Trabajás con constancia y prefieren procedimientos claros. Sos una persona de palabra en la que otros se apoyan.",
      fortalezas: ["Confiabilidad y precisión", "Organización y memoria de detalles", "Perseverancia"],
      cuidado: ["Resistencia a cambios repentinos", "Dificultad para delegar"],
      trabajo: "Contabilidad, administración, derecho, ingeniería, auditoría, logística, control de calidad.",
      relaciones: "Mostrás cariño con estabilidad y compromiso. Expresarlo con palabras suma mucho."
    },
    ICLF: {
      nombre: "El Artesano",
      resumen: "Observador y hábil; entiende cómo funcionan las cosas y las arregla con calma.",
      detalle: "Sos tranquilo/a, curioso/a de lo práctico y muy bueno/a para resolver con las manos o con la lógica. Te mueve la libertad para explorar y probar a tu manera.",
      fortalezas: ["Habilidad técnica y práctica", "Calma bajo presión", "Eficiencia y sentido práctico"],
      cuidado: ["Puede costarte expresar lo que sentís", "Evitás compromisos largos"],
      trabajo: "Oficios, ingeniería, mecánica, tecnología, deportes, emergencias, producción técnica.",
      relaciones: "Mostrás afecto con acciones. Contar tus planes ayuda a que otros se sientan incluidos."
    },
    ICVP: {
      nombre: "El Protector",
      resumen: "Leal, detallista y cuidadoso; se ocupa de que los suyos estén bien.",
      detalle: "Sentís un profundo compromiso con las personas que querés. Sos discreto/a y atento/a a las necesidades del entorno. Preferís la estabilidad y las tradiciones que te dan seguridad.",
      fortalezas: ["Lealtad y dedicación", "Atención al detalle y las necesidades", "Calma y constancia"],
      cuidado: ["Postergás tus necesidades por las de otros", "Resistencia a lo desconocido"],
      trabajo: "Salud, educación, administración, servicios sociales, bibliotecas, cuidados, gestión.",
      relaciones: "Sos presente y dedicado/a. Aprender a pedir ayuda fortalece tus vínculos."
    },
    ICVF: {
      nombre: "El Compañero Sensible",
      resumen: "Amable, atento y espontáneo; disfruta de lo simple y de estar con quien quiere.",
      detalle: "Vivís el presente con sensibilidad estética y afectiva. Sos reservado/a pero muy cálido/a en la intimidad. Evitás los conflictos y preferís la libertad para vivir a tu ritmo.",
      fortalezas: ["Sensibilidad y empatía", "Gusto por lo estético y lo simple", "Flexibilidad y calidez"],
      cuidado: ["Evitar discusiones necesarias", "Dificultad para planificar a futuro"],
      trabajo: "Arte aplicado, diseño, cuidado de personas o animales, cocina, naturaleza, estética, terapias.",
      relaciones: "Sos considerado/a y leal. Poner en palabras lo que querés ayuda a que te entiendan."
    },
    IALP: {
      nombre: "El Arquitecto de Ideas",
      resumen: "Estratégico y analítico; diseña sistemas complejos y planes a largo plazo.",
      detalle: "Tenés una mente independiente y orientada a comprender y mejorar los sistemas. Trabajás mejor con autonomía y objetivos claros. Valorás la competencia, la lógica y la innovación bien fundada.",
      fortalezas: ["Pensamiento estratégico y analítico", "Independencia y rigor", "Planificación a largo plazo"],
      cuidado: ["Distancia emocional percibida", "Impaciencia con explicaciones obvias"],
      trabajo: "Investigación, tecnología, ingeniería, ciencia de datos, arquitectura, finanzas, docencia universitaria.",
      relaciones: "Sos leal y profundo/a. Compartir lo que pensás y sentís acerca a los demás."
    },
    IALF: {
      nombre: "El Analista Curioso",
      resumen: "Reflexivo e inventivo; disfruta de entender ideas y explorar teorías.",
      detalle: "Te apasiona entender cómo funcionan las cosas y cuestionar supuestos. Pensás de forma original y preferís la libertad intelectual a las reglas rígidas.",
      fortalezas: ["Análisis profundo y creatividad", "Curiosidad intelectual", "Pensamiento independiente"],
      cuidado: ["Puede costar terminar proyectos", "Poco interés en las tareas rutinarias"],
      trabajo: "Ciencia, programación, filosofía, matemática, escritura, investigación, diseño de sistemas.",
      relaciones: "Aportás ideas y humor. Mostrar interés por la vida cotidiana de los demás suma cercanía."
    },
    IAVP: {
      nombre: "El Guía Silencioso",
      resumen: "Profundo e intuitivo; busca sentido y quiere ayudar a que otros crezcan.",
      detalle: "Sos reservado/a, empático/a y visionario/a. Tenés una brújula interna fuerte y te importa dejar algo valioso en el mundo. Elegís con cuidado a quién abrirte.",
      fortalezas: ["Intuición e inteligencia emocional", "Compromiso con valores", "Capacidad de escuchar con profundidad"],
      cuidado: ["Perfeccionismo e idealización", "Puede drenarte el exceso de contacto"],
      trabajo: "Psicología, escritura, docencia, terapias, orientación, trabajo social, arte con propósito.",
      relaciones: "Sos leal y profundo/a. Dar forma práctica a tus ideales evita la frustración."
    },
    IAVF: {
      nombre: "El Idealista",
      resumen: "Soñador, sensible y auténtico; busca vivir de acuerdo a sus valores.",
      detalle: "Tenés un mundo interior rico, una gran sensibilidad y una profunda necesidad de coherencia. Sos amable y comprensivo/a, con mucha creatividad. Te cuesta sostener entornos que contradicen lo que creés.",
      fortalezas: ["Creatividad y autenticidad", "Empatía profunda", "Apertura mental y compromiso"],
      cuidado: ["Autoexigencia y autocrítica", "Dificultad con estructuras rígidas"],
      trabajo: "Arte, escritura, diseño, terapias, ONGs, ecología, música, docencia creativa.",
      relaciones: "Sos cariñoso/a y fiel. Poner límites y planificar ayuda a cuidar tu energía."
    }
  }
};
