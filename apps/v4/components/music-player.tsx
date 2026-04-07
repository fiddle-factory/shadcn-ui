"use client"

import { useEffect, useRef, useState } from "react"
import {
  Heart,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react"

import { Slider } from "@/registry/new-york-v4/ui/slider"
import { Button } from "@/registry/new-york-v4/ui/button"
import { cn } from "@/lib/utils"

const TRACKS = [
  {
    id: 1,
    title: "Midnight Bloom",
    artist: "Luna Waves",
    album: "Dreamscapes",
    duration: 214,
    color: "from-violet-500 to-indigo-700",
    emoji: "🌙",
  },
  {
    id: 2,
    title: "Golden Hour",
    artist: "The Sunsets",
    album: "Horizon",
    duration: 187,
    color: "from-amber-400 to-orange-600",
    emoji: "🌅",
  },
  {
    id: 3,
    title: "Neon Rain",
    artist: "Cyber Static",
    album: "Digital Pulse",
    duration: 243,
    color: "from-cyan-400 to-blue-600",
    emoji: "⚡",
  },
  {
    id: 4,
    title: "Forest Walk",
    artist: "Acoustic Dreams",
    album: "Nature Sessions",
    duration: 198,
    color: "from-emerald-400 to-teal-600",
    emoji: "🌿",
  },
]

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function MusicPlayer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState<"off" | "all" | "one">("off")

  const track = TRACKS[trackIndex]

  // Live tweakpane controls
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail?.volume !== undefined) setVolume(detail.volume)
    }
    el.addEventListener("animation:update", handler)
    return () => el.removeEventListener("animation:update", handler)
  }, [])

  // Playback ticker
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= track.duration) {
            handleNext()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, trackIndex])

  function handleNext() {
    setProgress(0)
    if (shuffle) {
      setTrackIndex(Math.floor(Math.random() * TRACKS.length))
    } else {
      setTrackIndex((i) => (i + 1) % TRACKS.length)
    }
  }

  function handlePrev() {
    setProgress(0)
    if (progress > 5) {
      setProgress(0)
      return
    }
    setTrackIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length)
  }

  function handlePlayPause() {
    setIsPlaying((v) => !v)
  }

  function handleProgressChange(val: number[]) {
    setProgress(val[0])
  }

  function handleVolumeChange(val: number[]) {
    setVolume(val[0])
    setIsMuted(val[0] === 0)
  }

  function toggleMute() {
    setIsMuted((v) => !v)
  }

  function cycleRepeat() {
    setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"))
  }

  const effectiveVolume = isMuted ? 0 : volume

  return (
    <div
      ref={containerRef}
      data-config-id="music-player"
      className="w-80 rounded-2xl bg-card text-card-foreground shadow-2xl overflow-hidden border border-border"
    >
      {/* Album Art */}
      <div
        className={cn(
          "relative h-64 flex items-center justify-center bg-gradient-to-br",
          track.color
        )}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />
        <div
          className={cn(
            "w-28 h-28 rounded-full flex items-center justify-center text-6xl shadow-2xl bg-black/20 backdrop-blur-sm transition-transform duration-300",
            isPlaying && "animate-spin-slow"
          )}
          style={{
            animation: isPlaying ? "spin 8s linear infinite" : "none",
          }}
        >
          {track.emoji}
        </div>
        {/* Like button */}
        <button
          onClick={() => setIsLiked((v) => !v)}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isLiked ? "fill-red-400 text-red-400" : "text-white/80"
            )}
          />
        </button>
        {/* Track indicator dots */}
        <div className="absolute bottom-3 flex gap-1.5">
          {TRACKS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setTrackIndex(i); setProgress(0) }}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-200",
                i === trackIndex ? "bg-white w-4" : "bg-white/40"
              )}
            />
          ))}
        </div>
      </div>

      {/* Info & Controls */}
      <div className="p-5 space-y-4">
        {/* Track Info */}
        <div className="text-center">
          <h3 className="font-bold text-base leading-tight truncate">{track.title}</h3>
          <p className="text-sm text-muted-foreground truncate mt-0.5">
            {track.artist} · {track.album}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <Slider
            value={[progress]}
            max={track.duration}
            step={1}
            onValueChange={handleProgressChange}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShuffle((v) => !v)}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              shuffle
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full text-foreground hover:bg-accent transition-colors"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={handlePlayPause}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95",
                "bg-foreground text-background hover:opacity-90"
              )}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-full text-foreground hover:bg-accent transition-colors"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>

          <button
            onClick={cycleRepeat}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              repeat !== "off"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {repeat === "one" ? (
              <Repeat1 className="w-4 h-4" />
            ) : (
              <Repeat className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            {effectiveVolume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <Slider
            value={[effectiveVolume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="flex-1 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

