// Italian copy. REVIEW: the whole file is a translation of es.ts and should be proofread.
import type { Dictionary } from "./es";

const it: Dictionary = {
  meta: {
    title: "Invertir con Valores · Investimenti consapevoli per persone con valori",
    titleTemplate: "%s · Invertir con Valores",
    description:
      "Impara a investire in modo redditizio e consapevole, senza finanziare armi né sfruttamento. Guida gratuita, community su Telegram e un caffè finanziario di 30 minuti.",
    ogAlt: "Invertir con Valores: anche i tuoi soldi hanno dei valori.",
  },
  common: {
    skipToContent: "Vai al contenuto",
    language: "Lingua",
    openMenu: "Apri il menu",
    closeMenu: "Chiudi il menu",
    close: "Chiudi",
    comingSoon: "Prossimamente",
    free: "Gratis",
    backHome: "Torna alla home",
    opensNewTab: "(si apre in una nuova scheda)",
  },
  nav: {
    label: "Navigazione principale",
    links: [
      { label: "Come funziona", anchor: "como-funciona" },
      { label: "Risorse", anchor: "recursos" },
      { label: "Community", anchor: "comunidad" },
      { label: "Blog", href: "/blog" },
      { label: "Chi sono", anchor: "sobre-mi" },
    ],
    cta: "Guida gratis",
  },
  hero: {
    eyebrow: "Investimenti consapevoli per persone con valori",
    title: "Anche i tuoi soldi hanno dei valori.",
    subtitle:
      "Impara a investire in modo redditizio e consapevole, senza finanziare armi né sfruttamento. Semplice, chiaro e in community.",
    primaryCta: "Scarica la guida gratis",
    secondaryCta: "Entra nella community (Telegram)",
    trust: ["Contenuti educativi", "Niente fuffa", "Per partire da zero"],
  },
  values: {
    label: "I nostri valori",
    items: ["Positività", "Ambizione", "Libertà", "Coraggio", "Sostenibilità"],
  },
  problem: {
    title: "Sai cosa fa la tua banca con i tuoi soldi?",
    text: "Mentre i tuoi soldi dormono sul conto, perdono valore ogni anno. E nel frattempo la tua banca li investe al posto tuo: ti dà un rendimento basso e può finanziare armi, petrolio e sfruttamento. Meriti di decidere tu.",
    idleLabel: "Soldi fermi",
    flowLabel: "Soldi con i tuoi valori",
    visualAlt:
      "Illustrazione: a sinistra monete che si spengono piano piano; a destra monete che scorrono verso il verde.",
  },
  transformation: {
    eyebrow: "La trasformazione",
    title: "Dal dubbio alla fiducia",
    before: {
      label: "Prima",
      text: "Ho dei risparmi, ma non so cosa farne. Ho paura di perdere soldi e di finanziare ciò che non condivido.",
    },
    after: {
      label: "Dopo",
      text: "So investire, ho un portafoglio allineato ai miei valori e i miei soldi lavorano per me e per un mondo migliore.",
    },
    feelingsLabel: "Come ti sentirai",
    feelings: ["Coraggiosa", "Sicura", "Libera"],
  },
  how: {
    eyebrow: "Come funziona",
    title: "Ti accompagno da zero fino al tuo primo portafoglio consapevole",
    stepsCountSuffix: "passi, al tuo ritmo",
    steps: [
      { animal: "ant", title: "Risparmia", text: "Metti ordine nelle tue finanze e crea il tuo cuscinetto." },
      {
        animal: "turtle",
        title: "Investi",
        text: "Costruisci un portafoglio di lungo periodo allineato ai tuoi valori.",
      },
      { animal: "bee", title: "Condividi", text: "Impara in community, senza sentirti sola." },
      { animal: "kangaroo", title: "Cresci", text: "La mentalità giusta per fare il salto con fiducia." },
    ],
  },
  resources: {
    eyebrow: "Risorse gratuite",
    title: "Inizia oggi, gratis",
    cards: [
      {
        title: "Guida digitale: i tuoi primi passi per investire",
        text: "Cos'è investire, da dove iniziare e come farlo senza tradire i tuoi valori.",
        badge: "Gratis",
        soon: false,
      },
      {
        title: "Checklist: come analizzare un'azienda",
        text: "Domande semplici per capire se un'azienda fa per te.",
        badge: "Gratis",
        soon: false,
      },
      {
        title: "Calcolatore d'impatto",
        text: "Scopri cosa stanno finanziando i tuoi soldi oggi.",
        badge: "Prossimamente",
        soon: true,
      },
      {
        title: "Modello per controllare le spese (Excel/Notion)",
        text: "Tieni sotto controllo le spese in pochi minuti e scopri quanto puoi risparmiare.",
        badge: "Gratis",
        soon: false,
      },
    ],
    formTitle: "Ricevi la guida via email",
    formText: "Te la mando subito. Niente spam, e puoi disiscriverti quando vuoi.",
    submit: "Voglio la mia guida gratis",
  },
  community: {
    eyebrow: "Community",
    title: "Un alveare di persone che investono con consapevolezza",
    text: "Unisciti al nostro gruppo gratuito su Telegram: condividi i tuoi dubbi, impara e conosci persone con i tuoi stessi valori. Organizziamo anche incontri dal vivo.",
    cta: "Entra su Telegram",
    fallback: "Il gruppo apre a breve. Lasciami la tua email e ti avviso.",
    fallbackCta: "Avvisami",
  },
  coaching: {
    eyebrow: "Coaching gratuito",
    title: "Un caffè finanziario di 30 minuti, senza impegno",
    text: "Raccontami dove sei e cosa vuoi ottenere. Ti darò consigli rapidi per la tua situazione, senza venderti niente.",
    cta: "Prenota il mio caffè virtuale",
    facts: [
      { value: 30, suffix: " min", label: "di chiacchierata" },
      { value: 1, suffix: " a 1", label: "in videochiamata" },
      { value: 0, suffix: " €", label: "senza impegno" },
    ],
    embedTitle: "Calendario per prenotare il caffè finanziario",
    openInNewTab: "Apri il calendario in una nuova scheda",
    loading: "Caricamento del calendario…",
    fallback: "L'agenda apre a breve. Nel frattempo scrivimi su Telegram o iscriviti alla newsletter.",
    fallbackCta: "Avvisami quando apre",
  },
  learning: {
    eyebrow: "Percorso di apprendimento",
    title: "Quando vorrai andare oltre",
    text: "Sto preparando nuovi modi per accompagnarti. Iscriviti alla lista e ti avviso prima di tutti.",
    cta: "Voglio saperne di più",
    offers: [
      {
        id: "premium",
        title: "Community Premium",
        text: "Uno spazio più raccolto per crescere in gruppo, con sessioni dal vivo.",
        soon: false,
      },
      {
        id: "coaching",
        title: "Coaching 1:1",
        text: "Sessioni individuali per costruire il tuo piano, al tuo ritmo.",
        soon: false,
      },
      {
        id: "course",
        title: "Corso passo dopo passo",
        text: "Tutto il necessario per costruire il tuo portafoglio consapevole, passo dopo passo.",
        soon: true,
      },
    ],
    dialogTitle: "Lista d'attesa",
    dialogText: "Lasciami la tua email e ti avviso appena apre. Niente spam.",
    submit: "Iscrivimi",
  },
  blog: {
    eyebrow: "Blog",
    title: "Impara ogni settimana",
    viewAll: "Vedi tutti gli articoli",
    subscribe: "Iscriviti alla newsletter",
    pageTitle: "Blog",
    pageDescription: "Idee semplici per risparmiare, investire e vivere in linea con i tuoi valori.",
    readingTime: "min di lettura",
    draft: "Bozza",
    draftNotice: "Articolo di esempio in bozza. Da rivedere prima della pubblicazione.",
    tagsLabel: "Tag",
    tagTitle: "Articoli su",
    allPosts: "Tutti gli articoli",
    empty: "Presto arriveranno nuovi articoli.",
    fallbackNotice: "Per ora gli articoli sono disponibili solo in spagnolo.",
    backToBlog: "Torna al blog",
    newsletterTitle: "Ti è stato utile?",
    newsletterText: "Ricevi un nuovo articolo ogni settimana via email.",
    disclaimer:
      "Questo articolo ha scopo educativo e non costituisce consulenza finanziaria. Prima di investire informati bene e valuta la tua situazione.",
  },
  about: {
    eyebrow: "Chi sono",
    title: "Ciao, sono Stefano",
    text: "Sono informatico e imprenditore, e ho sempre voluto essere libero: di tempo, di scelte e di soldi. Investo nel lungo periodo e credo che, quando hai più tempo libero, puoi dedicarlo a ciò che ami e ad aiutare gli altri. Qui condivido ciò che imparo, in modo semplice e con ironia. So che essere etici al 100% è impossibile, ma possiamo fare del nostro meglio, insieme.",
    photoAlt: "Foto di Stefano",
    photoPlaceholder: "Foto di Stefano",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Domande frequenti",
    items: [
      {
        q: "Devo essere vegana per unirmi?",
        a: "No. La community è pensata per persone vegane e con valori, ma ogni persona consapevole è benvenuta.",
      },
      {
        q: "Quanti soldi mi servono per iniziare?",
        a: "Puoi iniziare a imparare con qualsiasi cifra. La guida ti spiega da dove cominciare.",
      },
      {
        q: "Cosa significa investire con valori?",
        a: "Scegliere in quali aziende e fondi mettere i tuoi soldi in base al loro impatto su persone, animali e pianeta.",
      },
      {
        q: "Mi dirai in cosa investire?",
        a: "Non offro consulenza finanziaria personalizzata. Ti insegno ad analizzare e a decidere da sola.",
      },
    ],
  },
  finalCta: {
    title: "Fai lavorare i tuoi soldi con i tuoi valori",
    cta: "Scarica la guida gratis",
  },
  footer: {
    tagline: "Investimenti consapevoli per persone con valori.",
    navTitle: "Esplora",
    legalTitle: "Note legali",
    socialTitle: "Seguimi",
    newsletterTitle: "Newsletter",
    newsletterText: "Idee semplici per investire con i tuoi valori, una volta a settimana.",
    newsletterSubmit: "Iscrivimi",
    substackCta: "Iscriviti su Substack",
    legal: {
      notice: "Note legali",
      privacy: "Privacy",
      cookies: "Cookie",
      manageCookies: "Gestisci i cookie",
    },
    disclaimer:
      "Contenuti educativi. Non costituiscono consulenza finanziaria né raccomandazione di investimento. Investire comporta rischi, inclusa la perdita del capitale.",
    rights: "Tutti i diritti riservati.",
  },
  forms: {
    name: "Nome",
    namePlaceholder: "Lorena",
    email: "Email",
    emailPlaceholder: "tu@email.com",
    consentBefore: "Ho letto e accetto la ",
    consentLink: "privacy policy",
    consentAfter: " e voglio ricevere email da Invertir con Valores. Puoi disiscriverti quando vuoi.",
    sending: "Invio in corso…",
    errors: {
      name: "Scrivi il tuo nome.",
      email: "Scrivi un'email valida.",
      consent: "Mi serve il tuo consenso per inviarti email.",
      rateLimit: "Troppi tentativi di fila. Aspetta un minuto e riprova.",
      server: "Qualcosa è andato storto. Riprova tra un momento.",
      summary: "Controlla i campi evidenziati.",
    },
    success: {
      guide: {
        title: "Fatto! Controlla la tua email",
        text: "Ti ho appena inviato la guida. Se non la vedi, guarda nello spam o in promozioni.",
      },
      newsletter: {
        title: "Benvenuta nella newsletter!",
        text: "Ti scriverò presto con la prima idea.",
      },
      waitlist: {
        title: "Sei dentro!",
        text: "Ti scriverò appena ci saranno novità.",
      },
    },
  },
  cookies: {
    title: "Cookie",
    text: "Uso un'analitica rispettosa della privacy solo se la accetti, per capire quali contenuti ti sono utili.",
    accept: "Accetta",
    reject: "Rifiuta",
    more: "Maggiori informazioni",
  },
  notFound: {
    title: "Questa pagina è andata a nuotare",
    text: "Non trovo quello che cerchi. Torna alla home e andiamo avanti insieme.",
  },
  legal: {
    lastUpdated: "Ultimo aggiornamento",
    toComplete: "Questo testo è un modello. Rivedi le parti segnate come [TO COMPLETE] prima di pubblicare.",
  },
  emails: {
    guide: {
      subject: "La tua guida gratuita: primi passi per investire con valori",
      greeting: "Ciao {name},",
      body: "Grazie per esserti unita. Ecco la tua guida per muovere i primi passi e iniziare a investire in modo consapevole.",
      cta: "Scarica la guida",
      pending: "La guida è quasi pronta: te la invierò appena sarà pubblicata.",
    },
    newsletter: {
      subject: "Benvenuta in Invertir con Valores!",
      greeting: "Ciao,",
      body: "Grazie per esserti iscritta. Ogni settimana ti invierò un'idea semplice per risparmiare e investire in linea con i tuoi valori.",
    },
    waitlist: {
      subject: "Sei in lista d'attesa: {offer}",
      greeting: "Ciao,",
      body: "Ti ho iscritta alla lista d'attesa di «{offer}». Sarai tra le prime persone a saperlo quando aprirà.",
    },
    signature: "Un abbraccio,\nStefano",
    unsubscribe: "Ricevi questa email perché ti sei iscritta su Invertir con Valores. Rispondi a questa email se vuoi disiscriverti.",
  },
};

export default it;
