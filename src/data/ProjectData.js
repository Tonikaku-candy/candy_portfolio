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
import vancouver from '../assets/ProjectDetails/VancouverBrochure/brochure-cover.webp';

const projects = [
  {
    id: 'candyvscoding',

    title: {
      en: 'How I Built My Portfolio',
      ja: 'ポートフォリオ制作の舞台裏',
    },

    description: {
      en: [
        '-  Video showcasing how I built my portfolio + design process',
        '- Street Fighter–style battle representing my coding challenges',
      ],
      ja: [
        '- ポートフォリオ制作の動画とデザインプロセス',
        '- コーディングでの苦戦をストリートファイター風のバトルで表現',
      ],
    },

    category: ['Motion Graphics', 'Web Development', 'UI / UX'],

    image: coding,

    link: '/projects/candy-vs-coding',
  },

  {
    id: 'musicvideo',

    title: {
      en: 'Magic Music – Music Video',
      ja: 'Magic Music – ミュージックビデオ',
    },

    description: {
      en: [
        '- Motion Graphics & After Effects Project',
        '- Fan-made music video with handmade costumes and playful visuals',
      ],
      ja: [
        '- After Effectsを使用したモーショングラフィックス作品',
        '- ハンドメイドの衣装と遊び心のある映像表現を取り入れたファンメイドMV',
      ],
    },

    category: ['Motion Graphics', 'Video Production'],

    image: magicMusic,

    link: '/projects/magic-music-mv',
  },

  {
    id: 'bumper',

    title: {
      en: 'Bumper Opener Video',
      ja: 'オープニング映像',
    },

    description: {
      en: [
        '- Motion Graphics, After Effects Animation, Visual Identity',
        '- Energetic opener with playful transitions',
      ],
      ja: [
        '- After Effectsで制作したオープニング映像',
        '- 遊び心のあるトランジションとエネルギッシュな演出',
      ],
    },

    category: ['Motion Graphics'],

    image: bumper,

    link: '/projects/bumper',
  },

  {
    id: 'halloween-motion',

    title: {
      en: 'Halloween Geometric Motion Loop',
      ja: 'ハロウィン・モーションループ',
    },

    description: {
      en: [
        '- Seamless geometric loop created in After Effects',
        '- Playful ghost character and vibrant seasonal color palette',
      ],
      ja: [
        '- After Effectsで制作したシームレスな幾何学モーションループ',
        '- かわいいゴーストキャラクターと鮮やかなハロウィンカラーを使用',
      ],
    },

    category: ['Motion Graphics', 'Content Creation', 'Graphic Design'],

    image: halloween,

    link: '/projects/halloween-motion',
  },

  {
    id: 'rhythm-game',

    title: {
      en: 'Rhythm Motion',
      ja: 'リズム・モーション',
    },

    description: {
      en: [
        '- Rhythm-game–inspired motion graphic created in After Effects',
        '- Beat-synced animation with playful visual storytelling',
      ],
      ja: [
        '- リズムゲームの世界観をイメージして制作した映像作品',
        '- 音楽のビートに合わせた、遊び心のあるアニメーション',
      ],
    },

    category: ['Motion Graphics'],

    image: rhythmGame,

    link: '/projects/rhythm-game',
  },

  {
    id: 'vancouver-brochure',

    title: {
      en: 'Vancouver Architecture Brochure',
      ja: 'バンクーバー建築散策パンフレット',
    },

    description: {
      en: [
        '- Tri-fold brochure and design for a self-guided architecture tour',
        '- Improved navigation, map design, and visual hierarchy through iteration',
      ],
      ja: [
        '- バンクーバーの建築を巡るセルフガイドツアーのための三つ折りパンフレット',
        '- 試作と改善を重ね、地図や情報を見やすくデザイン',
      ],
    },

    category: ['Graphic Design'],

    image: vancouver,

    link: '/projects/vancouver-brochure',
  },

  {
    id: '3d-packaging-ad',

    title: {
      en: '3D Packaging AD',
      ja: '3D パッケージ広告',
    },

    description: {
      en: [
        '- 3D Graphic Design, Fashion Print, Branding Experiment',
        '- Pixel food inspired print rendered and composited in 3D',
      ],
      ja: [
        '- 3Dグラフィックとファッションを掛け合わせた遊び心のあるデザイン',
        '- ピクセルフードから着想を得たプリントを3Dでレンダリング・合成',
      ],
    },

    category: ['Graphic Design', 'Fashion', 'Motion Graphics'],

    image: sushi,

    link: '/projects/3d-packaging-ad',
  },

  {
    id: 'shiseido',

    title: {
      en: 'Shiseido Package Design',
      ja: 'SHISEIDO パッケージデザイン',
    },

    description: {
      en: [
        '- Graphic Design, Packaging Mockup, Poster Design',
        '- Unofficial concept inspired by Shiseido Ultimune 2026 Limited Edition',
      ],
      ja: [
        '- パッケージとプロモーションポスターをデザイン',
        '- SHISEIDO アルティミューン限定デザインから着想を得た非公式作品',
      ],
    },

    category: ['Graphic Design'],

    image: shiseido,

    link: '/projects/shiseido-package',
  },

  {
    id: 'japanese-instagram-project',

    title: {
      en: 'Instagram Contents',
      ja: 'Instagram コンテンツ',
    },

    description: {
      en: [
        '- Japanese-learning content designed for social media',
        '- Engaging content with humor and playful ideas',
      ],
      ja: [
        '- SNS向けの日本語学習コンテンツを企画・デザイン',
        '- ユーモアを取り入れ、エンゲージメントを意識したコンテンツ制作',
      ],
    },

    category: ['Branding', 'Social Media', 'Content Creation', 'MARKETING'],

    image: instagram,

    link: '/projects/japanese-instagram-project',
  },

  {
    id: 'canada-promotional-video',

    title: {
      en: 'Travel Campaign Film',
      ja: '留学プロモーション映像',
    },

    description: {
      en: [
        '- Musical-style promotional video for a Canadian travel company',
        '- Narrative edit with custom music cues and storytelling with humor',
      ],
      ja: [
        '- カナダの旅行会社向けに制作したミュージカル風プロモーション映像',
        '- オリジナルの音楽演出とユーモアを取り入れたストーリー仕立ての映像編集',
      ],
    },

    category: ['Branding', 'Content Creation', 'Marketing'],

    image: canada,

    link: '/projects/canada-promotional-video',
  },

  {
    id: 'fashion-zine',

    title: {
      en: 'Fashion Zine and Event',
      ja: 'ファッションZINE ＆ イベント',
    },

    description: {
      en: [
        '- Branding, Logo Design, Event Poster, Fashion Zine, Web Design',
        '- Event organization with landing page',
      ],
      ja: [
        '- ロゴ、イベントポスター、ファッションZINE、Webデザインを制作',
        '- イベントの企画・運営とランディングページの制作',
      ],
    },

    category: ['Branding', 'Fashion', 'Web Development', 'Graphic Design'],

    image: zine,

    link: '/projects/fashion-zine-and-event',
  },
];

export default projects;
