"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  name: string;
  email: string;
  ticketNo: string;
  seats: number;
  date: string;
  status: "confirmed" | "cancelled";
};

export default function AdminBookingList() {
  const [data, setData] = useState<Booking[]>([]);
  const [available, setAvailable] = useState(0);

  useEffect(() => {
    // mock data จำลองจากฐานข้อมูล
    const mockData = {
      data: [
        {
          id: "1",
          name: "ธนดล หุ่นสะดี",
          email: "tanadon@example.com",
          ticketNo: "TKT-001",
          seats: 2,
          date: "2025-11-08",
          status: "confirmed",
        },
        {
          id: "2",
          name: "กิตติศักดิ์ ใจดี",
          email: "kittisak@example.com",
          ticketNo: "TKT-002",
          seats: 1,
          date: "2025-11-08",
          status: "cancelled",
        },
        {
          id: "3",
          name: "ศิรินันท์ สุขใจ",
          email: "sirinan@example.com",
          ticketNo: "TKT-003",
          seats: 3,
          date: "2025-11-09",
          status: "confirmed",
        },
      ],
      available: 44,
    };

    setTimeout(() => {
      setData(mockData.data);
      setAvailable(mockData.available);
    }, 400);
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">รายการจองทั้งหมด</h1>
      <p className="text-lg mb-2">จำนวนที่ว่าง: {available}</p>

      <table className="border-collapse border border-gray-300 w-full text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">หมายเลขตั๋ว</th>
            <th className="border p-2">ชื่อ</th>
            <th className="border p-2">อีเมล</th>
            <th className="border p-2">จำนวนที่นั่ง</th>
            <th className="border p-2">วันที่จอง</th>
            <th className="border p-2">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((b) => (
            <tr
              key={b.id}
              className={`hover:bg-gray-50 ${
                b.status === "cancelled" ? "text-gray-400" : ""
              }`}
            >
              <td className="border p-2 font-mono">{b.ticketNo}</td>
              <td className="border p-2">{b.name}</td>
              <td className="border p-2">{b.email}</td>
              <td className="border p-2">{b.seats}</td>
              <td className="border p-2">{b.date}</td>
              <td
                className={`border p-2 font-semibold ${
                  b.status === "confirmed" ? "text-green-600" : "text-red-500"
                }`}
              >
                {b.status === "confirmed" ? "จองแล้ว" : "ยกเลิก"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
