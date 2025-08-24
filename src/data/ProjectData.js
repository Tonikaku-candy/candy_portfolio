// projects page

// image

import bumper from '../components/assets/bumper-animation.webp';
import sushi from '../components/assets/3d-sushi-packaging-ad.webp';
import zine from '../components/assets/vancouver-jfashion-zine-cover.webp';
import instagram from '../components/assets/japanese-instagram-content-posts.webp';
import canada from '../assets/ProjectDetails/Canada/Promotional-Short-Video.webp';
import rhythmGame from '../assets/ProjectDetails/RhythmGame/rhythm-game-cover.webp';

const projects = [
  {
    id: 'bumper',
    title: 'Bumper Opener Video',
    description: [
      '- Motion Graphics, After Effects Animation, Visual Identity',
      '- Energetic opener with playful transitions',
    ],
    category: ['Motion Graphics'],
    image: bumper,
    link: '/projects/bumper',
  },

  {
    id: 'rhythm-game',
    title: 'Rhythm Lab',
    description: [
      '- Rhythm game–style animation created in After Effects',
      '- Creative storytelling with beat-synced motion graphics',
    ],
    category: ['Motion Graphics'],
    image: rhythmGame,
    link: '/projects/rhythm-game',
  },

  {
    id: '3d-packaging-ad',
    title: '3D Packaging AD',
    category: ['Graphic Design', 'Fashion', 'Motion Graphics'],
    description: [
      '- 3D Graphic Design, Fashion Print, Branding Experiment',
      '- Pixel food inspired print rendered and composited in 3D',
    ],
    image: sushi,
    link: '/projects/3d-packaging-ad',
  },
  {
    id: 'japanese-instagram-project',
    title: 'Instagram Contents',
    category: ['Branding', 'Social Media', 'Content Creation', 'MARKETING'],
    description: [
      '- Content Creation, Character Branding, Social Media Design',
      '- Japanese-learning posts optimized for engagement',
    ],
    image: instagram,
    link: '/projects/japanese-instagram-project',
  },

  {
    id: 'fashion-zine',
    title: 'Fashion Zine',
    category: ['Branding', 'Fashion'],
    description: [
      '- Magazine Design, Event Planning, Fashion & Web Integration',
      '- Harajuku fashion event zine combining photos & layout',
    ],
    image: zine,
    link: '/projects/fashion-zine',
  },

  {
    id: 'canada-promotional-video',
    title: 'Travel Campaign Film',
    category: ['Branding', 'Content Creation', 'Marketing'],
    description: [
      '- Musical-style promotional video for a Canadian travel company',
      '- Narrative edit with custom music cues and storytelling with humor',
    ],
    image: canada,
    link: '/projects/canada-promotional-video',
  },
];

export default projects;
