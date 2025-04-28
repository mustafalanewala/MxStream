import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { UserAvatar } from "@/components/user-avatar"
import { commentInsertSchema } from "@/db/schema"
import { trpc } from "@/trpc/client"
import { useClerk, useUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { on } from "events"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface CommentFormProps {
  videoId: string
  parentId?: string
  onSuccess?: () => void
  onCancel?: () => void
  variant?: "reply" | "comment"
}

export const CommentForm = ({
  videoId,
  onSuccess,
  parentId,
  variant = "comment",
  onCancel
}: CommentFormProps) => {
  const clerk = useClerk()
  const { user } = useUser()
  const utils = trpc.useUtils()
  const create = trpc.comments.create.useMutation({
    onSuccess: () => {
      utils.comments.getMany.invalidate({ videoId })
      utils.comments.getMany.invalidate({ videoId, parentId })
      form.reset()
      toast.success("Comment added successfully")
      onSuccess?.()
    },

    onError: (error) => {
      toast.error("Something went wrong")
      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn()
      }
    }
  })

  const commentFormSchema = commentInsertSchema.omit({ userId: true })

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      videoId,
      parentId: parentId,
      value: "",
    },
  })

  const handleSubmit = (values: z.infer<typeof commentFormSchema>) => {
    if (!user?.id) {
      return clerk.openSignIn()
    }

    const payload: z.infer<typeof commentInsertSchema> = {
      ...values,
      userId: user.id,
    }

    create.mutate(payload)
  }


  const handleCancel = () => {
    form.reset()
    onCancel?.()
  }

  return (
    <Form {...form}>
      <form
        className="flex gap-4 group"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <UserAvatar
          size="lg"
          imageUrl={user?.imageUrl || "/user-avatar.png"}
          name={user?.username || "User"}
        />
        <div className="flex-1">
          <FormField
            name="value"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={
                      variant === "reply"
                        ? "Reply to this comment..."
                        : "Add a comment..."
                    }
                    className="resize-none bg-transparent overflow-hidden min-h-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="justify-end gap-2 mt-2 flex">
            {onCancel && (
              <Button variant="ghost" type="button" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            <Button
              disabled={create.isPending}
              type="submit"
              size="sm"
            >
              {variant === "reply" ? "Reply" : "Comment"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
