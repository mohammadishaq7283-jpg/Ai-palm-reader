'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import CameraCapture from '@/components/CameraCapture';
import Loader from '@/components/Loader';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function PalmPage() {
  const t = useTranslations('Palm');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleCapture = (imgSrc: string) => {
    setImage(imgSrc);
  };

  const analyzePalm = async () => {
    if (!image) return;
    
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'palm',
          language: locale,
          data: { image }
        })
      });

      const data = await response.json();
      if (data.text) {
        setResult(data.text);
      } else {
        alert(tCommon('error'));
      }
    } catch (err) {
      console.error(err);
      alert(tCommon('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-serif text-gold-500">{t('title')}</h1>
        <p className="text-mystic-300">{t('instruction')}</p>
      </div>

      {!result && !loading && (
        <div className="flex flex-col items-center gap-6">
          <CameraCapture onCapture={handleCapture} />
          
          {image && (
            <button
              onClick={analyzePalm}
              className="px-8 py-3 bg-gradient-to-r from-gold-500 to-amber-600 text-mystic-900 font-bold rounded-full shadow-lg hover:shadow-gold-500/20 transform hover:-translate-y-1 transition-all animate-glow"
            >
              {t('analyze')}
            </button>
          )}
        </div>
      )}

      {loading && (
        <div className="py-20">
          <Loader text={t('analyzing')} />
        </div>
      )}

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-mystic-800/80 backdrop-blur-md rounded-2xl p-8 border border-gold-500/30 shadow-2xl"
        >
          <h2 className="text-2xl font-serif text-gold-400 mb-6 border-b border-white/10 pb-4">
            {t('results')}
          </h2>
          <div className="prose prose-invert prose-p:text-mystic-100 prose-headings:text-purple-300 max-w-none">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
          <div className="mt-8 text-center">
            <button 
              onClick={() => { setImage(null); setResult(null); }}
              className="text-mystic-300 hover:text-white underline"
            >
              {t('retake')}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
