// src/pages//Playground/PlaygroundData.js

import konbiniya from '../../assets/Playground/konbiniya-storfront-poster.webp';
import kawaiiBrochure from '../../assets/Playground/kawaii-night-market.webp';
import cardGame from '../../assets/Playground/card-game-design.webp';
import phoneCase from '../../assets/Playground/phone-case-design.webp';
import katzAlleyLogo from '../../assets/Playground/katz-alley-logo.webp';
import fruit from '../../assets/Playground/fruit-shop-design.webp';
import orthodontistLogo from '../../assets/Playground/orthodontist-logo.webp';
import bag from '../../assets/Playground/bag-design.webp';
import fashionMagazine from '../../assets/Playground/fashion-magazine.webp';

//line
import donuts from '../../assets/Playground/donuts-line.webp';
import hand from '../../assets/Playground/hand-line.webp';
import shiny from '../../assets/Playground/shiny-line.webp';
import candy from '../../assets/Playground/candy-line.webp';
import heart from '../../assets/Playground/heart-line.webp';
import sakura from '../../assets/Playground/sakura-line.webp';
import bowling from '../../assets/Playground/bowling-line.webp';
import star from '../../assets/Playground/star-line.webp';
import fruitLine from '../../assets/Playground/fruit-line.webp';
import flower from '../../assets/Playground/flower-line.webp';
import rabbit from '../../assets/Playground/rabbit-line.webp';









const playgroundProjects = [
  {
    id: 1,
    videoUrl: 'https://www.youtube.com/embed/pWFZhEVgrd8',
    tags: ['MOTION'],
    layout: 'left',
    orientation: 'vertical',
    line: donuts,
  },
    {
    id: 3,
    videoUrl: 'https://www.youtube.com/embed/He1340hDQS0?si=ZnR9mGvWCZGXqgx-',
    tags: ['MOTION'],
    layout: 'center',
      line: hand,
  },

     {
    id: 11,
    image: bag,
    tags: ['GRAPHIC', 'FASHION'],
    layout: 'left',
    size: 'medium',
      line: rabbit,
  },

  {
    id: 2,
    image: orthodontistLogo,
    tags: ['GRAPHIC'],
    layout: 'left',
    size: 'small',
    line: shiny,
  },


  { id: 4, image: cardGame, tags: ['GRAPHIC'], layout: 'left', size: 'medium' ,   line: candy,},

  {
    id: 5,
    image: phoneCase,
    tags: ['GRAPHIC'],
    layout: 'left',
    size: 'medium',
      line: heart,
  },

  {
    id: 6,
    image: konbiniya,
    tags: ['GRAPHIC'],
    layout: 'left',
    size: 'medium',
      line: sakura,
  },

  {
    id: 7,
    videoUrl: 'https://www.youtube.com/embed/S1TH3IqtXuM?si=AmEC_YiZ3TiLQm2f',
    tags: ['MOTION'],
    layout: 'center',
      line: star,
  },

  {
    id: 8,
    image: katzAlleyLogo,
    tags: ['GRAPHIC'],
    layout: 'left',
    size: 'small',
      line: bowling,
  },

    {
    id: 12,
    image: fashionMagazine,
    tags: ['FASHION'],
    layout: 'left',
    size: 'medium',
      line: flower,
  },

  {
    id: 9,
    image: fruit,
    tags: ['GRAPHIC', 'WEB'],
    layout: 'left',
    size: 'medium',
      line: fruitLine,
  },

  {
    id: 10,
    image: kawaiiBrochure,
    tags: ['GRAPHIC'],
    layout: 'left',
    size: 'medium',
      line: shiny,
  },


];

export default playgroundProjects;
