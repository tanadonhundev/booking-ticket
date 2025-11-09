/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";

type CancelBookFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId: number | null;
};

export function CancelBooking({
  open,
  onOpenChange,
  ticketId,
}: CancelBookFormProps) {
  const handleCancleBoook = async () => {
    try {
      const res = await axios.get(`/api/bookings/cancel/${ticketId}`);

      onOpenChange(false);
      toast.success(res.data.message);
    } catch (error: any) {
      console.error(error.response?.data.message);
      toast.error(error.response?.data.message);

      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancleBoook}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
