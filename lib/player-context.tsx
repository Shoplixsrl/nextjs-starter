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
  const [playingFrom, setPlayingFrom] = useState<{
    type: 'playlist' | 'album' | 'artist' | 'liked' | 'search' | null;
    id: string | null;
    name: string | null;
  }>({ type: null, id: null, name: null });

  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Simulate progress
  useEffect(() => {
    if (isPlaying && currentTrack) {
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1000;
          if (newProgress >= currentTrack.durationMs) {
            // Track ended
            if (repeatMode === 'one') {
              return 0;
            }
            nextTrack();
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentTrack, repeatMode]);

  const playTrack = useCallback((track: Track, context?: { type: 'playlist' | 'album' | 'artist' | 'liked' | 'search'; id: string; name: string; tracks?: Track[] }) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
    setDuration(track.durationMs);

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
  }, []);

  const playPlaylist = useCallback((playlist: Playlist, startIndex = 0) => {
    const tracksToPlay = isShuffled
      ? [...playlist.tracks].sort(() => Math.random() - 0.5)
      : playlist.tracks;

    setQueue(tracksToPlay);
    setQueueIndex(startIndex);
    setCurrentTrack(tracksToPlay[startIndex]);
    setIsPlaying(true);
    setProgress(0);
    setDuration(tracksToPlay[startIndex].durationMs);
    setPlayingFrom({
      type: 'playlist',
      id: playlist.id,
      name: playlist.title
    });
  }, [isShuffled]);

  const playAlbum = useCallback((album: Album, startIndex = 0) => {
    const albumTracks = allTracks.filter(t => t.albumId === album.id);
    const tracksToPlay = isShuffled
      ? [...albumTracks].sort(() => Math.random() - 0.5)
      : albumTracks;

    if (tracksToPlay.length > 0) {
      setQueue(tracksToPlay);
      setQueueIndex(startIndex);
      setCurrentTrack(tracksToPlay[startIndex]);
      setIsPlaying(true);
      setProgress(0);
      setDuration(tracksToPlay[startIndex].durationMs);
      setPlayingFrom({
        type: 'album',
        id: album.id,
        name: album.title
      });
    }
  }, [isShuffled]);

  const togglePlay = useCallback(() => {
    if (!currentTrack && queue.length > 0) {
      setCurrentTrack(queue[0]);
      setIsPlaying(true);
      setDuration(queue[0].durationMs);
    } else {
      setIsPlaying(prev => !prev);
    }
  }, [currentTrack, queue]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return;

    let nextIndex = queueIndex + 1;

    if (nextIndex >= queue.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        setIsPlaying(false);
        return;
      }
    }

    setQueueIndex(nextIndex);
    setCurrentTrack(queue[nextIndex]);
    setProgress(0);
    setDuration(queue[nextIndex].durationMs);
    setIsPlaying(true);
  }, [queue, queueIndex, repeatMode]);

  const previousTrack = useCallback(() => {
    if (progress > 3000) {
      // If more than 3 seconds in, restart track
      setProgress(0);
      return;
    }

    if (queue.length === 0) return;

    let prevIndex = queueIndex - 1;

    if (prevIndex < 0) {
      if (repeatMode === 'all') {
        prevIndex = queue.length - 1;
      } else {
        setProgress(0);
        return;
      }
    }

    setQueueIndex(prevIndex);
    setCurrentTrack(queue[prevIndex]);
    setProgress(0);
    setDuration(queue[prevIndex].durationMs);
    setIsPlaying(true);
  }, [queue, queueIndex, progress, repeatMode]);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(Math.max(0, Math.min(1, vol)));
    if (vol > 0) setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const seekTo = useCallback((position: number) => {
    setProgress(position);
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
