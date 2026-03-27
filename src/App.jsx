import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Technology from './components/Technology';
import TeamCTA from './components/TeamCTA';

function App() {
  return (
    <div className="bg-[#050505] text-white/60 min-h-screen font-body selection:bg-[#1DB954]/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Technology />
        <TeamCTA />
      </main>
    </div>
  );
}

export default App;
