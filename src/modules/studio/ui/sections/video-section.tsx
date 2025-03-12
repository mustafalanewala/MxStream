"use client"

import { InfiniteScroll } from "@/components/infinite-scroll"
import { DEFAULT_LIMIT } from "@/constants"
import { trpc } from "@/trpc/client"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import Link from "next/link"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const VideosSection = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  )
}

export const VideosSectionSuspense = () => {
  const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery({
    limit: DEFAULT_LIMIT,
  }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[510px]">Video</TableHead>
              <TableHead>Visiblity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="text-right pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.pages.flatMap((page) => page.items).map((video) => (
              <Link href={`/studio/videos/${video.id}`} key={video.id} legacyBehavior>
                <TableRow className="cursor-pointer">
                  <TableCell>
                    {video.title}
                  </TableCell>
                  <TableCell>
                    Visiblity
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                  <TableCell>
                    date
                  </TableCell>
                  <TableCell>
                    views
                  </TableCell>
                  <TableCell>
                    comments
                  </TableCell>
                  <TableCell>
                    likes
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </div>
      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFerchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
        isManual
      />
    </div>
  )
}
