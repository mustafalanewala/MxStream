import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

interface ResponsiveModalProps {
  children: React.ReactNode
  Open: boolean
  title: string
  onOpenChange: (open: boolean) => void
}

export const ResponsiveModal = ({ children, Open, title, onOpenChange }: ResponsiveModalProps) => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={Open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={Open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
} 