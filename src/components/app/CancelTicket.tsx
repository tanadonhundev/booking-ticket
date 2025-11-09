/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";

type CancelTicketFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId: number | null;
  onSuccess?: () => void;
};

export function CancelTicket({
  open,
  onOpenChange,
  ticketId,
  onSuccess,
}: CancelTicketFormProps) {
  const handleCancleBoook = async () => {
    try {
      const res = await axios.get(`/api/ticket/${ticketId}`);
      onOpenChange(false);
      toast.success(res.data.message);
      onSuccess?.();
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
          <AlertDialogTitle>คุณต้องการที่จะลบตั๋ว?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancleBoook}>
            ยืนยัน
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
