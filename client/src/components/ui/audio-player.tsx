import React, { useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { useAudio } from '@/lib/hooks/use-audio';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RefreshCw, 
  Volume2
} from 'lucide-react';

type AudioPlayerProps = {
  title: string;
  audioUrl: string;
  onNextTrack?: () => void;
  onPreviousTrack?: () => void;
  onComplete?: () => void;
};

export function AudioPlayer({
  title,
  audioUrl,
  onNextTrack = () => {},
  onPreviousTrack = () => {},
  onComplete
}: AudioPlayerProps) {
  const { 
    playing, 
    duration, 
    currentTime, 
    progress,
    formatTime,
    play, 
    pause, 
    setProgress 
  } = useAudio(audioUrl);

  // Track completion
  useEffect(() => {
    if (progress === 100 && onComplete) {
      onComplete();
    }
  }, [progress, onComplete]);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-5 mb-4 sm:mb-0">
          <Volume2 className="text-primary w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <div className="mb-2">
            <Slider
              value={[progress]}
              max={100}
              step={1}
              className="w-full"
              onValueChange={(value) => setProgress(value[0])}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-4">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-6">
        <button 
          className="text-gray-600 hover:text-primary transition"
          onClick={onPreviousTrack}
          disabled={!onPreviousTrack}
        >
          <SkipBack className="w-5 h-5" />
        </button>
        <button 
          className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white"
          onClick={playing ? pause : play}
        >
          {playing ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-1" />
          )}
        </button>
        <button 
          className="text-gray-600 hover:text-primary transition"
          onClick={onNextTrack}
          disabled={!onNextTrack}
        >
          <SkipForward className="w-5 h-5" />
        </button>
        <button className="text-gray-600 hover:text-primary transition">
          <RefreshCw className="w-5 h-5" />
        </button>
        <button className="text-gray-600 hover:text-primary transition">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
