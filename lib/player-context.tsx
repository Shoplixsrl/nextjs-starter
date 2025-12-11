"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Track, Playlist, Album, tracks as allTracks } from './spotify-data';

interface PlayerContextType {
  // Current state
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  progress: number;
  duration: number;
  isShuffled: boolean;
  repeatMode: 'off' | 'all' | 'one';
  isLoading: boolean;

  // Queue
  queue: Track[];
  queueIndex: number;

  // Context info (what's playing from)
  playingFrom: {
    type: 'playlist' | 'album' | 'artist' | 'liked' | 'search' | null;
    id: string | null;
    name: string | null;
  };

  // Actions
  playTrack: (track: Track, context?: { type: 'playlist' | 'album' | 'artist' | 'liked' | 'search'; id: string; name: string; tracks?: Track[] }) => void;
  playPlaylist: (playlist: Playlist, startIndex?: number) => void;
  playAlbum: (album: Album, startIndex?: number) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seekTo: (position: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addToQueue: (track: Track) => void;
  clearQueue: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [playingFrom, setPlayingFrom] = useState<{
    type: 'playlist' | 'album' | 'artist' | 'liked' | 'search' | null;
    id: string | null;
    name: string | null;
  }>({ type: null, id: null, name: null });

  // Audio element ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const repeatModeRef = useRef(repeatMode);

  // Keep repeat mode ref in sync
  useEffect(() => {
    repeatModeRef.current = repeatMode;
  }, [repeatMode]);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'auto';

      // Event listeners
      audioRef.current.addEventListener('loadstart', () => {
        setIsLoading(true);
      });

      audioRef.current.addEventListener('canplaythrough', () => {
        setIsLoading(false);
      });

      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration * 1000);
        }
      });

      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime * 1000);
        }
      });

      audioRef.current.addEventListener('ended', () => {
        if (repeatModeRef.current === 'one') {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        } else {
          // nextTrack will be called
          setIsPlaying(false);
        }
      });

      audioRef.current.addEventListener('play', () => {
        setIsPlaying(true);
      });

      audioRef.current.addEventListener('pause', () => {
        setIsPlaying(false);
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsLoading(false);
      });

      // Set initial volume
      audioRef.current.volume = volume;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle track ended for queue progression
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeatModeRef.current !== 'one') {
        // Auto-advance to next track
        if (queue.length > 0) {
          let nextIndex = queueIndex + 1;
          if (nextIndex >= queue.length) {
            if (repeatModeRef.current === 'all') {
              nextIndex = 0;
            } else {
              setIsPlaying(false);
              return;
            }
          }
          setQueueIndex(nextIndex);
          const nextTrack = queue[nextIndex];
          setCurrentTrack(nextTrack);
          if (nextTrack.previewUrl && audioRef.current) {
            audioRef.current.src = nextTrack.previewUrl;
            audioRef.current.play();
          }
        }
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [queue, queueIndex]);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const loadAndPlayTrack = useCallback((track: Track) => {
    if (audioRef.current && track.previewUrl) {
      setProgress(0);
      audioRef.current.src = track.previewUrl;
      audioRef.current.load();
      audioRef.current.play().catch(console.error);
    }
  }, []);

  const playTrack = useCallback((track: Track, context?: { type: 'playlist' | 'album' | 'artist' | 'liked' | 'search'; id: string; name: string; tracks?: Track[] }) => {
    setCurrentTrack(track);
    setDuration(track.durationMs);
    loadAndPlayTrack(track);

    if (context) {
      setPlayingFrom({
        type: context.type,
        id: context.id,
        name: context.name
      });

      if (context.tracks) {
        const trackIndex = context.tracks.findIndex(t => t.id === track.id);
        setQueue(context.tracks);
        setQueueIndex(trackIndex >= 0 ? trackIndex : 0);
      }
    }
  }, [loadAndPlayTrack]);

  const playPlaylist = useCallback((playlist: Playlist, startIndex = 0) => {
    const tracksToPlay = isShuffled
      ? [...playlist.tracks].sort(() => Math.random() - 0.5)
      : playlist.tracks;

    setQueue(tracksToPlay);
    setQueueIndex(startIndex);
    setCurrentTrack(tracksToPlay[startIndex]);
    setDuration(tracksToPlay[startIndex].durationMs);
    loadAndPlayTrack(tracksToPlay[startIndex]);
    setPlayingFrom({
      type: 'playlist',
      id: playlist.id,
      name: playlist.title
    });
  }, [isShuffled, loadAndPlayTrack]);

  const playAlbum = useCallback((album: Album, startIndex = 0) => {
    const albumTracks = allTracks.filter(t => t.albumId === album.id);
    const tracksToPlay = isShuffled
      ? [...albumTracks].sort(() => Math.random() - 0.5)
      : albumTracks;

    if (tracksToPlay.length > 0) {
      setQueue(tracksToPlay);
      setQueueIndex(startIndex);
      setCurrentTrack(tracksToPlay[startIndex]);
      setDuration(tracksToPlay[startIndex].durationMs);
      loadAndPlayTrack(tracksToPlay[startIndex]);
      setPlayingFrom({
        type: 'album',
        id: album.id,
        name: album.title
      });
    }
  }, [isShuffled, loadAndPlayTrack]);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        if (!currentTrack && queue.length > 0) {
          setCurrentTrack(queue[0]);
          setDuration(queue[0].durationMs);
          if (queue[0].previewUrl) {
            audioRef.current.src = queue[0].previewUrl;
          }
        }
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrack, queue, isPlaying]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, []);

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return;

    let nextIndex = queueIndex + 1;

    if (nextIndex >= queue.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);
        return;
      }
    }

    setQueueIndex(nextIndex);
    setCurrentTrack(queue[nextIndex]);
    setDuration(queue[nextIndex].durationMs);
    loadAndPlayTrack(queue[nextIndex]);
  }, [queue, queueIndex, repeatMode, loadAndPlayTrack]);

  const previousTrack = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      // If more than 3 seconds in, restart track
      audioRef.current.currentTime = 0;
      return;
    }

    if (queue.length === 0) return;

    let prevIndex = queueIndex - 1;

    if (prevIndex < 0) {
      if (repeatMode === 'all') {
        prevIndex = queue.length - 1;
      } else {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }
        return;
      }
    }

    setQueueIndex(prevIndex);
    setCurrentTrack(queue[prevIndex]);
    setDuration(queue[prevIndex].durationMs);
    loadAndPlayTrack(queue[prevIndex]);
  }, [queue, queueIndex, repeatMode, loadAndPlayTrack]);

  const setVolume = useCallback((vol: number) => {
    const newVolume = Math.max(0, Math.min(1, vol));
    setVolumeState(newVolume);
    if (newVolume > 0) setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const seekTo = useCallback((position: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = position / 1000;
      setProgress(position);
    }
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(prev => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  const addToQueue = useCallback((track: Track) => {
    setQueue(prev => [...prev, track]);
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
    setQueueIndex(0);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        isMuted,
        progress,
        duration,
        isShuffled,
        repeatMode,
        isLoading,
        queue,
        queueIndex,
        playingFrom,
        playTrack,
        playPlaylist,
        playAlbum,
        togglePlay,
        pause,
        resume,
        nextTrack,
        previousTrack,
        setVolume,
        toggleMute,
        seekTo,
        toggleShuffle,
        toggleRepeat,
        addToQueue,
        clearQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
