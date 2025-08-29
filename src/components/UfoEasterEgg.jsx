// UfoEasterEgg.jsx
import { useState, useRef, useEffect } from "react";
import "./UfoEasterEgg.css";
import ufoImg from "../assets/home/about-me/ufo.png"; // 実際のパスに合わせて

const messages = [
  "Stay sweet!",
  "Stay weird!",
  "Stay creating!",
  "Stay colorful",
];

export default function UfoEasterEgg() {
  const [open, setOpen] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const timerRef = useRef(null);

  const showBubble = () => {
    setOpen(true);

    setMsgIndex(Math.floor(Math.random() * messages.length));


    // 自動で閉じる（2.5秒）
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(false), 2500);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="ufo-wrap">
      <button className="ufo-button" onClick={showBubble}>
        <img src={ufoImg} alt="Cute UFO" />
      </button>

      {open && (
        <div className="ufo-bubble">
          {messages[msgIndex]}
        </div>
      )}
    </div>
  );
}
