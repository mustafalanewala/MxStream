"use client"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { useAuth, useClerk } from "@clerk/nextjs"
import { HistoryIcon, ListVideo, ThumbsUpIcon } from "lucide-react"
import Link from "next/link"

const items = [
  {
    title: "History",
    url: "/playlists/history",
    icon: HistoryIcon,
    auth: true,

  },
  {
    title: "Liked Videos",
    url: "/playlists/liked",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "All Playlists",
    url: "/playlists",
    icon: ListVideo,
  }
]

export const PersonalSection = () => {
  const clerk = useClerk()
  const { isSignedIn } = useAuth()

  return (

    <SidebarGroup>
      <SidebarGroupLabel>
        YOU
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={false}
                onClick={(e) => {
                  if (!isSignedIn && item.auth) {
                    e.preventDefault()
                    return clerk.openSignIn()
                  }
                }}
              >
                <Link href={item.url} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup >
  )
} 
