"use client"

import MuxPlayer from "@mux/mux-player-react"
import { Skeleton } from "@/components/ui/skeleton"

interface VideoPlayerProps {
  playbackId: string | null | undefined
  thumbnailUrl: string | null | undefined
  autoPlay?: boolean
  onPlay?: () => void
}

export const VideoPlayerSkeleton = () => {
  return <div className="aspect-video bg-black rounded-xl" />
}

export const VideoPlayer = ({
  playbackId,
  thumbnailUrl,
  autoPlay,
  onPlay,
}: VideoPlayerProps) => {
  // if (!playbackId) return null

  return (
    <MuxPlayer
      playbackId={playbackId || ""}
      poster={thumbnailUrl || "./placeholder.jpeg"}
      playerInitTime={0}
      autoPlay={autoPlay}
      thumbnailTime={0}
      className="w-full h-full object-contain"
      accentColor="#FE2056"
      onPlay={onPlay}
    />
  )
}