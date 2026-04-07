"use client"

import * as React from "react"
import {
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/registry/new-york-v4/ui/card"
import { Slider } from "@/registry/new-york-v4/ui/slider"

interface Track {
  title: string
  artist: string
  album: string
  duration: number // seconds
  cover?: string
}

const DEFAULT_TRACKS: Track[] = [
  {
    title: "Golden Hour",
    artist: "JVKE",
    album: "this is what ____ feels like",
    duration: 211,
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 204,
  },
]

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

interface MusicPlayerProps {
  tracks?: Track[]
  className?: string
}

export function MusicPlayer({
  tracks = DEFAULT_TRACKS,
  className,
}: MusicPlayerProps) {
  const [trackIndex, setTrackIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [volume, setVolume] = React.useState(70)
  const [liked, setLiked] = React.useState(false)
  const [shuffle, setShuffle] = React.useState(false)
  const [repeat, setRepeat] = React.useState(false)

  const track = tracks[trackIndex]

  // Simulate playback progress
  React.useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= track.duration) {
          handleNext()
          return 0
        }
        return prev + 1
      })
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, track.duration])

  function handleNext() {
    setProgress(0)
    if (shuffle) {
      setTrackIndex(Math.floor(Math.random() * tracks.length))
    } else {
      setTrackIndex((prev) => (prev + 1) % tracks.length)
    }
  }

  function handlePrev() {
    setProgress(0)
    setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
  }

  const coverColors = [
    "from-violet-500 to-indigo-600",
    "from-rose-500 to-pink-600",
    "from-amber-400 to-orange-500",
  ]
  const coverColor = coverColors[trackIndex % coverColors.length]

  return (
    <Card className={cn("w-[340px] overflow-hidden", className)}>
      {/* Album art */}
      <div
        className={cn(
          "flex h-52 items-center justify-center bg-gradient-to-br",
          coverColor
        )}
      >
        <div className="flex size-20 items-center justify-center rounded-full bg-white/20 shadow-lg backdrop-blur-sm">
          <div className="size-8 rounded-full bg-white/60" />
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="text-base leading-none font-semibold">{track.title}</p>
            <p className="text-muted-foreground text-sm">{track.artist}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            onClick={() => setLiked((v) => !v)}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                liked ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
              )}
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 pb-3">
        {/* Progress slider */}
        <div className="flex flex-col gap-1.5">
          <Slider
            value={[progress]}
            max={track.duration}
            step={1}
            onValueChange={([val]) => setProgress(val)}
            className="w-full"
            aria-label="Track progress"
          />
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-8",
              shuffle ? "text-primary" : "text-muted-foreground"
            )}
            onClick={() => setShuffle((v) => !v)}
            aria-label="Shuffle"
          >
            <Shuffle className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={handlePrev}
            aria-label="Previous track"
          >
            <SkipBack className="size-5 fill-current" />
          </Button>

          <Button
            size="icon"
            className="size-11 rounded-full"
            onClick={() => setIsPlaying((v) => !v)}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="size-5 fill-current" />
            ) : (
              <Play className="size-5 fill-current" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={handleNext}
            aria-label="Next track"
          >
            <SkipForward className="size-5 fill-current" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-8",
              repeat ? "text-primary" : "text-muted-foreground"
            )}
            onClick={() => setRepeat((v) => !v)}
            aria-label="Repeat"
          >
            <Repeat className="size-4" />
          </Button>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-3 pb-3">
        {/* Volume */}
        <div className="flex w-full items-center gap-2">
          <Volume2 className="text-muted-foreground size-4 shrink-0" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={([val]) => setVolume(val)}
            className="flex-1"
            aria-label="Volume"
          />
          <span className="text-muted-foreground w-6 text-right text-xs">
            {volume}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

