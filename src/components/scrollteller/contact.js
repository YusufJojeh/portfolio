import { personalInfo } from '@/lib/data/portfolio';

const withProtocol = (url) => (url.startsWith('http') ? url : `https://${url}`);

export const CONTACT = {
  email: personalInfo.contact.email,
  github: withProtocol(personalInfo.contact.github),
  linkedin: withProtocol(personalInfo.contact.linkedin),
  // English only; served from public/cv.
  cv: '/cv/yusuf-jojeh-backend-engineer-cv.pdf',
};
