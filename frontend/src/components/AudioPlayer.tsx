import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSrcRef = useRef<string | null>(null);

  const {
    currentSong,
    isPlaying,
    shouldAutoplay,
    setShouldAutoplay,
    playNext,
  } = usePlayerStore();

  // Update audio src when song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (prevSrcRef.current !== currentSong.audioUrl) {
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;
      prevSrcRef.current = currentSong.audioUrl;

      if (shouldAutoplay) {
        audio
          .play()
          .catch(() => {})
          .finally(() => setShouldAutoplay(false));
      }
    }
  }, [currentSong, shouldAutoplay, setShouldAutoplay]);

  // Play/pause effect reacts to isPlaying
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  // Handle song ended -> play next automatically
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      playNext(); // store updates currentSong + sets shouldAutoplay = true
    };

    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [playNext]);

  return <audio ref={audioRef} preload="none" />;
};

export default AudioPlayer;
