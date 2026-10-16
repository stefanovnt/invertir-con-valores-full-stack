// English copy. REVIEW: the whole file is a translation of es.ts and should be proofread.
import type { Dictionary } from "./es";

const en: Dictionary = {
  meta: {
    title: "Invertir con Valores · Conscious investing for people with values",
    titleTemplate: "%s · Invertir con Valores",
    description:
      "Learn to invest profitably and consciously, in products aligned with your values. Weekly newsletter, community and a free 15-minute money coffee.",
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
      { label: "Community", anchor: "comunidad" },
      { label: "Money coffee", anchor: "coaching" },
      { label: "Blog", href: "/blog" },
      { label: "About", anchor: "sobre-mi" },
    ],
    cta: "Newsletter",
  },
  hero: {
    eyebrow: "Conscious investing for people with values",
    title: "Your money has values too.",
    subtitle:
      "Learn to invest profitably and consciously, in products aligned with your values. Simple, clear and together.",
    primaryCta: "Subscribe to the newsletter",
    secondaryCta: "Join the community",
  },
  problem: {
    title: "Do you know what your bank does with your money?",
    text: "While your money sleeps in your account, it loses value every year. Meanwhile, your bank invests it for you: it pays you little and may put it into products that aren't aligned with your values. You deserve to decide.",
    bank: {
      title: "Your money in the bank",
      chartLabel: "What your savings can buy",
      trend: "Inflation",
      caption:
        "Inflation slowly eats away at your savings. And the bank uses your money without asking you.",
      itemsLabel: "May invest it in",
      items: ["Products not aligned with your values"],
    },
    invested: {
      title: "Your money invested with values",
      chartLabel: "Your money over the long term",
      trend: "Growth",
      caption:
        "Invested patiently, it can grow over time and support what you care about.",
      itemsLabel: "Can support",
      items: ["People", "Animals", "Planet"],
    },
    timeStart: "Today",
    timeEnd: "Over the years",
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
    lead: "It's not a ladder, it's a cycle: while you save and invest, you also share and grow. And every round makes you stronger.",
    loopLabel: "A continuous cycle",
    loopNote: "at your own pace",
    steps: [
      {
        animal: "ant",
        title: "Save",
        text: "Get your finances in order and build your safety net.",
      },
      {
        animal: "turtle",
        title: "Invest",
        text: "Build a long-term portfolio aligned with your values.",
      },
      {
        animal: "bee",
        title: "Share",
        text: "Learn in community, without feeling alone.",
      },
      {
        animal: "kangaroo",
        title: "Grow",
        text: "The mindset to take the leap with confidence.",
      },
    ],
  },
  firstStep: {
    eyebrow: "No perfectionism",
    title: "Perfection can wait. Your first step can't.",
    text: "Investing in a way that's 100% aligned with your values is really hard, almost impossible: almost everything is connected to something we don't like. But waiting to do it perfectly is the surest way to never start. What you can do today is take the first step to protect your wealth.",
    listTitle: "Your first step can be as simple as:",
    steps: [
      "Knowing how much you have and where your money goes each month.",
      "Building your safety net.",
      "Understanding what your bank does with your savings today.",
    ],
    cta: "Take my first step",
    firstStepLabel: "Your first step",
    perfectLabel: "Perfection",
    perfectNote: "almost impossible",
    hint: "Tap a step or drag the kangaroo",
    stepLabel: "Jump to step {n}",
    status: "The kangaroo is on step {n} of {total}",
    statusGround: "The kangaroo is waiting at the bottom of the stairs",
    visualAlt:
      "A staircase: the kangaroo waits at the bottom, the first step is within reach, and the top, perfection, fades into the distance.",
  },
  newsletter: {
    eyebrow: "Newsletter",
    title: "One simple idea a week, straight to your inbox",
    text: "Learn to save and invest in line with your values, step by step and without jargon.",
    points: [
      "Practical ideas to save and invest from zero",
      "News about the community and meetups",
      "No spam: unsubscribe whenever you like",
    ],
    submit: "Subscribe",
  },
  community: {
    eyebrow: "Community",
    title: "A hive of people investing with awareness",
    text: "A space to ask questions, learn and meet people who share your values. We also organise in-person meetups.",
    note: "Subscribe to the newsletter and I'll keep you posted.",
    cta: "I want to join",
  },
  coaching: {
    eyebrow: "Free coaching",
    title: "A 15-minute money coffee, no strings attached",
    text: "Tell me where you are and what you want to achieve. I'll give you quick tips for your situation, without selling you anything.",
    cta: "Book my virtual coffee",
    stepsTitle: "How it works",
    steps: [
      "Pick the day and time that suit you best.",
      "Tell me where you are and what you want to achieve.",
      "Leave with practical tips for your situation.",
    ],
    facts: [
      { value: 15, suffix: " min", label: "of conversation" },
      { value: 1, suffix: " to 1", label: "on a video call" },
      { value: 0, suffix: " €", label: "no commitment" },
    ],
    embedTitle: "Calendar to book the money coffee",
    openInNewTab: "Open the calendar in a new tab",
    loading: "Loading calendar…",
    fallback:
      "Booking opens very soon. In the meantime, subscribe to the newsletter and I'll let you know when it opens.",
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
    dialogText:
      "Leave your email and I'll let you know as soon as it opens. No spam.",
    submit: "Add me",
  },
  blog: {
    eyebrow: "Blog",
    title: "Learn something every week",
    viewAll: "See all articles",
    subscribe: "Subscribe to the newsletter",
    pageTitle: "Blog",
    pageDescription:
      "Simple ideas to save, invest and live in line with your values.",
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
        q: "Who is Invertir con Valores for?",
        a: "For people who want their money to grow without giving up what they care about. You don't need to know anything about finance: we start from zero.",
      },
      {
        q: "What does investing with values mean?",
        a: "Choosing which companies and funds get your money based on their impact on people, animals and the planet.",
      },
      {
        q: "How much money do I need to start?",
        a: "To learn, nothing. To invest, you can start small: what matters is having your safety net first and understanding what you're doing.",
      },
      {
        q: "Is investing with values less profitable?",
        a: "Not necessarily. There are values-aligned products that are diversified and low-cost. Still, no investment guarantees results: that's why we learn to understand risk before deciding.",
      },
      {
        q: "Will you tell me what to invest in?",
        a: "I won't tell you what you have to do. I give you options and teach you to analyse and decide for yourself.",
      },
      {
        q: "What is the money coffee?",
        a: "A free 15-minute video call to get to know you, understand your situation and give you ideas for your next steps. No commitment, and I won't sell you anything.",
      },
    ],
  },
  finalCta: {
    title: "Make your money work with your values",
    cta: "Subscribe to the newsletter",
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
    consentAfter:
      " and want to receive emails from Invertir con Valores. You can unsubscribe at any time.",
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
  legal: {
    lastUpdated: "Last updated",
    toComplete:
      "This text is a template. Review the sections marked [TO COMPLETE] before publishing.",
  },
  emails: {
    guide: {
      subject: "Your free guide: first steps to investing with values",
      greeting: "Hi {name},",
      body: "Thanks for joining. Here is your guide to take your first steps and start investing consciously.",
      cta: "Download the guide",
      pending:
        "The guide is almost ready: I'll send it to you as soon as it's published.",
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
    unsubscribe:
      "You're receiving this email because you subscribed at Invertir con Valores. Reply to this email if you'd like to unsubscribe.",
  },
};

export default en;
