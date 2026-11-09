/* ============================================================
   TEXTOS DEL TEST DE INTERESES VOCACIONALES
   Carreras y ocupaciones pensadas para el contexto argentino.
   ============================================================ */
window.Textos = window.Textos || {};
window.Textos.intereses = {
  intro: "Tu código de tres letras ordena las áreas que más te atraen, de mayor a menor. No te limita: es un punto de partida para explorar opciones. Los intereses suelen estabilizarse con la edad, pero también cambian con la experiencia.",
  advertencia: "Esta herramienta orienta pero no reemplaza una entrevista con un profesional de orientación vocacional. Interés no es lo mismo que habilidad: conviene sumar información sobre tus capacidades y el mercado laboral.",
  tipos: {
    R: {
      titulo: "Realista · El hacedor",
      resumen: "Te gusta lo concreto: ver el resultado de tu trabajo con las manos.",
      detalle: "Las personas realistas disfrutan de actividades prácticas, físicas y técnicas. Prefieren los hechos a las palabras y se sienten cómodas con herramientas, máquinas, el aire libre o el cuerpo. Suelen ser constantes, directas y resolutivas.",
      entornos: "Talleres, obras, campo, laboratorios técnicos, instalaciones, exteriores.",
      ocupaciones: ["Ingeniería mecánica, eléctrica o civil", "Técnico/a electricista, mecánico/a o electromecánico/a", "Agronomía y producción agropecuaria", "Arquitectura y construcción", "Carpintería, herrería y oficios", "Piloto, maquinista o logística de transporte", "Kinesiología y educación física", "Veterinaria", "Seguridad e higiene", "Gastronomía y cocina profesional"]
    },
    I: {
      titulo: "Investigador · El analista",
      resumen: "Te mueve la curiosidad por entender cómo y por qué funcionan las cosas.",
      detalle: "Las personas investigadoras disfrutan de pensar, analizar y resolver problemas complejos. Les gusta el trabajo intelectual, la ciencia, la tecnología y los datos. Suelen ser independientes, precisas y curiosas.",
      entornos: "Laboratorios, universidades, centros de investigación, equipos de tecnología y datos.",
      ocupaciones: ["Medicina y especialidades", "Biología, química y bioquímica", "Física, matemática y estadística", "Ciencia de datos e inteligencia artificial", "Programación e ingeniería de software", "Ingeniería en sistemas o electrónica", "Farmacia y ciencias de la salud", "Investigación científica (CONICET, universidades)", "Geología y ciencias de la tierra", "Análisis económico y financiero"]
    },
    A: {
      titulo: "Artístico · El creador",
      resumen: "Necesitás expresarte y crear algo propio, sin demasiadas reglas rígidas.",
      detalle: "Las personas artísticas valoran la originalidad, la imaginación y la expresión personal. Se sienten más cómodas en ambientes flexibles y poco estructurados. Suelen ser sensibles, intuitivas e independientes.",
      entornos: "Estudios, talleres creativos, medios, teatros, agencias, trabajo freelance.",
      ocupaciones: ["Diseño gráfico, industrial, de indumentaria o web", "Arquitectura y paisajismo", "Comunicación audiovisual, cine y fotografía", "Música, canto e instrumentos", "Artes visuales, escenografía y artes escénicas", "Escritura, periodismo y edición", "Publicidad y creatividad", "Producción de contenido digital", "Docencia en arte", "Animación y videojuegos"]
    },
    S: {
      titulo: "Social · El que acompaña",
      resumen: "Te realiza ayudar, enseñar y mejorar la vida de las personas.",
      detalle: "Las personas sociales disfrutan de trabajar con y para los demás: enseñar, cuidar, acompañar y orientar. Suelen ser empáticas, cooperativas y buenas comunicadoras, con interés por el bienestar de la comunidad.",
      entornos: "Escuelas, hospitales, organizaciones sociales, consultorios, equipos de trabajo humano.",
      ocupaciones: ["Psicología y psicopedagogía", "Docencia en todos los niveles", "Enfermería y obstetricia", "Trabajo social y acción comunitaria", "Fonoaudiología y terapia ocupacional", "Recursos humanos y capacitación", "Nutrición", "Orientación y coaching", "Atención al cliente y hospitalidad", "Mediación y resolución de conflictos"]
    },
    E: {
      titulo: "Emprendedor · El líder",
      resumen: "Te atraen el liderazgo, la persuasión y lograr objetivos ambiciosos.",
      detalle: "Las personas emprendedoras disfrutan de influir, liderar, negociar y asumir riesgos. Suelen ser enérgicas, seguras y competitivas, con foco en los resultados y en el impacto.",
      entornos: "Empresas, ventas, startups, política, estudios jurídicos, gestión de equipos.",
      ocupaciones: ["Administración y dirección de empresas", "Marketing, ventas y comercio exterior", "Derecho y abogacía", "Emprendimientos y negocios propios", "Gerencia y gestión de proyectos", "Gestión pública y política", "Inmobiliaria y finanzas", "Turismo y organización de eventos", "Consultoría", "Periodismo y comunicación institucional"]
    },
    C: {
      titulo: "Convencional · El organizador",
      resumen: "Te sentís cómodo/a con el orden, los procesos claros y los detalles.",
      detalle: "Las personas convencionales valoran la precisión, la organización y la estabilidad. Se destacan en tareas que requieren método, control y confiabilidad. Suelen ser prolijas, eficientes y responsables.",
      entornos: "Oficinas, bancos, administraciones, áreas contables, logística, gestión documental.",
      ocupaciones: ["Contabilidad y auditoría", "Administración y gestión de datos", "Banca y seguros", "Logística y cadena de abastecimiento", "Gestión de calidad y normas", "Secretariado ejecutivo", "Gestión de bases de datos", "Impuestos y finanzas empresariales", "Biblioteconomía y archivística", "Control de gestión"]
    }
  },
  // Textos para las combinaciones de las dos primeras letras
  pares: {
    RI: "Práctico y analítico: te interesa entender cómo funcionan las cosas y construirlas. Ingenierías y áreas técnicas suelen encajar.",
    RA: "Hacer con las manos y crear: el diseño de objetos, la arquitectura y los oficios artísticos pueden ser tu campo.",
    RS: "Te gusta lo concreto y ayudar: salud física, rehabilitación, deporte y trabajos de cuidado práctico.",
    RE: "Hacer y liderar: emprendimientos productivos, construcción, agroindustria y gestión de obras.",
    RC: "Hacer con método: operación técnica, calidad, mantenimiento y procesos industriales.",
    IR: "Analizar y construir: ingeniería, laboratorio aplicado, tecnología y salud técnica.",
    IA: "Mente analítica y creativa: investigación aplicada, diseño de sistemas, arquitectura y videojuegos.",
    IS: "Conocer para ayudar: medicina, psicología, investigación en salud y educación científica.",
    IE: "Pensar para decidir: consultoría, economía, estrategia y emprendimientos de base tecnológica.",
    IC: "Datos y precisión: estadística, auditoría, programación, análisis financiero.",
    AR: "Creatividad con oficio: diseño de producto, escenografía, artesanía y obra.",
    AI: "Imaginación con análisis: diseño de interacción, investigación en artes y tecnología creativa.",
    AS: "Crear para las personas: arteterapia, docencia artística, comunicación social y cultura comunitaria.",
    AE: "Crear y persuadir: publicidad, producción de contenidos, marcas y proyectos culturales.",
    AC: "Creatividad con orden: edición, curaduría, producción editorial y gestión de proyectos creativos.",
    SR: "Ayudar con acción concreta: enfermería, kinesiología, educación física y trabajo comunitario práctico.",
    SI: "Ayudar con fundamento: psicología, salud, educación y ciencias sociales.",
    SA: "Acompañar con sensibilidad: docencia, terapias, música o arte con impacto social.",
    SE: "Ayudar y liderar: dirección de organizaciones, recursos humanos, política social y liderazgo educativo.",
    SC: "Ayudar con orden: administración de salud o educación, atención al público y gestión social.",
    ER: "Liderar lo concreto: empresa propia, producción, comercio y obras.",
    EI: "Decidir con información: estrategia, finanzas, startups y emprendimientos innovadores.",
    EA: "Liderar con creatividad: marketing, medios, moda, gastronomía y emprendimientos culturales.",
    ES: "Liderar con personas: gestión de equipos, ventas consultivas, política, educación y turismo.",
    EC: "Liderar con método: administración, gestión comercial, finanzas y dirección de operaciones.",
    CR: "Orden en lo técnico: control de calidad, operaciones, mantenimiento y gestión técnica.",
    CI: "Orden y análisis: contabilidad, auditoría, estadística y administración de datos.",
    CA: "Orden y estética: edición, diseño editorial, gestión cultural y producción.",
    CS: "Orden al servicio de las personas: administración de instituciones, salud o educación.",
    CE: "Orden para liderar: administración de empresas, gestión de proyectos y control de gestión."
  }
};
