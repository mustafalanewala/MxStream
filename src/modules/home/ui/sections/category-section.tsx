"use client"

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { FilterCarousel } from "@/components/filter-carousel";
import { useRouter } from "next/navigation";

interface CategoriesSectionProps {
  categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <Suspense fallback={<CategoriesSkeleton />}>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  )
}

const CategoriesSkeleton = () => {
  return <FilterCarousel onSelect={() => { }} isLoading data={[]} />
}

const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const router = useRouter();
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const data = categories.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("categoryId", value);
    }
    else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  }

  return <FilterCarousel onSelect={onSelect} value={categoryId} data={data} />
} 