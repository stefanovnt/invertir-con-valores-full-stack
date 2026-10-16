// Spanish (Spain) copy — the source of truth for every other locale.
// Copy marked "REVIEW" was not in the design spec and was written in the brand voice;
// Stefano should review it before launch.

const es = {
  meta: {
    title:
      "Invertir con Valores · Inversión consciente para personas con valores",
    titleTemplate: "%s · Invertir con Valores",
    // REVIEW
    description:
      "Aprende a invertir de forma rentable y consciente, en productos alineados con tus valores. Newsletter semanal, comunidad y un café financiero gratuito de 15 minutos.",
    ogAlt: "Invertir con Valores: tu dinero también tiene valores.",
  },
  common: {
    skipToContent: "Saltar al contenido",
    language: "Idioma",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    close: "Cerrar",
    comingSoon: "Próximamente",
    free: "Gratis",
    backHome: "Volver al inicio",
    opensNewTab: "(se abre en una pestaña nueva)",
  },
  nav: {
    label: "Navegación principal",
    links: [
      { label: "Cómo funciona", anchor: "como-funciona" },
      { label: "Comunidad", anchor: "comunidad" },
      { label: "Café financiero", anchor: "coaching" }, // REVIEW
      { label: "Blog", href: "/blog" },
      { label: "Sobre mí", anchor: "sobre-mi" },
    ],
    cta: "Newsletter",
  },
  hero: {
    eyebrow: "Inversión consciente para personas con valores",
    title: "Tu dinero también tiene valores.",
    subtitle:
      "Aprende a invertir de forma rentable y consciente, en productos alineados con tus valores. Simple, claro y en comunidad.",
    primaryCta: "Suscribirme a la newsletter",
    secondaryCta: "Unirme a la comunidad",
    trust: ["Contenido educativo", "Sin humo", "Para empezar desde cero"],
  },
  problem: {
    title: "¿Sabes lo que hace tu banco con tu dinero?",
    text: "Mientras tu dinero duerme en la cuenta, pierde valor cada año. Y mientras tanto, tu banco lo invierte por ti: te da poco retorno y puede usarlo en productos que no están alineados con tus valores. Tú mereces decidir.",
    // REVIEW — comparison visual (no figures on purpose: illustrative only)
    bank: {
      title: "Tu dinero en el banco",
      chartLabel: "Lo que pueden comprar tus ahorros",
      trend: "Inflación",
      caption:
        "La inflación se come tus ahorros poco a poco. Y el banco usa tu dinero sin preguntarte.",
      itemsLabel: "Puede invertirlo en",
      items: ["Productos no alineados con tus valores"],
    },
    invested: {
      title: "Tu dinero invertido con valores",
      chartLabel: "Tu dinero a largo plazo",
      trend: "Crecimiento",
      caption:
        "Invertido con paciencia, puede crecer con el tiempo y apoyar lo que te importa.",
      itemsLabel: "Puede apoyar",
      items: ["Personas", "Animales", "Planeta"],
    },
    timeStart: "Hoy",
    timeEnd: "Con los años",
  },
  transformation: {
    eyebrow: "La transformación", // REVIEW
    title: "De la duda a la confianza", // REVIEW
    before: {
      label: "Antes",
      text: "Tengo ahorros, pero no sé qué hacer con ellos. Me da miedo perder dinero y financiar lo que no comparto.",
    },
    after: {
      label: "Después",
      text: "Sé invertir, tengo una cartera alineada con mis valores y mi dinero trabaja por mí y por un mundo mejor.",
    },
    feelingsLabel: "Cómo te sentirás", // REVIEW
    feelings: ["Valiente", "Confiada", "Liberada"],
  },
  how: {
    eyebrow: "Cómo funciona",
    title: "Te acompaño desde cero hasta tu primera cartera consciente",
    // REVIEW — the four stages form a continuous loop, not a ladder
    lead: "No es una escalera, es un ciclo: mientras ahorras e inviertes, también compartes y creces. Y cada vuelta te hace más fuerte.",
    loopLabel: "Un ciclo continuo",
    loopNote: "a tu ritmo",
    steps: [
      {
        animal: "ant",
        title: "Ahorra",
        text: "Ordena tus finanzas y crea tu colchón.",
      },
      {
        animal: "turtle",
        title: "Invierte",
        text: "Construye una cartera a largo plazo alineada con tus valores.",
      },
      {
        animal: "bee",
        title: "Comparte",
        text: "Aprende en comunidad, sin sentirte sola.",
      },
      {
        animal: "kangaroo",
        title: "Crece",
        text: "Mentalidad para dar el salto con confianza.",
      },
    ],
  },
  // REVIEW — whole section (copy not in the original spec)
  firstStep: {
    eyebrow: "Sin perfeccionismo",
    title: "La perfección puede esperar. Tu primer paso, no.",
    text: "Invertir de forma 100% coherente con tus valores es muy difícil, casi imposible: casi todo está conectado con algo que no nos gusta. Pero esperar a hacerlo perfecto es la forma más segura de no empezar nunca. Lo que sí está en tu mano hoy es dar el primer paso para proteger tu patrimonio.",
    listTitle: "Tu primer paso puede ser tan sencillo como:",
    steps: [
      "Saber cuánto tienes y a dónde va tu dinero cada mes.",
      "Crear tu colchón de seguridad.",
      "Entender qué hace hoy tu banco con tus ahorros.",
    ],
    cta: "Dar mi primer paso",
    firstStepLabel: "Tu primer paso",
    perfectLabel: "La perfección",
    perfectNote: "casi imposible",
    hint: "Toca un escalón o arrastra al canguro", // REVIEW
    stepLabel: "Saltar al escalón {n}",
    status: "El canguro está en el escalón {n} de {total}",
    statusGround: "El canguro espera al pie de la escalera",
    visualAlt:
      "Una escalera: el canguro espera al pie, el primer escalón está a tu alcance y la cima, la perfección, se pierde a lo lejos.",
  },
  // REVIEW — newsletter signup (replaces the free resources until the guide exists)
  newsletter: {
    eyebrow: "Newsletter",
    title: "Una idea simple cada semana, directa a tu email",
    text: "Aprende a ahorrar e invertir de acuerdo con tus valores, paso a paso y sin jerga.",
    points: [
      "Ideas prácticas para ahorrar e invertir desde cero",
      "Novedades de la comunidad y de las quedadas",
      "Sin spam: puedes darte de baja cuando quieras",
    ],
    submit: "Suscribirme",
  },
  community: {
    eyebrow: "Comunidad", // REVIEW
    title: "Una colmena de gente que invierte con conciencia",
    // REVIEW
    text: "Un espacio para compartir dudas, aprender y conocer a personas con tus mismos valores. También organizamos quedadas presenciales.",
    note: "Suscríbete a la newsletter y te aviso de cada novedad.", // REVIEW
    cta: "Quiero formar parte", // REVIEW
  },
  coaching: {
    eyebrow: "Coaching gratuito", // REVIEW
    title: "Café financiero de 15 minutos, sin compromiso",
    text: "Cuéntame dónde estás y qué quieres lograr. Te daré consejos rápidos para tu situación, sin venderte nada.",
    cta: "Reservar mi café virtual",
    // REVIEW
    stepsTitle: "Así funciona", // REVIEW
    steps: [
      "Eliges el día y la hora que mejor te vengan.",
      "Me cuentas dónde estás y qué quieres lograr.",
      "Te llevas consejos prácticos para tu situación.",
    ], // REVIEW
    facts: [
      { value: 15, suffix: " min", label: "de conversación" },
      { value: 1, suffix: " a 1", label: "por videollamada" },
      { value: 0, suffix: " €", label: "sin compromiso" },
    ],
    embedTitle: "Calendario para reservar el café financiero",
    openInNewTab: "Abrir el calendario en una pestaña nueva",
    loading: "Cargando calendario…",
    // REVIEW — fallback when NEXT_PUBLIC_CAL_URL is empty
    fallback:
      "La agenda abre muy pronto. Mientras tanto, suscríbete a la newsletter y te aviso en cuanto abra.",
    fallbackCta: "Avísame cuando abra",
  },
  learning: {
    eyebrow: "Camino de aprendizaje",
    title: "Cuando quieras ir más allá", // REVIEW
    text: "Estoy preparando nuevas formas de acompañarte. Apúntate a la lista y te aviso antes que a nadie.", // REVIEW
    cta: "Quiero saber más",
    offers: [
      {
        id: "premium",
        title: "Comunidad Premium",
        text: "Un espacio más cercano para avanzar en grupo, con sesiones en directo.", // REVIEW
        soon: false,
      },
      {
        id: "coaching",
        title: "Coaching 1:1",
        text: "Sesiones individuales para diseñar tu plan, a tu ritmo.", // REVIEW
        soon: false,
      },
      {
        id: "course",
        title: "Curso paso a paso",
        text: "Todo lo necesario para construir tu cartera consciente, paso a paso.", // REVIEW
        soon: true,
      },
    ],
    dialogTitle: "Lista de espera", // REVIEW
    dialogText: "Déjame tu email y te aviso en cuanto abra. Sin spam.", // REVIEW
    submit: "Apuntarme",
  },
  blog: {
    eyebrow: "Blog",
    title: "Aprende cada semana",
    viewAll: "Ver todos los artículos",
    subscribe: "Suscribirme a la newsletter",
    // REVIEW
    pageTitle: "Blog",
    pageDescription:
      "Ideas simples para ahorrar, invertir y vivir de acuerdo con tus valores.",
    readingTime: "min de lectura",
    draft: "Borrador",
    draftNotice:
      "Artículo de ejemplo en borrador. Pendiente de revisión antes de publicarse.",
    tagsLabel: "Etiquetas",
    tagTitle: "Artículos sobre",
    allPosts: "Todos los artículos",
    empty: "Pronto habrá artículos nuevos por aquí.",
    fallbackNotice: "", // Spanish is the original language
    backToBlog: "Volver al blog",
    newsletterTitle: "¿Te ha servido?",
    newsletterText: "Recibe un artículo nuevo cada semana en tu email.",
    disclaimer:
      "Este artículo es educativo y no constituye asesoramiento financiero. Antes de invertir, infórmate bien y valora tu situación.",
  },
  about: {
    eyebrow: "Sobre mí",
    title: "Hola, soy Stefano",
    text: "Soy informático y emprendedor, y siempre he querido ser libre: de tiempo, de decisiones y de dinero. Invierto a largo plazo y creo que, cuando tienes más tiempo libre, puedes dedicarlo a lo que te gusta y a ayudar a los demás. Aquí comparto lo que aprendo, de forma simple y con humor. Sé que ser 100% ético es imposible, pero podemos hacerlo lo mejor posible, juntos.",
    photoAlt: "Foto de Stefano",
    photoPlaceholder: "Foto de Stefano",
  },
  faq: {
    eyebrow: "FAQ", // REVIEW
    title: "Preguntas frecuentes", // REVIEW
    // REVIEW — questions and answers
    items: [
      {
        q: "¿Para quién es Invertir con Valores?",
        a: "Para personas que quieren hacer crecer su dinero sin renunciar a lo que les importa. No necesitas saber nada de finanzas: empezamos desde cero.",
      },
      {
        q: "¿Qué significa invertir con valores?",
        a: "Elegir en qué empresas y fondos pones tu dinero según su impacto en las personas, los animales y el planeta.",
      },
      {
        q: "¿Cuánto dinero necesito para empezar?",
        a: "Para aprender, nada. Para invertir, puedes empezar con poco: lo importante es tener antes tu colchón de seguridad y entender bien lo que haces.",
      },
      {
        q: "¿Invertir con valores es menos rentable?",
        a: "No tiene por qué. Existen productos alineados con valores, diversificados y con costes bajos. Eso sí, ninguna inversión garantiza resultados: por eso aprendemos a entender el riesgo antes de decidir.",
      },
      {
        q: "¿Me vas a decir en qué invertir?",
        a: "No doy asesoramiento financiero personalizado. Te enseño a analizar y decidir por ti misma.",
      },
      {
        q: "¿Qué es el café financiero?",
        a: "Una videollamada gratuita de 15 minutos para conocerte, entender tu situación y darte ideas para tus próximos pasos. Sin compromiso y sin venderte nada.",
      },
    ],
  },
  finalCta: {
    title: "Haz que tu dinero trabaje con tus valores",
    cta: "Suscribirme a la newsletter",
  },
  footer: {
    tagline: "Inversión consciente para personas con valores.",
    navTitle: "Explora", // REVIEW
    legalTitle: "Legal",
    socialTitle: "Sígueme", // REVIEW
    newsletterTitle: "Newsletter",
    newsletterText:
      "Ideas simples para invertir con tus valores, una vez por semana.", // REVIEW
    newsletterSubmit: "Suscribirme",
    substackCta: "Suscribirme en Substack",
    legal: {
      notice: "Aviso legal",
      privacy: "Privacidad",
      cookies: "Cookies",
      manageCookies: "Gestionar cookies",
    },
    disclaimer:
      "Contenido educativo. No constituye asesoramiento financiero ni recomendación de inversión. Invertir conlleva riesgos, incluida la pérdida de capital.",
    rights: "Todos los derechos reservados.",
  },
  forms: {
    name: "Nombre",
    namePlaceholder: "Lorena",
    email: "Email",
    emailPlaceholder: "tu@email.com",
    consentBefore: "He leído y acepto la ",
    consentLink: "política de privacidad",
    consentAfter:
      " y quiero recibir emails de Invertir con Valores. Puedes darte de baja cuando quieras.",
    sending: "Enviando…",
    errors: {
      name: "Escribe tu nombre.",
      email: "Escribe un email válido.",
      consent: "Necesito tu consentimiento para enviarte emails.",
      rateLimit:
        "Demasiados intentos seguidos. Espera un minuto y vuelve a probar.",
      server: "Algo ha fallado. Inténtalo de nuevo en un momento.",
      summary: "Revisa los campos marcados.",
    },
    success: {
      guide: {
        title: "¡Hecho! Revisa tu email",
        text: "Te acabo de enviar la guía. Si no la ves, mira en spam o en promociones.",
      },
      newsletter: {
        title: "¡Bienvenida a la newsletter!",
        text: "Te escribiré pronto con la primera idea.",
      },
      waitlist: {
        title: "¡Estás dentro!",
        text: "Te escribiré en cuanto haya novedades.",
      },
    },
  },
  cookies: {
    title: "Cookies", // REVIEW
    text: "Uso analítica respetuosa con la privacidad solo si la aceptas, para saber qué contenido te resulta útil.",
    accept: "Aceptar",
    reject: "Rechazar",
    more: "Más información",
  },
  legal: {
    lastUpdated: "Última actualización",
    toComplete:
      "Este texto es una plantilla. Revisa los apartados marcados como [TO COMPLETE] antes de publicar.",
  },
  emails: {
    guide: {
      subject: "Tu guía gratis: primeros pasos para invertir con valores",
      greeting: "Hola {name},",
      body: "Gracias por unirte. Aquí tienes tu guía para dar los primeros pasos y empezar a invertir de forma consciente.",
      cta: "Descargar la guía",
      pending:
        "La guía está casi lista: te la enviaré en cuanto esté publicada.",
    },
    newsletter: {
      subject: "¡Bienvenida a Invertir con Valores!",
      greeting: "Hola,",
      body: "Gracias por suscribirte. Cada semana te enviaré una idea simple para ahorrar e invertir de acuerdo con tus valores.",
    },
    waitlist: {
      subject: "Estás en la lista de espera: {offer}",
      greeting: "Hola,",
      body: "Te he apuntado a la lista de espera de «{offer}». Serás de las primeras personas en saberlo cuando abra.",
    },
    signature: "Un abrazo,\nStefano",
    unsubscribe:
      "Recibes este email porque te has suscrito en Invertir con Valores. Responde a este correo si quieres darte de baja.",
  },
};

export default es;
export type Dictionary = typeof es;
