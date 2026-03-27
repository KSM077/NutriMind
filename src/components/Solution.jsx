import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, CheckCircle2, ChefHat, Sparkles } from 'lucide-react';

const Solution = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [10, -5]);

  return (
    <section 
      ref={containerRef}
      id="solution"
      className="relative min-h-screen py-32 px-6 bg-[#050505] overflow-hidden flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Mockup / Visual Side */}
          <div className="order-2 lg:order-1 relative h-[600px] flex items-center justify-center">
            {/* Background glows */}
            <div className="absolute inset-0 bg-[#A8FF3E]/5 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.div 
              style={{ y: mockupY, rotateZ: mockupRotate }}
              className="relative w-[320px] h-[650px] bg-black rounded-[48px] border-[8px] border-[#1a1a1a] shadow-2xl shadow-[#1DB954]/20 overflow-hidden flex flex-col"
            >
              {/* Fake App Header */}
              <div className="px-6 pt-12 pb-4 bg-gradient-to-b from-[#1DB954]/20 to-transparent flex justify-between items-center">
                <span className="font-heading font-bold text-white text-lg">NutriMind</span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                   <div className="w-2 h-2 rounded-full bg-[#1DB954]" />
                </div>
              </div>

              {/* Fake App Body */}
              <div className="flex-1 p-4 flex flex-col gap-4">
                {/* Camera Viewport */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="w-full h-48 rounded-2xl bg-[#111] border border-white/5 relative overflow-hidden group"
                >
                   {/* Scanning animation */}
                   <motion.div 
                     animate={{ y: [0, 192, 0] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     className="absolute w-full h-[2px] bg-[#A8FF3E] shadow-[0_0_15px_#A8FF3E] z-10 opacity-70"
                   />
                   <div className="absolute inset-0 flex items-center justify-center text-white/20">
                     <Camera className="w-12 h-12" />
                   </div>
                </motion.div>

                {/* Analysis Result */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-2xl p-4 flex gap-4 items-start"
                >
                  <div className="bg-[#1DB954] text-black p-2 rounded-full mt-1">
                     <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Tomate Aprovechable</h4>
                    <p className="text-sm text-white/60">Maduración 85%. Apto para consumo. Evitar refrigeración prolongada.</p>
                  </div>
                </motion.div>

                {/* Recipe Suggestion */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 mt-auto mb-4"
                >
                  <div className="bg-[#A8FF3E]/20 text-[#A8FF3E] p-2 rounded-xl h-fit">
                     <ChefHat className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white/90 text-sm mb-1">Sugerencia NutriMind</h4>
                    <p className="text-xs text-white/50 mb-2">Salsa de tomate casera o ensalada fresca.</p>
                    <button className="text-xs font-semibold text-[#1DB954] hover:text-[#A8FF3E] transition-colors">Ver receta completa &rarr;</button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#A8FF3E] text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" /> La Solución
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight mb-8">
                NutriMind: <span className="text-white/40">inteligencia artificial al servicio de la alimentación.</span>
              </h2>
              
              <ul className="space-y-6">
                {[
                  "Escanea tus alimentos con la cámara de tu celular.",
                  "La IA clasifica si el alimento es apto para consumo o solo para abono.",
                  "Recibe recetas inteligentes para aprovechar lo que tienes antes de perderlo."
                ].map((point, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/50 flex items-center justify-center text-[#A8FF3E] text-xs font-bold">
                      {index + 1}
                    </div>
                    <p className="text-lg text-white/70 leading-relaxed font-body">
                      {point}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Solution;
