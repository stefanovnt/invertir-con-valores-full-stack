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
      "Aprende a invertir de forma rentable y consciente, sin financiar armas ni explotación. Guía gratis, comunidad en Telegram y café financiero de 30 minutos.",
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
      { label: "Recursos", anchor: "recursos" },
      { label: "Comunidad", anchor: "comunidad" },
      { label: "Blog", href: "/blog" },
      { label: "Sobre mí", anchor: "sobre-mi" },
    ],
    cta: "Guía gratis",
  },
  hero: {
    eyebrow: "Inversión consciente para personas con valores",
    title: "Tu dinero también tiene valores.",
    subtitle:
      "Aprende a invertir de forma rentable y consciente, sin financiar armas ni explotación. Simple, claro y en comunidad.",
    primaryCta: "Descargar la guía gratis",
    secondaryCta: "Unirme a la comunidad (Telegram)",
    trust: ["Contenido educativo", "Sin humo", "Para empezar desde cero"],
  },
  values: {
    label: "Nuestros valores",
    items: [
      "Positividad",
      "Ambición",
      "Libertad",
      "Valentía",
      "Sostenibilidad",
    ],
  },
  problem: {
    title: "¿Sabes lo que hace tu banco con tu dinero?",
    text: "Mientras tu dinero duerme en la cuenta, pierde valor cada año. Y mientras tanto, tu banco lo invierte por ti: te da poco retorno y puede financiar armas, petróleo y explotación. Tú mereces decidir.",
    // REVIEW
    idleLabel: "Dinero quieto",
    flowLabel: "Dinero con tus valores",
    visualAlt:
      "Ilustración: a la izquierda, monedas que se apagan poco a poco; a la derecha, monedas que fluyen hacia el verde.",
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
    // REVIEW — the number is animated
    stepsCountSuffix: "pasos, a tu ritmo",
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
  resources: {
    eyebrow: "Recursos gratis",
    title: "Empieza hoy, gratis",
    // REVIEW — card descriptions
    cards: [
      {
        title: "Guía digital: tus primeros pasos para invertir",
        text: "Qué es invertir, por dónde empezar y cómo hacerlo sin traicionar tus valores.",
        badge: "Gratis",
        soon: false,
      },
      {
        title: "Checklist: cómo analizar una empresa",
        text: "Preguntas sencillas para saber si una empresa encaja contigo.",
        badge: "Gratis",
        soon: false,
      },
      {
        title: "Calculadora de impacto",
        text: "Descubre qué está financiando tu dinero hoy.",
        badge: "Próximamente",
        soon: true,
      },
      {
        title: "Plantilla de control de gastos (Excel/Notion)",
        text: "Controla tus gastos en minutos y encuentra tu capacidad de ahorro.",
        badge: "Gratis",
        soon: false,
      },
    ],
    formTitle: "Recibe la guía en tu email", // REVIEW
    formText:
      "Te la envío al momento. Sin spam, y puedes darte de baja cuando quieras.", // REVIEW
    submit: "Quiero mi guía gratis",
  },
  community: {
    eyebrow: "Comunidad", // REVIEW
    title: "Una colmena de gente que invierte con conciencia",
    text: "Únete a nuestro grupo gratuito de Telegram: comparte dudas, aprende y conoce a personas con tus mismos valores. También organizamos quedadas presenciales.",
    cta: "Entrar en Telegram",
    // REVIEW — fallback when NEXT_PUBLIC_TELEGRAM_URL is empty
    fallback: "El grupo abre muy pronto. Déjame tu email y te aviso.",
    fallbackCta: "Avísame",
  },
  coaching: {
    eyebrow: "Coaching gratuito", // REVIEW
    title: "Café financiero de 30 minutos, sin compromiso",
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
      { value: 30, suffix: " min", label: "de conversación" },
      { value: 1, suffix: " a 1", label: "por videollamada" },
      { value: 0, suffix: " €", label: "sin compromiso" },
    ],
    embedTitle: "Calendario para reservar el café financiero",
    openInNewTab: "Abrir el calendario en una pestaña nueva",
    loading: "Cargando calendario…",
    // REVIEW — fallback when NEXT_PUBLIC_CAL_URL is empty
    fallback:
      "La agenda abre muy pronto. Mientras tanto, escríbeme por Telegram o apúntate a la newsletter.",
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
    items: [
      {
        q: "¿Necesito ser vegana para unirme?",
        a: "No. La comunidad está pensada para personas veganas y con valores, pero cualquier persona consciente es bienvenida.",
      },
      {
        q: "¿Cuánto dinero necesito para empezar?",
        a: "Puedes empezar a aprender con cualquier cantidad. La guía te explica por dónde comenzar.",
      },
      {
        q: "¿Qué significa invertir con valores?",
        a: "Elegir en qué empresas y fondos pones tu dinero según su impacto en las personas, los animales y el planeta.",
      },
      {
        q: "¿Me vas a decir en qué invertir?",
        a: "No doy asesoramiento financiero personalizado. Te enseño a analizar y decidir por ti misma.",
      },
    ],
  },
  finalCta: {
    title: "Haz que tu dinero trabaje con tus valores",
    cta: "Descargar la guía gratis",
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
