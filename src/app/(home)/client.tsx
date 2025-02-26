"use client"

import { trpc } from "@/trpc/client"

export const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "Mustafa" })

  return (
    <div>
      <h1>Client Says {data.greeting}</h1>
    </div>
  )
}