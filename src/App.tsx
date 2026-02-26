import React, { useState, useEffect } from 'react';
import { ColorPicker } from './components/ColorPicker';
import { EcommerceCard } from './components/EcommerceCard';
import { findClosestTailwindColor, TailwindColorMatch } from './utils/colors';
import { Palette, Github, Star, Heart } from 'lucide-react';

export default function App() {
  const [color, setColor] = useState('#6366f1'); // Default indigo-500
  const [match, setMatch] = useState<TailwindColorMatch | null>(null);
  const [githubStars, setGithubStars] = useState<number | null>(null);

  useEffect(() => {
    const closest = findClosestTailwindColor(color);
    setMatch(closest);
  }, [color]);

  useEffect(() => {
    // Fetch GitHub stars (using a placeholder repo name based on the author)
    const fetchStars = () => {
      fetch('https://api.github.com/repos/kouame09/Tailwind-Matcher')
        .then(res => res.json())
        .then(data => {
          if (data.stargazers_count !== undefined) {
            setGithubStars(data.stargazers_count);
          }
        })
        .catch(console.error);
    };

    // Initial fetch
    fetchStars();

    // Refresh every 5 minutes (300000 ms)
    const interval = setInterval(fetchStars, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200">
      {/* Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-8 md:px-12 lg:px-16 xl:px-32 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl border border-zinc-200">
            <Palette className="text-zinc-900" size={24} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Tailwind Matcher</h1>
        </div>

        <a
          href="https://github.com/kouame09/Tailwind-Matcher"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors text-sm font-medium text-zinc-700"
        >
          <Github size={18} />
          <span className="hidden sm:inline">On GitHub</span>
          {githubStars !== null ? (
            <span className="flex items-center gap-1 bg-zinc-100 px-2 py-0.5 rounded-md text-zinc-900 text-xs font-medium">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              {githubStars.toLocaleString()}
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-zinc-100 px-2 py-0.5 rounded-md text-zinc-400 text-xs font-medium">
              <Star size={12} className="fill-zinc-300 text-zinc-300" />
              ...
            </span>
          )}
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 xl:px-32 py-12 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32">

        {/* Left Column: Controls */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              Find your perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500">
                Tailwind shade.
              </span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-md">
              Pick any color and instantly get its closest Tailwind CSS equivalent, ready to use in your next project.
            </p>
          </div>

          <ColorPicker color={color} onChange={setColor} match={match} />
        </div>

        {/* Right Column: Visualization */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-zinc-200 to-zinc-50 rounded-[2.5rem] transform rotate-3 -z-10 opacity-50" />
            <div className="absolute -inset-4 bg-white rounded-[2.5rem] transform -rotate-2 -z-10 border border-zinc-100" />

            <EcommerceCard color={match ? match.hex : color} />
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full px-6 py-8 md:px-12 lg:px-16 xl:px-32 flex items-center justify-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-zinc-300/60">
          <Heart size={14} className="text-red-400 fill-red-400" />
          <span className="text-xs text-zinc-600 font-medium">
            App by{' '}
            <a
              href="https://www.princekouame.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 hover:text-zinc-700 font-semibold transition-colors underline decoration-1 underline-offset-2"
            >
              Prince Kouamé
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
