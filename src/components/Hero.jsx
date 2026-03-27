import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ─── CONFIGURACIÓN ───────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240;       // Número total de frames en tu carpeta
const FOLDER = '/NutriMind';    // Carpeta dentro de /public
const FILE_PREFIX = 'ezgif-frame-';   // Prefijo del nombre del archivo
const FILE_EXT = 'jpg';         // Extensión de los frames
const DIGITS = 3;               // Dígitos del número (ej: 3 → ezgif-frame-001.jpg)
// ─────────────────────────────────────────────────────────────────────────────

// Genera la ruta de un frame dado su índice (base 1)
const getFramePath = (index) =>
  `${FOLDER}/${FILE_PREFIX}${String(index).padStart(DIGITS, '0')}.${FILE_EXT}`;

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // El contenedor tiene altura = 100vh × TOTAL_FRAMES / 10 para que el scroll sea suave
  // Puedes ajustar el divisor para hacer el scroll más rápido o más lento
  const SCROLL_HEIGHT = `${Math.round(TOTAL_FRAMES * 30)}px`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Usar useSpring para suavizar la interpolación entre frames y evitar saltos (ideal para el mouse wheel)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, // Ajusta este valor para mayor/menor rapidez de reacción (100 es estándar)
    damping: 30,    // Amortiguación para evitar rebotes
    restDelta: 0.001
  });

  // Texto: aparece al inicio y desaparece al 20% del scroll
  const textOpacity = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.25], [0, -60]);

  // Dibuja el frame actual en el canvas
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Escala manteniendo aspect ratio (object-fit: contain)
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawW, drawH, drawX, drawY;
    if (imgAspect > canvasAspect) {
      drawH = height;
      drawW = height * imgAspect;
    } else {
      drawW = width;
      drawH = width / imgAspect;
    }
    drawX = (width - drawW) / 2;
    drawY = (height - drawH) / 2 + 45;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Redimensiona el canvas al tamaño del viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Precarga todas las imágenes
  useEffect(() => {
    const images = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsReady(true);
          drawFrame(0);
        }
      };
      img.onerror = () => {
        // Si un frame falla, lo contamos igual para no bloquear
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) setIsReady(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [drawFrame]);

  // Sincroniza el frame con el progreso de scroll
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (progress) => {
      const frameIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    });
    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [smoothProgress, drawFrame]);

  // Resize listener
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{ height: SCROLL_HEIGHT }}
      className="relative w-full bg-[#050505]"
    >
      {/* Canvas sticky — se queda fijo mientras el usuario hace scroll */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* Canvas de frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: '#050505' }}
        />

        {/* Overlay de carga */}
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-[#050505]">
            <div className="mb-6">
              <span className="text-[#1DB954] font-heading font-bold text-2xl">NutriMind</span>
            </div>
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#1DB954] to-[#A8FF3E]"
                style={{ width: `${loadPercent}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="mt-4 text-white/40 text-sm tabular-nums">{loadPercent}%</p>
          </div>
        )}

        {/* Texto hero — desaparece con el scroll */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6 text-center bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.7)_0%,transparent_65%)]"
        >
          {/* Pill de datos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#1DB954]/40 bg-[#050505]/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#A8FF3E] animate-pulse shadow-[0_0_12px_#A8FF3E]" />
            <span className="text-sm font-semibold text-white/90 uppercase tracking-widest drop-shadow-md">
              1.650 toneladas de comida desperdiciada al día en Cali
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-7xl md:text-8xl lg:text-[10rem] font-bold font-heading tracking-tighter mb-4 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-[#A8FF3E]">Nutri</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#1DB954] to-[#A8FF3E]">Mind</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-8 max-w-3xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
          >
            La inteligencia que salva <br className="hidden md:block" /> lo que tiramos.
          </motion.p>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl text-white/80 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-medium"
          >
            Una solución tecnológica para el desperdicio de alimentos en Cali, Colombia.
          </motion.p>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/40">Descubre</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent overflow-hidden">
            <motion.div
              animate={{ y: [0, 48] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="w-full h-1/2 bg-[#A8FF3E]"
            />
          </div>
        </motion.div>

        {/* Gradiente inferior para blend suave con la siguiente sección */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default Hero;