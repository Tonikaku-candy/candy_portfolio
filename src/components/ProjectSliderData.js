// this is for project slider

import instagram from './assets/japanese-instagram-content-posts.webp';
import sushi from './assets/3d-sushi-packaging-ad.webp';
import zine from './assets/vancouver-jfashion-zine-cover.webp';
import bumper from './assets/bumper-animation.webp';
import rhythmGame from '../assets/ProjectDetails/RhythmGame/rhythm-game-cover.webp';
import magicMusic from '../assets/ProjectDetails/MagicMusicMv/magic-music-mv-cover.webp';
import coding from '../assets/ProjectDetails/CandyVsCoding/candy-vs-coding2.webp';

const projectData = [
  {
    id: 1,
    title: 'How I Built My Portfolio',
    subtitle: 'AFTER EFFECTS / PREMIERE PRO',
    description:
     'A playful Street Fighter–style film about my journey building this portfolio',

    image: coding,
    link: '/projects/candy-vs-coding',
  },

  {
    id: 2,
    title: 'INSTAGRAM CONTENTS',
    subtitle: 'PHOTOSHOP / CAPCUT',
    description: 'Posts & Reels for Japanese Teaching Instagram Account',
    image: instagram,
    link: '/projects/japanese-instagram-project',
  },
  {
    id: 3,
    title: 'After Effects MV',
    subtitle: 'Motion Graphics',
    description:
      'Fan-made music video in After Effects with handmade costumes and playful visuals.',
    image: magicMusic,
    link: '/projects/magic-music-mv',
  },

  {
    id: 4,
    title: '3D PACKAGING AD',
    subtitle: 'ADOBE DIMENSION',
    description: 'A 3D ad featuring apparel and my original pixel art',
    image: sushi,
    link: '/projects/3d-packaging-ad',
  },

  {
    id: 5,
    title: 'Rhythm Motion',
    subtitle: 'Motion Graphics',
    description:
      'Beat-synced rhythm game animation with playful visuals in After Effects.',
    image: rhythmGame,
    link: '/projects/rhythm-game',
  },
  {
    id: 6,
    title: 'Bumper Opener Video',
    subtitle: 'Motion Graphics',
    description: 'Animated bumper showcasing brand identity in After Effects.',
    image: bumper,
    link: '/projects/bumper',
  },
];

export default projectData;
