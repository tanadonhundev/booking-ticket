"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

type Ticket = {
  id: number;
  name: string;
  price: number;
  capacity: number;
  remaining: number;
  status: "available" | "sold_out";
};

export default function Page() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/ticket");
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) return <p>กำลังโหลด...</p>;
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">รายการตั๋วทั้งหมด</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">ชื่อ</th>
              <th className="py-2 px-4 border-b text-left">ราคา (บาท)</th>
              <th className="py-2 px-4 border-b text-left">จำนวนทั้งหมด</th>
              <th className="py-2 px-4 border-b text-left">คงเหลือ</th>
              <th className="py-2 px-4 border-b text-left">สถานะ</th>
              <th className="py-2 px-4 border-b text-left">จอง</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{ticket.name}</td>
                <td className="py-2 px-4 border-b">{ticket.price}</td>
                <td className="py-2 px-4 border-b">{ticket.capacity}</td>
                <td className="py-2 px-4 border-b">{ticket.remaining}</td>
                <td
                  className={`py-2 px-4 border-b font-semibold ${
                    ticket.status === "available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {ticket.status === "available" ? "ว่าง" : "เต็ม"}
                </td>
                <td className="py-2 px-4 border-b">
                  <Button>ลบ</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
