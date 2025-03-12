import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useEffect } from "react"
import { Button } from "./ui/button"

interface InfiniteScrollProps {
  isManual?: boolean
  hasNextPage: boolean
  isFerchingNextPage?: boolean
  fetchNextPage: () => void
}

export const InfiniteScroll = ({
  isManual = false,
  hasNextPage,
  isFerchingNextPage,
  fetchNextPage,
}: InfiniteScrollProps) => {

  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "100px",
  })

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFerchingNextPage && !isManual) {
      fetchNextPage()
    }
  }, [isIntersecting, hasNextPage, isFerchingNextPage, isManual, fetchNextPage])

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div ref={targetRef} className="h-1" />
      {hasNextPage ? (
        <Button
          variant="secondary"
          disabled={!hasNextPage || isFerchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFerchingNextPage ? "Loading..." : "Load More"}
        </Button>
      ) : (
        <p className="text-xs text-muted-foreground">
          You Have reached the end of the list
        </p>
      )}
    </div>
  )
} 
