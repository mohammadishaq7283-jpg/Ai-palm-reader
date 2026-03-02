'use client';

import { motion } from 'framer-motion';

interface TarotCardProps {
  isFlipped: boolean;
  cardName: string;
  positionLabel: string;
  index: number;
}

// Just a placeholder back image pattern with CSS
const CardBack = () => (
  <div className="w-full h-full bg-mystic-900 border-2 border-gold-500 rounded-lg flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
    <div className="w-20 h-20 border border-gold-500/50 rounded-full flex items-center justify-center rotate-45">
       <div className="w-16 h-16 border border-gold-500/30 rounded-full" />
    </div>
  </div>
);

const CardFront = ({ name }: { name: string }) => (
  <div className="w-full h-full bg-white text-mystic-900 rounded-lg flex flex-col items-center justify-center p-2 border-4 border-gold-500">
    <div className="text-xs uppercase tracking-widest text-mystic-600 mb-2">The</div>
    <div className="text-center font-bold font-serif text-lg">{name}</div>
    <div className="mt-4 text-4xl">🎴</div>
  </div>
);

export default function TarotCard({ isFlipped, cardName, positionLabel, index }: TarotCardProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-gold-400 font-serif tracking-widest uppercase text-sm">{positionLabel}</span>
      <div className="relative w-40 h-64 perspective-1000">
        <motion.div
          className="w-full h-full relative preserve-3d"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Back of card (Visible initially) */}
          <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
            <CardBack />
          </div>

          {/* Front of card (Hidden initially) */}
          <div 
            className="absolute inset-0 backface-hidden" 
            style={{ 
              backfaceVisibility: 'hidden', 
              transform: 'rotateY(180deg)' 
            }}
          >
            <CardFront name={cardName} />
          </div>
        </motion.div>
      </div>
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: isFlipped ? 1 : 0 }}
         transition={{ delay: 0.8 + (index * 0.2) }}
         className="text-white font-medium text-center"
      >
        {cardName}
      </motion.div>
    </div>
  );
}
