import React, { useState, useEffect } from 'react';

const Home = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative h-screen flex justify-center items-center overflow-hidden
                 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Animated gradient overlay (fake moving clouds) */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-40"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: `center ${offsetY * 0.3}px`,
          filter: 'blur(1px)',
        }}
      />

      {/* Glass dark vignette */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate__animated animate__fadeInDown">
          সৌদিয়া টেইলার্স
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-slate-100 animate__animated animate__fadeInUp animate__delay-1s">
          আপনার পোশাকের জন্য নিখুঁত মাপ এবং আধুনিক ডিজাইন।
        </p>

        <a
          href="/measurement"
          className="mt-8 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                     text-white font-bold py-3 px-10 rounded-full text-lg shadow-xl
                     hover:scale-110 hover:shadow-[0_0_25px_theme(colors.pink.500)]
                     animate__animated animate__zoomIn animate__delay-2s
                     transition-all duration-300"
        >
          মাপ নিতে শুরু করুন
        </a>
      </div>
    </section>
  );
};

export default Home;