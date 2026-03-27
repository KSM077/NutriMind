import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScanFace, Cpu, Smartphone, Recycle } from 'lucide-react';

const PipeNode = ({ icon: Icon, title, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center gap-4 relative z-10 w-32"
  >
    <div className="w-20 h-20 rounded-2xl bg-[#111] border border-white/10 shadow-[0_0_30px_rgba(29,185,84,0.15)] flex items-center justify-center group hover:border-[#A8FF3E]/50 transition-colors">
      <Icon className="w-8 h-8 text-[#1DB954] group-hover:text-[#A8FF3E] transition-colors" />
    </div>
    <span className="text-sm font-semibold text-white/80 text-center font-heading">{title}</span>
  </motion.div>
);

const Technology = () => {
  const containerRef = useRef(null);
  
  return (
    <section 
      ref={containerRef}
      id="technology"
      className="relative min-h-screen py-32 px-6 bg-[#0A0F0A] overflow-hidden flex flex-col justify-center items-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_100%)] opacity-50" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center mb-24">
         <motion.h2 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight mb-8"
         >
           Reconocimiento visual <br/> <span className="text-[#A8FF3E] text-glow">potenciado por IA.</span>
         </motion.h2>
         <motion.p 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto"
         >
           Un modelo de visión artificial analiza el estado real de tus alimentos en tiempo real, clasificándolos inteligentemente y contribuyendo a fortalecer la seguridad alimentaria en Cali.
         </motion.p>
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 px-4 md:px-0">
          
          {/* Animated Connecting Line */}
          <div className="absolute left-1/2 md:left-0 top-0 md:top-10 bottom-0 md:bottom-auto w-[2px] md:w-full h-full md:h-[2px] bg-white/5 -translate-x-1/2 md:translate-x-0">
             <motion.div 
               animate={{ 
                 top: ["0%", "100%", "100%"], 
                 left: ["0%", "100%", "100%"] 
               }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute w-full md:w-[20%] h-[20%] md:h-full bg-gradient-to-b md:bg-gradient-to-r from-transparent via-[#A8FF3E] to-transparent hidden md:block"
             />
          </div>

          <PipeNode icon={Smartphone} title="Captura de Imagen" delay={0.1} />
          <PipeNode icon={ScanFace} title="Análisis Visual" delay={0.3} />
          <PipeNode icon={Cpu} title="Clasificación IA" delay={0.5} />
          <PipeNode icon={Recycle} title="Sugerencia o Compost" delay={0.7} />
          
        </div>
      </div>
    </section>
  );
};

export default Technology;
