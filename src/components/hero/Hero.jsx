import React from "react";
import videoFile from "../../assets/pokemon-cards.mp4"; // importa o arquivo

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden flex items-center justify-center mt-20">
      
      {/* --- Fundo animado --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-800 to-black animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.25)_0%,_transparent_70%)] blur-3xl"></div>
      </div>

      {/* --- Container do Conteúdo --- */}
      <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col md:flex-row items-center justify-center h-full">
        
        {/* --- Palavra "GOOD" --- */}
        <div className="flex-1 flex justify-end transform md:rotate-[10deg] md:-translate-y-12">
          <h1 className="font-black text-[90px] sm:text-[120px] lg:text-[180px] leading-none tracking-tight bg-gradient-to-b from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
            GOOD
          </h1>
        </div>

        {/* --- Central: Vídeo do Card --- */}
        <div className="relative z-20 mx-4 lg:mx-12">
          <div className="w-64 h-[380px] lg:w-72 lg:h-[450px] rounded-2xl overflow-hidden bg-black shadow-2xl">
            <video 
              src={videoFile}
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover object-[56.5%_center]"
            >
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </div>

        {/* --- Palavra "LUCK" --- */}
        <div className="flex-1 flex justify-start transform md:-rotate-[10deg] md:-translate-y-12">
          <h1 className="font-black text-[90px] sm:text-[120px] lg:text-[180px] leading-none tracking-tight bg-gradient-to-b from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
            LUCK
          </h1>
        </div>
      </div>

      {/* Gradiente de transição para a próxima seção */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-50 to-transparent z-30"></div>
    </section>
  );
}
