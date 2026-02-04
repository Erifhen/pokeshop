export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-12 mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-6">

        {/* Logo degradê */}
        <div>
          <span className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-b from-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[2px_2px_0px_rgba(0,0,0,0.6)]">
            GOOD LUCK
          </span>
        </div>

        {/* Menção ao Motion Design */}
        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs md:text-sm">
          <span>Motion design por</span>
          <a
            href="https://instagram.com/oloco_guss"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold bg-gradient-to-b from-orange-500 to-yellow-400 bg-clip-text text-transparent hover:opacity-80 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              width={16}
              height={16}
              className="inline-block"
            />
            (@oloco_guss)
          </a>
        </div>

        {/* Separador */}
        <div className="w-20 md:w-24 h-1 mx-auto bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"></div>

        {/* Texto de direitos */}
        <p className="text-gray-400 text-xs md:text-sm">
          © 2026 Good Luck Pokémon Store · Projeto de portfólio
        </p>

        {/* Aviso demonstrativo */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 md:p-4 rounded-lg inline-block max-w-md mx-auto">
          <p className="text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            Atenção: Este site é apenas um projeto demonstrativo. Nenhuma compra real é realizada.
          </p>
        </div>
      </div>
    </footer>
  );
}
