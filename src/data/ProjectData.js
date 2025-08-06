// projects page



// image

import image1 from '../components/assets/bumper-animation.webp';
import image2 from '../components/assets/3d-sushi-packaging-ad.webp';
import image3 from '../components/assets/vancouver-jfashion-zine-cover.webp';
import image4 from '../components/assets/japanese-instagram-content-posts.webp';
import image5 from '../assets/ProjectDetails/Canada/Promotional-Short-Video.webp';

const projects = [
  {
    title: 'Bumper Opener Video ',
    description: '— Motion Graphics, After Effects Animation, Visual Identity',
    category: ['Motion Graphics'],
    image: image1,
    link: '/projects/bumper',
  },
  {
    title: '3D Packaging AD',
    category: ['Graphic Design', 'Fashion', 'Motion Graphics'],
    description: '— 3D Graphic Design, Fashion Print, Branding Experiment',
    image: image2,
    link: '/projects/3d-packaging-ad',
  },
 {
    title: 'Instagram Contents',
    category: ['Branding', 'Social Media', 'Content Creation', 'MARKETING'],
    description: '— Content Creation, Character Branding, Social Media Design',
    image: image4,
     link: '/projects/japanese-instagram-project',
  },
  
  {
    title: 'Fashion Zine',
    category: ['Branding', 'Fashion'],
    description: '— Magazine Design, Event Planning, Fashion & Web Integration',
    image: image3,
  },

    {
    title: 'Promotional Film',
    category: ['Branding', 'Content Creation', 'MARKETING'],
    description: '—— Musical-style Promotional Video, Storytelling',
    image: image5,
      link: '/projects/canada-promotional-video',
  },
]

export default projects;
