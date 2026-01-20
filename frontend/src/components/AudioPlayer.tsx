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

  // Play/Pause effect – reacts to isPlaying immediately
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  // Autoplay effect – runs on song change
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

  // Handle song ended -> play next
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => playNext();

    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [playNext]);

  return <audio ref={audioRef} preload="none" />;
};

export default AudioPlayer;
