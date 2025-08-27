import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RabbitUfoAll from '../RabbitUfoAll';

gsap.registerPlugin(ScrollTrigger);

function UfoAnimation() {
  const ufoRef = useRef(null);

  useEffect(() => {
    if (ufoRef.current) {
      // SVG内の各要素を取得
      const ufoElement = ufoRef.current.querySelector('#rabbit-ufo-all_svg__ufo'); // UFOのグループ
      const lightElement = ufoRef.current.querySelector('#rabbit-ufo-all_svg__light'); // 光のグループ
      const girlElement = ufoRef.current.querySelector('#rabbit-ufo-all_svg__girl'); // 女の子のグループ

      // 初期状態：光と女の子を非表示に設定
      gsap.set([lightElement, girlElement], { autoAlpha: 0, y: -20 });

      const ufoTl = gsap.timeline({
        scrollTrigger: {
          trigger: ufoRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          // markers: true,
        },
      });

      // UFOの内部要素をアニメーション
      // fromTo() に変更し、staggerを適用
      ufoTl
        .fromTo(ufoElement.querySelectorAll("g circle"), {
          opacity: 0,
          y: -100 // アニメーションの開始位置
        }, {
          opacity: 1,
          y: 0, // アニメーションの最終位置
          stagger: 0.1,
          duration: 0.3, // 0.5から0.3に短縮
        })
        .fromTo(ufoElement.querySelectorAll("g path"), {
          opacity: 0,
          y: -100
        }, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.3, // 0.5から0.3に短縮
          onComplete: () => {
            // GSAPアニメーション完了後に、GSAPでCSSアニメーションを再現
            // UFOの浮遊アニメーション
            gsap.to(ufoElement, {
              y: "+=30", // 現在の位置から45px下に移動
              duration: 2,
              ease: "power1.inOut",
              repeat: -1, // 無限に繰り返す
              yoyo: true // 往復アニメーション
            });

            // 光と女の子のアニメーションを単一のタイムラインにまとめる
            const girlLightTl = gsap.timeline({
              repeat: -1,
              repeatDelay: 2 // 2秒の待機時間を追加
            });
            
            // 光と同時に女の子が登場（フェードインをゆっくりにする）
            girlLightTl
              .to(lightElement, { autoAlpha: 1, duration: 2, ease: "power1.inOut" })
              .to(girlElement, { autoAlpha: 1, y: 0, duration: 2, ease: "power3.out" }, "<");
            
            // 2秒遅れて光と女の子が一緒に消える
            girlLightTl
              .to([lightElement, girlElement], { autoAlpha: 0, y: -20, duration: 2, ease: "power1.in" }, "+=2");
          },
        }, "<");

      // クリーンアップ関数
      return () => {
        ufoTl.kill(); // コンポーネントがアンマウントされるときにアニメーションを停止
      };
    }
  }, []);

  return (
    <div className="ufo-wrapper"
    >
      {/* SVGコンポーネントに直接refを設定 */}
      <RabbitUfoAll ref={ufoRef} className="ufo" />
    </div>
  );
}

export default UfoAnimation;
