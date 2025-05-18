import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

type AudioState = {
  playing: boolean;
  duration: number;
  currentTime: number;
  progress: number;
};

export function useAudio(audioUrl: string | null) {
  const [audioState, setAudioState] = useState<AudioState>({
    playing: false,
    duration: 0,
    currentTime: 0,
    progress: 0,
  });
  
  const soundRef = useRef<Howl | null>(null);
  const intervalRef = useRef<number | null>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  useEffect(() => {
    if (!audioUrl) return;
    
    // Clear previous sound and interval
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Create new Howl instance
    soundRef.current = new Howl({
      src: [audioUrl],
      html5: true,
      onload: () => {
        if (soundRef.current) {
          setAudioState(prev => ({
            ...prev,
            duration: soundRef.current?.duration() || 0,
          }));
        }
      },
      onplay: () => {
        setAudioState(prev => ({ ...prev, playing: true }));
        
        // Update current time during playback
        intervalRef.current = window.setInterval(() => {
          if (soundRef.current) {
            const currentTime = soundRef.current.seek();
            const duration = soundRef.current.duration();
            const progress = (currentTime / duration) * 100;
            
            setAudioState(prev => ({
              ...prev,
              currentTime,
              progress,
            }));
          }
        }, 1000);
      },
      onpause: () => {
        setAudioState(prev => ({ ...prev, playing: false }));
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      },
      onstop: () => {
        setAudioState(prev => ({ 
          ...prev, 
          playing: false,
          currentTime: 0,
          progress: 0
        }));
        
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      },
      onend: () => {
        setAudioState(prev => ({ 
          ...prev, 
          playing: false,
          currentTime: prev.duration,
          progress: 100
        }));
        
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      },
    });
    
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [audioUrl]);

  const play = () => {
    if (soundRef.current && !audioState.playing) {
      soundRef.current.play();
    }
  };

  const pause = () => {
    if (soundRef.current && audioState.playing) {
      soundRef.current.pause();
    }
  };

  const stop = () => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  };

  const setProgress = (percent: number) => {
    if (soundRef.current && audioState.duration) {
      const newTime = (percent / 100) * audioState.duration;
      soundRef.current.seek(newTime);
      
      setAudioState(prev => ({
        ...prev,
        currentTime: newTime,
        progress: percent
      }));
    }
  };

  const next = () => {
    // To be implemented by parent component
  };

  const previous = () => {
    // To be implemented by parent component
  };

  return {
    ...audioState,
    formatTime,
    play,
    pause,
    stop,
    setProgress,
    next,
    previous,
  };
}
