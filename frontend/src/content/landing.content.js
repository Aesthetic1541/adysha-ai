// ---------------------------------------------------------------------------
// All landing-page copy lives here. Edit this file to change any text on the
// page without touching component markup or logic.
// ---------------------------------------------------------------------------

export const brand = {
  name: 'Adysha',
  badge: 'BETA',
  tagline: 'Prep smarter for JEE',
}

export const announcement = {
  label: 'NEW',
  text: 'Full-length JEE Advanced mocks are live this week',
  cta: { label: 'Try one free', href: '#paths' },
}

export const nav = {
  links: [
    { label: 'PYQ Tests', href: '#everything' },
    { label: 'Mock Exams', href: '#paths' },
    { label: 'Pricing', href: '#pricing' },
  ],
  learningMenu: {
    label: 'Subjects',
    items: [
      { label: 'Physics', to: '/subjects/physics', hint: '108 lessons' },
      { label: 'Chemistry', to: '/subjects/chemistry', hint: '92 lessons' },
      { label: 'Mathematics', to: '/subjects/mathematics', hint: '124 lessons' },
      { label: 'Full syllabus map', to: '/subjects', hint: 'See everything' },
    ],
  },
  login: { label: 'Log in', to: '/login' },
  signup: { label: 'Sign up free', to: '/signup' },
}

export const hero = {
  eyebrow: 'For JEE Main & Advanced aspirants',
  headlineStart: 'Everything a',
  rotatingWords: ['topper', 'AIR 1', '99.9%iler', 'strategist'],
  headlineEnd: 'knows. Mapped.',
  subhead:
    'Adysha turns every test you take into a clear picture of your strengths, gaps and rank potential — then builds a study plan around it.',
  primaryCta: { label: 'Start free', to: '/signup' },
  secondaryCta: { label: 'See a live demo', href: '#paths' },
  trustLine: 'Free forever for PYQ tests. No credit card needed.',
  scorecard: {
    title: 'Test Analysis',
    subtitle: 'JEE Main · Mock 14',
    percentile: '98.42',
    rank: '1,284',
    rows: [
      { subject: 'Physics', score: '78 / 100', trend: 'up' },
      { subject: 'Chemistry', score: '64 / 100', trend: 'down' },
      { subject: 'Mathematics', score: '91 / 100', trend: 'up' },
    ],
    footnote: 'Weak topic flagged: Thermodynamics',
  },
  driftCards: [
    { label: 'Weak topic', title: 'Thermodynamics', tone: 'panel' },
    { label: 'Streak', title: '14 days', tone: 'accent' },
    { label: 'Today', title: '2 mocks scheduled', tone: 'ink' },
  ],
}

export const marqueeLogos = [
  'Zenith Academy',
  'Apex Institute',
  'Momentum Classes',
  'Vertex Tutorials',
  'Catalyst Prep',
  'Northline Coaching',
  'Summit Learning',
  'Anchor Academy',
]

export const paths = {
  eyebrow: 'PICK YOUR PATH',
  heading: 'Choose where to start',
  items: [
    {
      code: '01',
      tone: 'blue',
      tag: 'CORE PATH',
      title: 'Physics',
      subtitle: 'Concept to problem-solving',
      bullets: ['Mechanics through modern physics', 'Numerical drills, sequenced', 'PYQ-tagged practice'],
      meta: '12 chapters · 108 lessons · 16 free',
      to: '/subjects/physics',
    },
    {
      code: '02',
      tone: 'green',
      tag: 'CORE PATH',
      title: 'Chemistry',
      subtitle: 'Organic, inorganic, physical',
      bullets: ['Reaction maps and mechanisms', 'NCERT-first, exam-tuned', 'Built for recall under pressure'],
      meta: '10 chapters · 96 lessons · 20 free',
      to: '/subjects/chemistry',
    },
    {
      code: '03',
      tone: 'amber',
      tag: 'FOUNDATIONS',
      title: 'Mathematics',
      subtitle: 'Speed and accuracy drills',
      bullets: ['Set-by-set difficulty ramp', 'Shortcut methods, explained', 'Timed sprints throughout'],
      meta: '14 chapters · 130 topics · 18 free',
      to: '/subjects/mathematics',
    },
    {
      code: '04',
      tone: 'dark',
      tag: 'EXAM PATH',
      title: 'Full mock exams',
      subtitle: 'Real exam conditions',
      bullets: ['Timed, negative-marked', 'All-India live ranking', 'Instant weak-topic report'],
      meta: '20 full mocks · Ranked live',
      to: '/tests/mock-exams',
    },
    {
      code: '05',
      tone: 'lavender',
      tag: 'SOON',
      title: 'Rank predictor',
      subtitle: 'Where you would stand today',
      bullets: ['Cross-checked against past cutoffs', 'Updates after every mock', 'Category & state-wise view'],
      meta: 'Opening to all users soon',
      to: '/predictor',
      soon: true,
    },
  ],
}

export const everything = {
  eyebrow: 'BEYOND THE SUBJECTS',
  heading: 'Everything else on Adysha.',
  items: [
    {
      code: '01',
      tone: 'pink',
      title: 'PYQ Bank',
      subtitle: '15 years, tagged by topic',
      to: '/tests/pyq',
    },
    {
      code: '02',
      tone: 'orange',
      title: 'Daily Practice',
      subtitle: 'One problem set, every morning',
      to: '/daily',
    },
    {
      code: '03',
      tone: 'cream',
      title: "Toppers' Notes",
      subtitle: 'Strategy notes from AIR holders',
      to: '/notes',
    },
    {
      code: '04',
      tone: 'blueDark',
      title: 'Study Rooms',
      subtitle: 'Learn live with aspirants nationwide',
      to: '/rooms',
    },
  ],
}

export const testimonials = {
  heading: 'Aspirants like Adysha',
  items: [
    {
      name: 'Ishaan R.',
      handle: '@ishaan_preps',
      body: 'The weak-topic report after every mock is what finally got my Chemistry score moving. Stopped guessing what to revise.',
    },
    {
      name: 'Priya M.',
      handle: '@priya.codes.jee',
      body: "Free PYQ tests, timed exactly like the real thing. I didn't expect that to be free honestly.",
    },
    {
      name: 'Kabir S.',
      handle: '@kabirstudies',
      body: 'The daily practice set takes 20 minutes and somehow covers exactly what I was about to forget.',
    },
    {
      name: 'Ananya D.',
      handle: '@ananya_air',
      body: 'Rank predictor lined up with my actual JEE Main percentile within half a point. Wild.',
    },
    {
      name: 'Rohan V.',
      handle: '@rohan.solves',
      body: 'Adysha replaced three different apps I was juggling for practice, notes, and timetable.',
    },
    {
      name: 'Meera K.',
      handle: '@meera_learns',
      body: 'The toppers notes section alone is worth it. Reads like someone actually sat down and explained their strategy.',
    },
  ],
}

export const cta = {
  heading: 'Your next test is a data point. Use it.',
  subheading: 'Join Adysha and turn every mock test into a step closer to your target rank.',
  primaryCta: { label: 'Create free account', to: '/signup' },
  secondaryCta: { label: 'Log in', to: '/login' },
}

export const footer = {
  description: 'Adysha helps JEE aspirants study with data, not guesswork.',
  columns: [
    {
      heading: 'Product',
      links: [
        { label: 'Test Analysis', to: '/analysis' },
        { label: 'PYQ Tests', to: '/tests' },
        { label: 'Timetable', to: '/timetable' },
        { label: 'Pricing', to: '/pricing' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms of Service', to: '/terms' },
      ],
    },
  ],
  copyright: `\u00A9 ${new Date().getFullYear()} Adysha. All rights reserved.`,
}
