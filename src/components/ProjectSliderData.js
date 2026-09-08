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
    title: {
      en: 'How I Built My Portfolio',
      ja: 'ポートフォリオ制作の舞台裏',
    },
    subtitle: 'AFTER EFFECTS / PREMIERE PRO',
    description: {
      en: 'A playful Street Fighter–style film about my journey building this portfolio',
      ja: 'ポートフォリオ制作での苦戦をストリートファイター風に表現した映像作品',
    },
    image: coding,
    link: '/projects/candy-vs-coding',
  },

  {
    id: 2,
    title: {
      en: 'INSTAGRAM CONTENTS',
      ja: 'Instagramコンテンツ',
    },
    subtitle: 'PHOTOSHOP / CAPCUT',
    description: {
      en: 'Posts & Reels for a Japanese-learning Instagram account',
      ja: '日本語学習Instagram向けに制作した投稿とリール',
    },
    image: instagram,
    link: '/projects/japanese-instagram-project',
  },

  {
    id: 3,
    title: {
      en: 'After Effects MV',
      ja: 'ミュージックビデオ',
    },
    subtitle: 'MOTION GRAPHICS',
    description: {
      en: 'Fan-made music video in After Effects with handmade costumes and playful visuals.',
      ja: 'ハンドメイドの衣装と遊び心のある映像表現を取り入れたファンメイドMV',
    },
    image: magicMusic,
    link: '/projects/magic-music-mv',
  },

  {
    id: 4,
    title: {
      en: '3D PACKAGING AD',
      ja: '3Dパッケージ広告',
    },
    subtitle: 'ADOBE DIMENSION',
    description: {
      en: 'A 3D ad featuring apparel and my original pixel art',
      ja: 'オリジナルのピクセルアートとアパレルを組み合わせた3D広告',
    },
    image: sushi,
    link: '/projects/3d-packaging-ad',
  },

  {
    id: 5,
    title: {
      en: 'Rhythm Motion',
      ja: 'リズム・モーション',
    },
    subtitle: 'MOTION GRAPHICS',
    description: {
      en: 'Beat-synced rhythm game animation with playful visuals in After Effects.',
      ja: '音楽のビートに合わせて制作した、遊び心のあるリズムゲーム風アニメーション',
    },
    image: rhythmGame,
    link: '/projects/rhythm-game',
  },

  {
    id: 6,
    title: {
      en: 'Bumper Opener Video',
      ja: 'オープニング映像',
    },
    subtitle: 'MOTION GRAPHICS',
    description: {
      en: 'Animated bumper showcasing brand identity in After Effects.',
      ja: 'After Effectsで制作した、ブランドの世界観を表現するオープニング映像',
    },
    image: bumper,
    link: '/projects/bumper',
  },
];

export default projectData;