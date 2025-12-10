// projects page

// image

import bumper from '../components/assets/bumper-animation.webp';
import sushi from '../components/assets/3d-sushi-packaging-ad.webp';
import zine from '../components/assets/vancouver-jfashion-zine-cover.webp';
import instagram from '../components/assets/japanese-instagram-content-posts.webp';
import canada from '../assets/ProjectDetails/Canada/Promotional-Short-Video.webp';
import rhythmGame from '../assets/ProjectDetails/RhythmGame/rhythm-game-cover.webp';
import magicMusic from '../assets/ProjectDetails/MagicMusicMv/magic-music-mv-cover.webp';
import shiseido from '../assets/ProjectDetails/Shiseido/ultimune-final-poster.webp';
import halloween from '../assets/ProjectDetails/Halloween/halloween.webp';
import coding from '../assets/ProjectDetails/CandyVsCoding/candy-vs-coding2.webp';

const projects = [
{
  id: 'candyvscoding',
  title: 'How I Built My Portfolio',
  description: [
'- Motion Graphics project visualizing my playful portfolio-building journey',
'- Street Fighter–style battle representing my coding challenges',


  ],
  category: ['Motion Graphics', 'Web Development', 'UI / UX'],
  image: coding,
  link: '/projects/candy-vs-coding',
},


  {
    id: 'musicvideo',
    title: 'Magic Music – Music Video',
    description: [
      '- Motion Graphics & After Effects Project',
      '- Fan-made music video with handmade costumes and playful visuals',
    ],
    category: ['Motion Graphics', 'Video Production'],
    image: magicMusic,
    link: '/projects/magic-music-mv',
  },

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
    id: 'halloween-motion',
    title: 'Halloween Geometric Motion Loop',
    description: [
      '- Seamless geometric loop created in After Effects',
      '- Playful ghost character and vibrant seasonal color palette',
    ],
    category: ['Motion Graphics', 'Content Creation'],
    image: halloween,
    link: '/projects/halloween-motion',
  },

{
  id: 'rhythm-game',
  title: 'Rhythm Motion',
  description: [
    '- Rhythm-game–inspired motion graphic created in After Effects',
    '- Beat-synced animation with playful visual storytelling',
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
    id: 'shiseido',
    title: 'Shiseido Package Design',
    description: [
      '- Graphic Design, Packaging Mockup, Poster Design',
      '- Unofficial concept inspired by Shiseido Ultimune 2026 Limited Edition',
    ],
    category: ['Graphic Design'],
    image: shiseido,
    link: '/projects/shiseido-package',
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
  {
    id: 'fashion-zine',
    title: 'Fashion Zine and Event',
    category: ['Branding', 'Fashion', 'Web Development'],
    description: [
      '- Branding, Logo Design, Event Poster, Fashion Zine, Web Design',
      '- Event organization with landing page',
    ],
    image: zine,
    link: '/projects/fashion-zine-and-event',
  },
];

export default projects;
