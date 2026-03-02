'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import TarotCard from '@/components/TarotCard';
import Loader from '@/components/Loader';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const TAROT_DECK = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor", 
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit", 
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance", 
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World"
];

export default function TarotPage() {
  const t = useTranslations('Tarot');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  
  const [cards, setCards] = useState<string[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState<string | null>(null);

  const drawCards = () => {
    // Shuffle and pick 3
    const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    setCards(selected);
    setIsFlipped(false);
    setReading(null);

    // Auto interpret after draw
    setTimeout(() => {
      setIsFlipped(true);
    }, 500);
  };

  const getInterpretation = async () => {
    if (cards.length === 0) return;
    setLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tarot',
          language: locale,
          data: { cards }
        })
      });

      const data = await response.json();
      if (data.text) {
        setReading(data.text);
      }
    } catch (err) {
      console.error(err);
      alert(tCommon('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif text-gold-500">{t('title')}</h1>
        <p className="text-mystic-300">{t('instruction')}</p>
      </div>

      {cards.length === 0 ? (
        <div className="flex justify-center py-20">
          <button
            onClick={drawCards}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-mystic-800 font-serif rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mystic-500 hover:bg-mystic-700 border border-gold-500/50 shadow-[0_0_20px_rgba(255,215,0,0.3)] animate-pulse-slow"
          >
            {t('draw')}
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 min-h-[350px]">
          <TarotCard index={0} isFlipped={isFlipped} cardName={cards[0]} positionLabel={t('past')} />
          <TarotCard index={1} isFlipped={isFlipped} cardName={cards[1]} positionLabel={t('present')} />
          <TarotCard index={2} isFlipped={isFlipped} cardName={cards[2]} positionLabel={t('future')} />
        </div>
      )}

      {isFlipped && !reading && !loading && (
        <div className="flex justify-center">
          <button
            onClick={getInterpretation}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/40 transform hover:-translate-y-1 transition-all"
          >
            {t('reveal')}
          </button>
        </div>
      )}

      {loading && <Loader text={t('loading')} />}

      {reading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-mystic-900/90 backdrop-blur-xl border border-gold-500/20 rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl"
        >
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-gold-400">
            <ReactMarkdown>{reading}</ReactMarkdown>
          </div>
          <div className="mt-8 text-center border-t border-white/10 pt-4">
             <button onClick={() => setCards([])} className="text-sm text-mystic-400 hover:text-gold-400 uppercase tracking-widest">
               Draw New Spread
             </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
