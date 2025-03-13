import { Button } from "@/components/ui/button";
import MuxUploader, {
  MuxUploaderDrop,
  MuxUploaderFileSelect,
  MuxUploaderProgress,
  MuxUploaderStatus,
} from "@mux/mux-uploader-react";
import { UploadIcon } from "lucide-react";


interface StudioUploaderProps {
  endpoint?: string | null
  onSuccess: () => void
}

const UPLOADER_ID = "video-uploader"

export const StudioUploader = ({ endpoint, onSuccess }: StudioUploaderProps) => {
  return (
    <div>
      <MuxUploader
        onSuccess={onSuccess}
        endpoint={endpoint}
        id="video-uploader"
        className="hidden group/uploader"
      />
      <MuxUploaderDrop muxUploader={UPLOADER_ID} className="group/drop">
        <div slot="heading" className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 justify-center rounded-full bg-muted h-32 w-32">
            <UploadIcon className="size-10 text-muted-foreground group/drop-[&[active]]:animate-bounce transition-all duration-300" />

          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm">Drag and drop your video here</p>
            <p className="text-xs text-muted-foreground">Your video will be private until you publish it</p>
          </div>
          <MuxUploaderFileSelect muxUploader={UPLOADER_ID}>
            <Button type="button" className="rounded-full">
              Select file
            </Button>
          </MuxUploaderFileSelect>
        </div>
        <span slot="separator" className="hidden" />
        <MuxUploaderStatus muxUploader={UPLOADER_ID} className="text-sm" />
        <MuxUploaderProgress muxUploader={UPLOADER_ID} className="text-sm" type="percentage" />
        <MuxUploaderProgress muxUploader={UPLOADER_ID} type="bar" />
      </MuxUploaderDrop>
    </div>
  )
}