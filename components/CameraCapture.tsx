'use client';

import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const t = useTranslations('Palm');
  const webcamRef = useRef<Webcam>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      onCapture(imageSrc);
      setIsCameraOpen(false);
    }
  }, [webcamRef, onCapture]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        onCapture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const retake = () => {
    setImage(null);
    setIsCameraOpen(true);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
      {!image ? (
        <div className="flex flex-col items-center space-y-6">
          {isCameraOpen ? (
            <div className="relative w-full rounded-xl overflow-hidden border-2 border-mystic-500 shadow-glow">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                className="w-full"
              />
              <button
                onClick={capture}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gold-500 hover:bg-gold-400 text-mystic-900 font-bold py-2 px-6 rounded-full shadow-lg transition-all"
              >
                {t('capture')}
              </button>
            </div>
          ) : (
            <div className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-mystic-500 rounded-xl bg-mystic-900/50">
               <Camera size={48} className="text-mystic-300 mb-2" />
               <p className="text-mystic-300 text-sm">{t('instruction')}</p>
            </div>
          )}

          <div className="flex space-x-4 w-full justify-center">
            {!isCameraOpen && (
              <button
                onClick={() => setIsCameraOpen(true)}
                className="flex items-center gap-2 bg-mystic-600 hover:bg-mystic-500 text-white py-2 px-4 rounded-lg transition-colors"
              >
                <Camera size={18} />
                {t('capture')}
              </button>
            )}
            
            <label className="flex items-center gap-2 bg-mystic-800 hover:bg-mystic-700 text-white py-2 px-4 rounded-lg cursor-pointer border border-mystic-600 transition-colors">
              <Upload size={18} />
              {t('upload')}
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img src={image} alt="Palm" className="w-full rounded-xl border-2 border-gold-500 shadow-glow mb-4" />
          <button
            onClick={retake}
            className="flex items-center gap-2 text-mystic-300 hover:text-white transition-colors"
          >
            <RefreshCw size={16} />
            {t('retake')}
          </button>
        </div>
      )}
    </div>
  );
}
