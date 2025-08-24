// projects page



// image

import image1 from '../components/assets/bumper-animation.webp';
import image2 from '../components/assets/3d-sushi-packaging-ad.webp';
import image3 from '../components/assets/vancouver-jfashion-zine-cover.webp';
import image4 from '../components/assets/japanese-instagram-content-posts.webp';
import image5 from '../assets/ProjectDetails/Canada/Promotional-Short-Video.webp';

const projects = [
  {
    id: 'bumper',
    title: 'Bumper Opener Video ',
    description:  ['- Motion Graphics, After Effects Animation, Visual Identity',
  '- Energetic opener with playful transitions'],
    category: ['Motion Graphics'],
    image: image1,
    link: '/projects/bumper',
  },
  {
    id: '3d-packaging-ad',
    title: '3D Packaging AD',
    category: ['Graphic Design', 'Fashion', 'Motion Graphics'],
    description:[
      '- 3D Graphic Design, Fashion Print, Branding Experiment',
      '- Pixel food inspired print rendered and composited in 3D'
    ],
    image: image2,
    link: '/projects/3d-packaging-ad',
  },
 {
     id: 'japanese-instagram-project',
    title: 'Instagram Contents',
    category: ['Branding', 'Social Media', 'Content Creation', 'MARKETING'],
    description: [
      '- Content Creation, Character Branding, Social Media Design',
      '- Japanese-learning posts optimized for engagement'
    ],
    image: image4,
     link: '/projects/japanese-instagram-project',
  },
  
  {
    id: 'fashion-zine',
    title: 'Fashion Zine',
    category: ['Branding', 'Fashion'],
    description: [
      '- Magazine Design, Event Planning, Fashion & Web Integration',
      '- Harajuku fashion event zine combining photos & layout'
    ],
    image: image3,
    link: '/projects/fashion-zine',
  },

    {
      id: 'canada-promotional-video',
    title: 'Travel Campaign Film',
    category: ['Branding', 'Content Creation', 'Marketing'],
    description: [
  '- Musical-style promotional video for a Canadian travel company',
  '- Narrative edit with custom music cues and storytelling with humor'
],
    image: image5,
      link: '/projects/canada-promotional-video',
  },
]

export default projects;
