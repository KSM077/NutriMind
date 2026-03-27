import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'El Problema', href: '#problem' },
    { name: 'La Solución', href: '#solution' },
    { name: 'Tecnología', href: '#technology' },
    { name: 'Equipo', href: '#team' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 glass-panel bg-[#050505]/80 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
          : 'py-6 bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group cursor-pointer">
          <div className="relative flex items-center justify-center">
            <Leaf className="w-5 h-5 text-[#1DB954] transition-transform duration-300 group-hover:scale-110" />
            <motion.div 
              className="absolute inset-0 bg-[#A8FF3E] rounded-full blur-md opacity-20"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="font-heading font-bold text-lg text-white tracking-tight">
            NutriMind
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center">
          <a href="#team" className="relative group overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-0 bg-gradient-to-r from-[#1DB954] to-[#A8FF3E] opacity-70 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-[2px]" />
            <span className="relative flex items-center justify-center bg-[#050505] px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 group-hover:bg-transparent shadow-[0_0_15px_rgba(29,185,84,0.3)] group-hover:shadow-[0_0_25px_rgba(168,255,62,0.4)]">
              Conoce NutriMind
            </span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
