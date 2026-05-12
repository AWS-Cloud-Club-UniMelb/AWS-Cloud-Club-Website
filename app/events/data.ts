export interface DocLink {
  label: string
  url: string
}

export interface PastEvent {
  id: string
  title: string
  date: string
  location: string
  category: string
  categoryTone: string
  description: string
  attendees: number
  highlight: string
  photos: string[]
  docLinks?: DocLink[]
  youtubeUrl?: string
}

export interface UpcomingEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
  category: string
  categoryTone: string
  description: string
  spotsLeft: number
  posterUrl?: string
  rsvpUrl?: string
  isHybrid?: boolean
  zoomUrl?: string
}

export const pastEvents: PastEvent[] = [
  {
    id: 'first-event-mar26',
    title: 'Our First Ever AWS Cloud Club Event',
    date: 'March 31, 2026',
    location: 'Standing Room Café, Glyn Davis Building, UniMelb',
    category: 'Community',
    categoryTone: 'orange',
    description:
      'We kicked off the very first AWS Cloud Club event at the University of Melbourne with something intentionally simple — coffee, conversation, and a honest chat about cloud. No slides, no pressure, just students sitting down together to figure out where to start. We covered what a real AWS learning roadmap looks like, how to make the most of your university years in tech, and what a career in cloud actually involves. With over 100 students showing up, it was clear there was a real appetite for this kind of community at UniMelb. This was the moment the club went from an idea to something real.',
    attendees: 100,
    highlight:
      'Over 100 students showed up to our very first event — coffee in hand, questions ready, and zero experience required.',
    photos: ['/events/photos/first-event-mar26/event-flyer.jpg', '/events/photos/first-event-mar26/imag3.jpg', '/events/photos/first-event-mar26/image2.jpg' ],
    docLinks: [],
    youtubeUrl: '',
  },
  {
    id: 'cloud-to-career-apr26',
    title: 'Cloud to Career',
    date: 'April 8, 2026',
    location: 'Forum Theatre L1, Arts West North Wing, UniMelb',
    category: 'Industry Event',
    categoryTone: 'green',
    description:
      'Co-presented with Quantum Club and sponsored by CareerXlerate, Cloud to Career was a high-energy hybrid evening designed to bridge the gap between cloud knowledge and real-world careers. Over 100 students, engineers, and aspiring tech professionals gathered in the Forum Theatre for an industry panel featuring leaders who shared how they transitioned from learning cloud to building impactful AI and engineering solutions. An open Q&A — with both in-person and online participation — was followed by a buffet networking session where students connected directly with industry professionals. The highlight of the night was a live architecture challenge: two students and two industry professionals were randomly selected to tackle a real-world case scenario, collaborating for 40 minutes before presenting to a panel of judges who broke down the solution in front of the room.',
    attendees: 103,
    highlight:
      'A live architecture challenge paired students with industry professionals to solve a real-world cloud scenario in front of 100+ attendees.',
    photos: ['', '', '', '', '', ''],
    docLinks: [
      { label: 'Event Recap Slides', url: '#' },
    ],
    youtubeUrl: '',
  },
  {
    id: 'cloud-dojo-s1-apr26',
    title: 'Cloud Dojo — Session 1: AWS Foundations',
    date: 'April 29, 2026',
    location: 'Melbourne Connect, Level 7, UniMelb',
    category: 'Workshop',
    categoryTone: 'amber',
    description:
      'Cloud Dojo is our weekly two-hour workshop series where cloud engineers are made, not just certified. Session 1 launched the format that runs every Wednesday: the first hour is dedicated theory — a deep dive into AWS and cloud concepts built for certifications but taught for genuine understanding, whether you\'re targeting Cloud Practitioner, Solutions Architect, or beyond. The second hour is entirely hands-on, where attendees roll up their sleeves and build something real. Week 1 covered AWS core service models and account setup, setting the foundation for every session that follows. Sessions are held in-person at Melbourne Connect and streamed live on Zoom for remote attendees.',
    attendees: 25,
    highlight:
      'Cloud Dojo launched its weekly format: one hour of deep-dive theory, one hour of hands-on building — every Wednesday.',
    photos: ['/events/photos/cloud-dojo-s1-apr26/cloudDojo2.png'],
    docLinks: [ { label: 'Session 1 Slides', url: 'https://drive.google.com/drive/folders/1Jh40_ogpe_wbDz_z8MqLVKkPZWY7JlFC' } ],
    youtubeUrl: 'https://www.youtube.com/@AWS-Unimelb',
  },
  {
    id: 'ai-studio-s1-may26',
    title: 'AI Studio — Session 1: ML Basics & n8n Workflows',
    date: 'May 1, 2026',
    location: 'Melbourne Connect, Level 7, UniMelb',
    category: 'Workshop',
    categoryTone: 'pink',
    description:
      'AI Studio is our weekly Friday workshop series designed to take you from zero to confident in AI and machine learning — led by industry professionals and coaches. No registration required; just show up. The format mirrors Cloud Dojo: the first hour is structured learning, the second is practical hands-on work with real AI and ML tools. Session 1 opened with the fundamentals of machine learning — covering core concepts like supervised vs unsupervised learning, model training, and evaluation — before moving into a practical introduction to n8n, the open-source workflow automation platform. Attendees built their first automated AI workflow from scratch, connecting services and triggers without writing a single line of backend code.',
    attendees: 10,
    highlight:
      'Week 1 covered ML fundamentals in theory, then put them to work immediately with a hands-on intro to n8n workflow automation.',
    photos: ['', '', ''],
    docLinks: [],
    youtubeUrl: '',
  },
]

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 'cloud-dojo-s2-may26',
    title: 'Cloud Dojo — Session 2: Cloud Service Models',
    date: 'May 6, 2026',
    time: '5:00 PM – 7:00 PM',
    location: 'Market Hall L1, Building 189, UniMelb',
    category: 'Workshop',
    categoryTone: 'amber',
    description:
      'Cloud Dojo returns for Session 2. This week we go deep on cloud service models — IaaS, PaaS, and SaaS — and how they map to real AWS architecture decisions. Hour one is theory built for certification and real understanding. Hour two is hands-on building. Can\'t make it in person? Watch the Session 1 recording now on our YouTube channel, CloudLabs @ UniMelb, and join this week\'s session live on Zoom.',
    spotsLeft: 40,
    posterUrl: '/events/posters/cloudDojo2.png',
    isHybrid: true,
    zoomUrl: 'https://lnkd.in/ga9pZHHu',
  },
  {
    id: 'ai-studio-s2-may26',
    title: 'AI Studio — Session 2: Prompt Engineering & Jupyter',
    date: 'May 11, 2026',
    time: '5:00 PM – 7:00 PM',
    location: 'Melbourne Connect, Level 7, UniMelb',
    category: 'Workshop',
    categoryTone: 'pink',
    description:
      'AI Studio Session 2 dives into two of the most practical skills in modern AI work. Hour one covers prompt engineering — how to write effective prompts for LLMs, chain-of-thought techniques, and patterns that actually work in production. Hour two moves into hands-on ML fundamentals using Jupyter notebooks, where you\'ll run and modify real Python code to understand how models learn from data. No registration required — just show up.',
    spotsLeft: 30,
    isHybrid: false,
  },
]