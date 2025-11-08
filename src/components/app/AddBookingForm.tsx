/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  capacity: z
    .string()
    .transform((val) => parseFloat(val.replace(/[^0-9.]/g, ""))) // e.g., "$1,000" → 1000
    .refine((val) => !isNaN(val), "ราคาต้องเป็นตัวเลขที่ถูกต้อง"),
});

type AddBookingFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId: number | null;
};

export function AddBookingForm({
  open,
  onOpenChange,
  ticketId,
}: AddBookingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleOnSubmit = async (data: any) => {
    const formData = {
      ticket_id: ticketId,
      email: data.email,
      name: data.name,
      capacity: data.capacity,
    };

    try {
      const res = await axios.post("/api/book", formData); // เปลี่ยนเป็น POST
      reset();
      onOpenChange(false);
      toast.success(res.data.message);
    } catch (error: any) {
      console.error(error.response?.data.message);
      toast.error(error.response?.data.message);
      reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>จองตั๋ว</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 col-span-4 ml-28">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Email
              </Label>
              <Input id="email" className="col-span-3" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 col-span-4 ml-28">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="price"
                className="col-span-3"
                {...register("capacity")}
              />
              {errors.capacity && (
                <p className="text-red-500 col-span-4 ml-28">
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "กำลังบันทึก" : "บันทึก"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
