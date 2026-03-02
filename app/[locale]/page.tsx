import { useTranslations } from 'next-intl';
import { Link } from '@/src/navigation';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-float">
      <div className="relative">
        <div className="absolute -inset-4 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <h1 className="relative text-5xl md:text-7xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-purple-300 drop-shadow-sm">
          {t('title')}
        </h1>
      </div>
      
      <p className="max-w-2xl text-lg md:text-xl text-mystic-100/90 leading-relaxed">
        {t('subtitle')}
      </p>

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <Link 
          href="/palm"
          className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-gold-500/50 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative z-10 text-xl font-serif text-white group-hover:text-gold-400 flex items-center gap-3">
            ✋ {t('startPalm')}
          </span>
        </Link>

        <Link 
          href="/tarot"
          className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-gold-500/50 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative z-10 text-xl font-serif text-white group-hover:text-gold-400 flex items-center gap-3">
            🃏 {t('startTarot')}
          </span>
        </Link>
      </div>
    </div>
  );
}
