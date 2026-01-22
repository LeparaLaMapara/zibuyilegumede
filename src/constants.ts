import { NavItem, Project, Testimonial } from './types';

// Use professional cinematography terminology
export const NAV_ITEMS: NavItem[] = [
  { label: 'Films', path: '/films' },
  { label: 'Unit Photography', path: '/photography' }, // Professional update from "Photography"
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const SHOWREEL_ID = ''; 
export const BRAND = { 
  name: 'Zibuyile Gumede', 
  tagline: 'Director of Photography' 
};

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/abntu_',
  linkedin: 'https://www.linkedin.com/in/zibuyile-gumede-23ab84242',
  youtube: 'https://www.youtube.com/@zibuyilegumede6367',
  email: 'zibuyilegumede360@gmail.com',
  imdb: 'https://www.imdb.com/name/nm15806204/',
  phone: '+27 (0)79 531 4422'
};

// --- DYNAMIC PROJECT LOADING ---
// Vite's glob import for assets
const globFiles = (import.meta as any).glob('/public/media/images/**/*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' });

export const FILMS: Project[] = [
  { id: 1, title: 'Pixels over people', category: 'Monologue', image: '', youtubeId: 'vCiflrPaWcg' },
  { id: 2, title: 'See You Soon', category: 'Short Film', image: '', youtubeId: 'x_a_hH_zTpE' },
  { id: 3, title: 'Yonela Mnana - Rato La', category: 'Music Video', image: '', youtubeId: 'MwLGJyWfR24' },
  { id: 4, title: 'Quick Face', category: 'Short Cinematic', image: '', youtubeId: 'xw8zzZpWauc' },
  { id: 5, title: 'MVV EP 1', category: 'BTS', image: '', youtubeId: 'MoOOP7j873g' },
];

// Dynamically generate PHOTOS
export const PHOTOS: Project[] = Object.keys(globFiles).map((path, index) => {
  const parts = path.split('/');
  const filename = parts.pop() || '';
  
  // Clean folder name mapping for Cinematography roles
  let folderName = parts.pop() || 'Uncategorized';
  if (folderName.toLowerCase() === 'narrative') folderName = 'Narrative Stills';
  if (folderName.toLowerCase() === 'commercial') folderName = 'Commercial Stills';

  const title = filename
    .replace(/\.(jpg|jpeg|png|webp)$/i, '')
    .replace(/[-_]/g, ' ');

  // CRITICAL: Ensure the path is browser-ready by removing /public
  const imageUrl = path.replace('/public', '');

  return {
    id: 1000 + index,
    title: title,
    category: folderName,
    image: imageUrl,
  };
});

export const TESTIMONIALS: Testimonial[] = [
  { quote: "Zibuyile has an incredible eye for lighting and composition. Every frame tells a story.", author: "Mnqondisi", role: "CEO OF MADSHO" },
  { quote: "Professional, creative, and efficient. A true master of the craft.", author: "Mocke Jansen van Vuren", role: "MA SUPERVISOR" },
  { quote: "Transforms ordinary locations into cinematic masterpieces.", author: "Vuyiswa Tshangela", role: "PRODUCTION MANAGER" },
];

export const CLIENT_LIST = [
  { name: 'MADSHO', link: 'https://madsho.co.za/' },
  { name: 'SEAMLESS CUT', link: 'https://www.instagram.com/seamlesscut' },
  { name: 'BASE CAMP COMMUNITY', link: '#' },
  { name: 'BOLLECTIVE STUDIOS', link: 'https://www.instagram.com/bollective.studios' },
  { name: 'COOLER BOX BROS', link: 'https://www.instagram.com/coolerbox_brothers' },
  { name: 'RED HOT OPS', link: 'https://www.instagram.com/redhotops_official' },
  { name: 'TWO FOLDS', link: 'https://www.instagram.com/twofoldza' },
  { name: 'OUTRE STUDIO', link: 'https://www.instagram.com/outrestudios' },
  { name: 'LEWATLE MAGAZINE', link: 'https://www.instagram.com/lewatlemagazine' },
];

export const ON_SET_IMAGES = [
  '/media/others/me_1.jpg',
  '/media/others/me_2.jpg',
  '/media/others/me_4.jpg',
];