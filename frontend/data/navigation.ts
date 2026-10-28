export const NAV_ITEMS = [
  {
    id: 'work',
    label: 'How I build projects',
    description: 'rungroj.dev and mini learning projects',
  },
  { id: 'skills', label: 'Skills', description: 'Frontend, backend and cloud' },
  {
    id: 'about',
    label: 'About',
    description: 'Education, AWS and TOEIC, verified',
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Email, phone or a message',
  },
] as const

export type SectionId = (typeof NAV_ITEMS)[number]['id']
