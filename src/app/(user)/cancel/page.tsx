/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CancelBooking } from "@/components/app/CancelBooking";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function CancelPage() {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });

  const handleSearch = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`/api/bookings/${data.email}`);
      console.log(res.data);
      setBookings(res.data.bookings || []);
    } catch (error: any) {
      console.error(error.response?.data.message);
      toast.error(error.response?.data.message);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBoook = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setOpen(true);
  };

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <h2>ค้นหาการจองเพื่อตรวจสอบ / ยกเลิก</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSearch)}>
            <div className="flex space-x-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="กรอกอีเมลที่ใช้จอง"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "กำลังค้นหา..." : "ค้นหา"}
              </Button>
            </div>
          </form>
        </Form>

        {error && (
          <p style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
            {error}
          </p>
        )}

        {/* ✅ ตารางแสดงรายการ */}
        {bookings.length > 0 && (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr style={{ background: "#f3f3f3" }}>
                <th className="py-2 px-4 border-b text-left">ชื่อตั๋ว</th>
                <th className="py-2 px-4 border-b text-left">ชื่อคนจอง</th>
                <th className="py-2 px-4 border-b text-left">อีเมล</th>
                <th className="py-2 px-4 border-b text-left">จำนวน</th>
                <th className="py-2 px-4 border-b text-left">วันที่จอง</th>
                <th className="py-2 px-4 border-b text-left">ยกเลิก</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.ticket_name}</td>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                  <td className="py-2 px-4 border-b">{item.capacity}</td>
                  <td className="py-2 px-4 border-b">{item.createdAt}</td>
                  <td className="py-2 px-4 border-b">
                    <Button onClick={() => handleCancelBoook(item.id)}>
                      ยกเลิก
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <CancelBooking
        open={open}
        onOpenChange={setOpen}
        ticketId={selectedTicketId}
      />
    </div>
  );
}
