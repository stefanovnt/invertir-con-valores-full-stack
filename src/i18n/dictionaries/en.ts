// English copy. REVIEW: the whole file is a translation of es.ts and should be proofread.
import type { Dictionary } from "./es";

const en: Dictionary = {
  meta: {
    title: "Invertir con Valores · Conscious investing for people with values",
    titleTemplate: "%s · Invertir con Valores",
    description:
      "Learn to invest profitably and consciously, without funding weapons or exploitation. Free guide, Telegram community and a free 30-minute money chat.",
    ogAlt: "Invertir con Valores: your money has values too.",
  },
  common: {
    skipToContent: "Skip to content",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    close: "Close",
    comingSoon: "Coming soon",
    free: "Free",
    backHome: "Back to home",
    opensNewTab: "(opens in a new tab)",
  },
  nav: {
    label: "Main navigation",
    links: [
      { label: "How it works", anchor: "como-funciona" },
      { label: "Resources", anchor: "recursos" },
      { label: "Community", anchor: "comunidad" },
      { label: "Blog", href: "/blog" },
      { label: "About", anchor: "sobre-mi" },
    ],
    cta: "Free guide",
  },
  hero: {
    eyebrow: "Conscious investing for people with values",
    title: "Your money has values too.",
    subtitle:
      "Learn to invest profitably and consciously, without funding weapons or exploitation. Simple, clear and together.",
    primaryCta: "Download the free guide",
    secondaryCta: "Join the community (Telegram)",
    trust: ["Educational content", "No hype", "Start from zero"],
  },
  values: {
    label: "Our values",
    items: ["Positivity", "Ambition", "Freedom", "Courage", "Sustainability"],
  },
  problem: {
    title: "Do you know what your bank does with your money?",
    text: "While your money sleeps in your account, it loses value every year. Meanwhile, your bank invests it for you: it pays you little and may fund weapons, oil and exploitation. You deserve to decide.",
    idleLabel: "Idle money",
    flowLabel: "Money with your values",
    visualAlt:
      "Illustration: on the left, coins slowly fading; on the right, coins flowing towards green.",
  },
  transformation: {
    eyebrow: "The transformation",
    title: "From doubt to confidence",
    before: {
      label: "Before",
      text: "I have savings, but I don't know what to do with them. I'm afraid of losing money and of funding things I don't believe in.",
    },
    after: {
      label: "After",
      text: "I know how to invest, I have a portfolio aligned with my values, and my money works for me and for a better world.",
    },
    feelingsLabel: "How you'll feel",
    feelings: ["Brave", "Confident", "Free"],
  },
  how: {
    eyebrow: "How it works",
    title: "I'll walk with you from zero to your first conscious portfolio",
    stepsCountSuffix: "steps, at your own pace",
    steps: [
      { animal: "ant", title: "Save", text: "Get your finances in order and build your safety net." },
      {
        animal: "turtle",
        title: "Invest",
        text: "Build a long-term portfolio aligned with your values.",
      },
      { animal: "bee", title: "Share", text: "Learn in community, without feeling alone." },
      { animal: "kangaroo", title: "Grow", text: "The mindset to take the leap with confidence." },
    ],
  },
  resources: {
    eyebrow: "Free resources",
    title: "Start today, for free",
    cards: [
      {
        title: "Digital guide: your first steps to investing",
        text: "What investing is, where to start and how to do it without betraying your values.",
        badge: "Free",
        soon: false,
      },
      {
        title: "Checklist: how to analyse a company",
        text: "Simple questions to find out whether a company fits your values.",
        badge: "Free",
        soon: false,
      },
      {
        title: "Impact calculator",
        text: "Find out what your money is funding today.",
        badge: "Coming soon",
        soon: true,
      },
      {
        title: "Expense tracking template (Excel/Notion)",
        text: "Track your spending in minutes and find out how much you can save.",
        badge: "Free",
        soon: false,
      },
    ],
    formTitle: "Get the guide by email",
    formText: "I'll send it right away. No spam, and you can unsubscribe whenever you like.",
    submit: "Send me the free guide",
  },
  community: {
    eyebrow: "Community",
    title: "A hive of people investing with awareness",
    text: "Join our free Telegram group: ask questions, learn and meet people who share your values. We also organise in-person meetups.",
    cta: "Join on Telegram",
    fallback: "The group opens very soon. Leave your email and I'll let you know.",
    fallbackCta: "Let me know",
  },
  coaching: {
    eyebrow: "Free coaching",
    title: "A 30-minute money coffee, no strings attached",
    text: "Tell me where you are and what you want to achieve. I'll give you quick tips for your situation, without selling you anything.",
    cta: "Book my virtual coffee",
    stepsTitle: "How it works",
    steps: [
      "Pick the day and time that suit you best.",
      "Tell me where you are and what you want to achieve.",
      "Leave with practical tips for your situation.",
    ],
    facts: [
      { value: 30, suffix: " min", label: "of conversation" },
      { value: 1, suffix: " to 1", label: "on a video call" },
      { value: 0, suffix: " €", label: "no commitment" },
    ],
    embedTitle: "Calendar to book the money coffee",
    openInNewTab: "Open the calendar in a new tab",
    loading: "Loading calendar…",
    fallback: "Booking opens very soon. In the meantime, message me on Telegram or join the newsletter.",
    fallbackCta: "Tell me when it opens",
  },
  learning: {
    eyebrow: "Learning path",
    title: "When you want to go further",
    text: "I'm preparing new ways to support you. Join the list and you'll be the first to know.",
    cta: "Tell me more",
    offers: [
      {
        id: "premium",
        title: "Premium Community",
        text: "A closer space to make progress as a group, with live sessions.",
        soon: false,
      },
      {
        id: "coaching",
        title: "1:1 Coaching",
        text: "One-to-one sessions to design your plan, at your own pace.",
        soon: false,
      },
      {
        id: "course",
        title: "Step-by-step course",
        text: "Everything you need to build your conscious portfolio, step by step.",
        soon: true,
      },
    ],
    dialogTitle: "Waitlist",
    dialogText: "Leave your email and I'll let you know as soon as it opens. No spam.",
    submit: "Add me",
  },
  blog: {
    eyebrow: "Blog",
    title: "Learn something every week",
    viewAll: "See all articles",
    subscribe: "Subscribe to the newsletter",
    pageTitle: "Blog",
    pageDescription: "Simple ideas to save, invest and live in line with your values.",
    readingTime: "min read",
    draft: "Draft",
    draftNotice: "Sample draft article. To be reviewed before publishing.",
    tagsLabel: "Tags",
    tagTitle: "Articles about",
    allPosts: "All articles",
    empty: "New articles are coming soon.",
    fallbackNotice: "For now, articles are only available in Spanish.",
    backToBlog: "Back to the blog",
    newsletterTitle: "Was this helpful?",
    newsletterText: "Get a new article in your inbox every week.",
    disclaimer:
      "This article is educational and is not financial advice. Before investing, do your research and consider your own situation.",
  },
  about: {
    eyebrow: "About",
    title: "Hi, I'm Stefano",
    text: "I'm a software developer and entrepreneur, and I've always wanted to be free: free with my time, my decisions and my money. I invest for the long term, and I believe that when you have more free time, you can spend it on what you love and on helping others. Here I share what I learn, simply and with a sense of humour. I know being 100% ethical is impossible, but we can do our best, together.",
    photoAlt: "Photo of Stefano",
    photoPlaceholder: "Photo of Stefano",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        q: "Do I need to be vegan to join?",
        a: "No. The community is designed for vegans and values-driven people, but every conscious person is welcome.",
      },
      {
        q: "How much money do I need to start?",
        a: "You can start learning with any amount. The guide explains where to begin.",
      },
      {
        q: "What does investing with values mean?",
        a: "Choosing which companies and funds get your money based on their impact on people, animals and the planet.",
      },
      {
        q: "Will you tell me what to invest in?",
        a: "I don't give personalised financial advice. I teach you to analyse and decide for yourself.",
      },
    ],
  },
  finalCta: {
    title: "Make your money work with your values",
    cta: "Download the free guide",
  },
  footer: {
    tagline: "Conscious investing for people with values.",
    navTitle: "Explore",
    legalTitle: "Legal",
    socialTitle: "Follow me",
    newsletterTitle: "Newsletter",
    newsletterText: "Simple ideas to invest with your values, once a week.",
    newsletterSubmit: "Subscribe",
    substackCta: "Subscribe on Substack",
    legal: {
      notice: "Legal notice",
      privacy: "Privacy",
      cookies: "Cookies",
      manageCookies: "Manage cookies",
    },
    disclaimer:
      "Educational content. It is not financial advice or an investment recommendation. Investing involves risks, including the loss of capital.",
    rights: "All rights reserved.",
  },
  forms: {
    name: "Name",
    namePlaceholder: "Lorena",
    email: "Email",
    emailPlaceholder: "you@email.com",
    consentBefore: "I have read and accept the ",
    consentLink: "privacy policy",
    consentAfter: " and want to receive emails from Invertir con Valores. You can unsubscribe at any time.",
    sending: "Sending…",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email.",
      consent: "I need your consent to send you emails.",
      rateLimit: "Too many attempts in a row. Wait a minute and try again.",
      server: "Something went wrong. Please try again in a moment.",
      summary: "Please check the highlighted fields.",
    },
    success: {
      guide: {
        title: "Done! Check your inbox",
        text: "I've just sent you the guide. If you can't see it, check your spam or promotions folder.",
      },
      newsletter: {
        title: "Welcome to the newsletter!",
        text: "I'll write to you soon with the first idea.",
      },
      waitlist: {
        title: "You're in!",
        text: "I'll write to you as soon as there's news.",
      },
    },
  },
  cookies: {
    title: "Cookies",
    text: "I only use privacy-friendly analytics if you accept, to learn which content is useful to you.",
    accept: "Accept",
    reject: "Reject",
    more: "Learn more",
  },
  notFound: {
    title: "This page went for a swim",
    text: "I can't find what you're looking for. Head back home and let's keep going together.",
  },
  legal: {
    lastUpdated: "Last updated",
    toComplete: "This text is a template. Review the sections marked [TO COMPLETE] before publishing.",
  },
  emails: {
    guide: {
      subject: "Your free guide: first steps to investing with values",
      greeting: "Hi {name},",
      body: "Thanks for joining. Here is your guide to take your first steps and start investing consciously.",
      cta: "Download the guide",
      pending: "The guide is almost ready: I'll send it to you as soon as it's published.",
    },
    newsletter: {
      subject: "Welcome to Invertir con Valores!",
      greeting: "Hi,",
      body: "Thanks for subscribing. Every week I'll send you one simple idea to save and invest in line with your values.",
    },
    waitlist: {
      subject: "You're on the waitlist: {offer}",
      greeting: "Hi,",
      body: "I've added you to the waitlist for “{offer}”. You'll be among the first to know when it opens.",
    },
    signature: "Warmly,\nStefano",
    unsubscribe: "You're receiving this email because you subscribed at Invertir con Valores. Reply to this email if you'd like to unsubscribe.",
  },
};

export default en;
