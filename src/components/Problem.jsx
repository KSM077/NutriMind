import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const StatCard = ({ title, desc, delay = 0, warning = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 50 }}
      className={`p-6 md:p-8 rounded-3xl border ${warning ? 'border-[#F5A623]/20 bg-gradient-to-br from-[#151006] to-[#0A0F0A]' : 'border-white/5 bg-white/5'} backdrop-blur-lg relative overflow-hidden group`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 rounded-full ${warning ? 'bg-[#F5A623]' : 'bg-[#1DB954]'} transition-transform duration-700 group-hover:scale-150`} />
      <h3 className={`text-4xl md:text-5xl font-bold font-heading mb-4 ${warning ? 'text-[#F5A623]' : 'text-[#A8FF3E]'} tracking-tighter`}>
        {title}
      </h3>
      <p className="text-white/60 text-lg md:text-xl leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

const Problem = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cityY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      id="problem"
      className="relative min-h-screen py-32 md:py-48 px-6 bg-[#0A0F0A] overflow-hidden"
    >
      {/* Decorative city silhouette abstract */}
      <motion.div 
        style={{ y: cityY, opacity }}
        className="absolute bottom-0 left-0 right-0 h-[60vh] opacity-10 pointer-events-none flex items-end justify-center mix-blend-screen"
      >
        <div className="w-full max-w-7xl h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxwYXRoIGQ9Ik0wLDEwMCBMMDswIEwxMCw2MCBMMjAsMjAgTDMwLDUwIEw0MCwxMCBMNTAsODAgTDYwLDMwIEw3MCw3MCBMODAsMjAgTDkwLDYwIEwxMDAsMTAwIFoiIGZpbGw9IiMxREI5NTQiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] bg-bottom bg-repeat-x bg-[length:auto_100%]" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 hidden md:block">
         <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-[#F5A623]/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight mb-8">
                Una ciudad que desperdicia <br/> <span className="text-white/40">lo que otros no tienen.</span>
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-[#1DB954] to-transparent mb-8" />
              <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-6">
                La causa principal: <strong className="text-white">inadecuada manipulación de los alimentos.</strong> El resultado: recursos desperdiciados, familias sin alimento suficiente, y un impacto ambiental irreversible.
              </p>
              <p className="text-sm text-white/30 uppercase tracking-wider font-medium">
                Fuente — Institución Universitaria Escuela Nacional del Deporte
              </p>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard 
              title="1.837 ton" 
              desc="Residuos sólidos y orgánicos por día en Cali." 
              delay={0.1}
            />
            <StatCard 
              title="1.650 ton" 
              desc="Son sobras de comida aún aprovechables." 
              warning={true}
              delay={0.2} 
            />
            <StatCard 
              title="80 ton" 
              desc="Residuos alimentarios solo en un día en Galería Santa Elena." 
              delay={0.3} 
            />
            <StatCard 
              title="80-90%" 
              desc="De residuos en plazas de mercado son orgánicos aprovechables." 
              delay={0.4} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
