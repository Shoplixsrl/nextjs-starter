"use client";

import { useRef, useCallback, useEffect, useState } from 'react';

interface UseAudioOptions {
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onError?: (error: Error) => void;
}

export function useAudio(options: UseAudioOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'auto';

      audioRef.current.addEventListener('canplaythrough', () => {
        setIsReady(true);
      });

      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration * 1000);
        }
      });

      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          const time = audioRef.current.currentTime * 1000;
          const dur = audioRef.current.duration * 1000;
          setCurrentTime(time);
          options.onTimeUpdate?.(time, dur);
        }
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        options.onEnded?.();
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        options.onError?.(new Error('Failed to load audio'));
      });

      audioRef.current.addEventListener('play', () => {
        setIsPlaying(true);
      });

      audioRef.current.addEventListener('pause', () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTrack = useCallback((url: string) => {
    if (audioRef.current) {
      setIsReady(false);
      audioRef.current.src = url;
      audioRef.current.load();
    }
  }, []);

  const play = useCallback(async () => {
    if (audioRef.current && isReady) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error('Play error:', error);
      }
    }
  }, [isReady]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, play, pause]);

  const seekTo = useCallback((timeMs: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeMs / 1000;
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, []);

  return {
    loadTrack,
    play,
    pause,
    togglePlay,
    seekTo,
    setVolume,
    setMuted,
    isReady,
    isPlaying,
    currentTime,
    duration,
  };
}
