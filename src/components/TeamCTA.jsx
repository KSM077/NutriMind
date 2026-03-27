import { motion } from 'framer-motion';

const teamMembers = [
  "Miguel Angel Rojas", 
  "Monica Astudillo", 
  "Emanuel Torres", 
  "Andres Massey", 
  "Cristhian Cuellar", 
  "Dayana Castillo", 
  "Emanuel Ramirez", 
  "Melisa Niño"
];

const TeamCTA = () => {
  return (
    <section id="team" className="relative bg-[#050505] overflow-hidden">
      {/* Team Section */}
      <div className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-white/90">Nuestro Equipo</h2>
          <p className="text-white/50 text-lg">Los investigadores detrás de NutriMind.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {teamMembers.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#1DB954]/50 transition-colors group text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1DB954]/20 to-[#0A0F0A] mx-auto mb-4 border border-[#1DB954]/20 group-hover:from-[#1DB954]/40 transition-colors" />
              <h4 className="font-heading font-semibold text-sm md:text-base text-white/80 group-hover:text-white transition-colors">{name}</h4>
              <p className="text-xs text-[#1DB954]/80 mt-1">Investigador</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Width CTA */}
      <div className="relative py-32 md:py-48 px-6 flex flex-col items-center justify-center text-center mt-12 bg-[#0A0F0A]">
        {/* Glow Effects */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-[#1DB954]/10 rounded-[100%] blur-[120px] pointer-events-none" />
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A8FF3E]/30 to-transparent" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-4xl flex flex-col items-center"
        >
          <div className="flex gap-2 justify-center mb-8 flex-wrap">
            {["IA", "Sostenibilidad", "Cali", "ODS 12"].map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#A8FF3E] tracking-wider uppercase">
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-6xl md:text-8xl font-bold font-heading tracking-tighter mb-6 text-glow">
            Menos desperdicio.<br/>
            <span className="text-gradient">Más vida.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl font-medium">
            NutriMind. Diseñado para Cali, pensado para el mundo.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <button className="relative group overflow-hidden rounded-full p-[2px]">
              <span className="absolute inset-0 bg-gradient-to-r from-[#1DB954] to-[#A8FF3E] opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-[2px]" />
              <span className="relative flex items-center justify-center bg-[#050505] px-8 py-4 rounded-full text-lg font-bold text-white transition-all duration-300 group-hover:bg-transparent shadow-lg shadow-[#1DB954]/20 group-hover:shadow-[#A8FF3E]/40">
                Conoce NutriMind
              </span>
            </button>
            <a href="#" className="text-lg font-medium text-white/60 hover:text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-all">
              Ver investigación completa
            </a>
          </div>

          <p className="mt-16 text-sm text-white/40 max-w-md mx-auto">
            Un proyecto universitario con impacto real en la seguridad alimentaria de Colombia.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamCTA;
