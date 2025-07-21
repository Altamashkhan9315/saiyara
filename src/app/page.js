"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const fullText =
    "Har pyaar ek kahani hota hai…📖\nKahi khushiyon se bhara, kahi takleefon se.😊💔\nKuch log saath reh jaate hain,🤝\naur kuch sirf yaadon mein.🕊\nYeh un lamhon ki kahani hai…\njo toot kar bhi khoobsurat the. ✨";

  const [displayedText, setDisplayedText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoBlur, setVideoBlur] = useState(true);
  const [showCarousel, setShowCarousel] = useState(false);

  const stars = Array.from({ length: 30 }).map((_, i) => ({
    left: Math.random() * 200,
    top: Math.random() * 50,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 2,
    id: i,
  }));
  // Auto-advance for carousel

  // Typewriter
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 600);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  // Blur transition for video
  useEffect(() => {
    if (showVideo) setTimeout(() => setVideoBlur(false), 1200);
  }, [showVideo]);

  // Delay carousel appearance by 5 seconds after video shows
  useEffect(() => {
    if (!showVideo) {
      setShowCarousel(false);
      return;
    }
    const timer = setTimeout(() => setShowCarousel(true), 6000);
    return () => clearTimeout(timer);
  }, [showVideo]);

  // Carousel state for single card
  const carouselCards = [
    { img: "/IMG_1.png", text: "Khaamoshiyon mein bhi pyaar tha... 🥀" },
    { img: "/IMG_5.png", text: "Woh aakhri shaam...hamesha yaad rahegi. 🌇💔"},
    { img: "/IMG_4.jpg", text: "Uske kandhe pe sukoon tha... aaj bhi hai. 😔💭" },
    { img: "/IMG_2.jpg", text: "Jab lafzon ne dil tod diya. 💔🖤" },
    { img: "/IMG_3.jpg", text: "Saath chalte hue... juda ho gaye.🚶‍♂💔🚶‍♀" },
  ];
  const totalCards = carouselCards.length;


  // 3-card carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loopCount, setLoopCount] = useState(0);

  // Auto-advance 3-card carousel
  useEffect(() => {
    if (!showCarousel) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % totalCards;
        if (next === 0) setLoopCount((c) => c + 1);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [showCarousel, totalCards]);

  // Indices for the three visible cards
  const leftIdx = (currentIndex - 1 + totalCards) % totalCards;
  const centerIdx = currentIndex % totalCards;
  const rightIdx = (currentIndex + 1) % totalCards;
  const visibleCards = [leftIdx, centerIdx, rightIdx];

  // Typewriter effect for sad card
  const [sadText, setSadText] = useState("");
  const sadFullText = "Aakhir mein, sirf yaadein reh jaati hain… 🕰\nNa woh muskurahat wapas aati hai,😊\nna woh shakhs.\nPar dil… dil usi mod pe ruk jaata hai💔\njahan se sab khatam hua tha. 🌑";
  useEffect(() => {
    if (loopCount < 2) return;
    setSadText("");
    let i = 0;
    const interval = setInterval(() => {
      setSadText(sadFullText.slice(0, i + 1));
      i++;
      if (i === sadFullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [loopCount]);


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#0a0a23] to-[#1a1a40] overflow-hidden">
      {/* Star field */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white shadow"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            opacity: 0.8,
            animation: `sparkle ${star.duration}s infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Typewriter screen */}
      {!showVideo && (
        <div className="relative w-[340px] max-w-full min-h-[180px] z-50 border-2 border-white/50 text-white p-6 bg-black/60 rounded-2xl flex flex-col items-center justify-center shadow-2xl backdrop-blur-md">
          <pre className="whitespace-pre-line text-center text-lg md:text-xl font-serif tracking-wide drop-shadow-lg">
            {displayedText}
          </pre>
          {showButton && (
            <button
              className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-700 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300 border-2 border-white/30"
              onClick={() => setShowVideo(true)}
            >
              Hamari Adhuri Kahani 💔

            </button>
          )}
        </div>
      )}

      {/* Video + Carousel */}
      {showVideo && (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Video with blur effect */}
          <video
            src="/saiyara.mp4"
            autoPlay
            loop
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
              videoBlur ? "blur-lg" : "blur-0"
            }`}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Show carousel for 2 loops, then show sad card */}
          {showCarousel && loopCount < 2 ? (
            <div className="relative z-50 flex items-center justify-center w-full h-[320px] mt-6">
              <div className="flex gap-6 justify-center items-center w-auto mx-auto relative">
                {[leftIdx, centerIdx, rightIdx].map((idx, i) => {
                  const card = carouselCards[idx];
                  const isCenter = idx === centerIdx;
                  const isSide = idx === leftIdx || idx === rightIdx;
                  return (
                    <motion.div
                      key={idx + '-' + currentIndex}
                      initial={{ x: 100, opacity: 0, scale: isCenter ? 1.05 : 0.95 }}
                      animate={{ x: 0, opacity: 1, scale: isCenter ? 1.15 : 1 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className={`flex flex-col items-center justify-center bg-white/10 border border-white/20 rounded-2xl p-0 shadow-lg w-[220px] h-[280px] relative ${isCenter ? 'z-10' : ''} ${isSide ? 'backdrop-blur-sm blur-[2px]' : ''}`}
                      style={{ zIndex: isCenter ? 10 : 5 }}
                    >
                      <img
                        src={card.img}
                        alt={card.text}
                        className="w-full h-[70%] object-cover rounded-t-2xl"
                        style={{ minHeight: '0', minWidth: '0' }}
                      />
                      <div className="flex-1 flex items-center justify-center w-full h-[30%]">
                        <p className="text-white text-center text-lg font-semibold w-full px-2">
                          {card.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : null}
          {/* Show sad card after carousel loops twice */}
          {showVideo && showCarousel && loopCount >= 2 && (
            <div className="relative z-50 flex items-center justify-center w-full h-[320px] mt-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: "spring" }}
                className="flex flex-col items-center justify-center w-[350px] h-[200px] bg-black/80 rounded-2xl shadow-2xl p-8"
              >
                <p className="text-white text-xl font-serif text-center">
                  {sadText}
                </p>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
