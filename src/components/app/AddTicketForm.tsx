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
  nameTicket: z.string().min(1, "Name is required"),
  price: z
    .string()
    .transform((val) => parseFloat(val.replace(/[^0-9.]/g, "")))
    .refine((val) => !isNaN(val), "ราคาต้องเป็นตัวเลขที่ถูกต้อง"),
  capacity: z
    .string()
    .transform((val) => parseFloat(val.replace(/[^0-9.]/g, "")))
    .refine((val) => !isNaN(val), "ราคาต้องเป็นตัวเลขที่ถูกต้อง"),
});

type AddTicketFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function AddTicketForm({
  open,
  onOpenChange,
  onSuccess,
}: AddTicketFormProps) {
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
      name: data.nameTicket,
      price: data.price,
      capacity: data.capacity,
    };
    try {
      const res = await axios.post("/api/ticket/admin", formData);
      reset();
      onOpenChange(false);
      toast.success(res.data.message);
      onSuccess?.();
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
          <DialogTitle>เพิ่มตั๋ว</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Name Ticket
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...register("nameTicket")}
              />
              {errors.nameTicket && (
                <p className="text-red-500 col-span-4 ml-28">
                  {errors.nameTicket.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input id="price" className="col-span-3" {...register("price")} />
              {errors.price && (
                <p className="text-red-500 col-span-4 ml-28">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
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
