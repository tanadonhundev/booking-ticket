"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type Booking = {
  id: string;
  name: string;
  ticket_name: string;
  email: string;
  capacity: number;
  createdAt: string;
};

export default function AdminBookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>กำลังโหลด...</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">รายการจองทั้งหมด</h1>
      <p className="text-lg mb-2">จำนวนที่ว่าง: 200</p>

      <table className="border-collapse border border-gray-300 w-full text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ชื่อตั๋ว</th>
            <th className="border p-2">ชื่อคนจอง</th>
            <th className="border p-2">อีเมล</th>
            <th className="border p-2">จำนวน</th>
            <th className="border p-2">วันที่จอง</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className={`hover:bg-gray-50`}>
              <td className="border p-2">{booking.ticket_name}</td>
              <td className="border p-2">{booking.name}</td>
              <td className="border p-2">{booking.email}</td>
              <td className="border p-2">{booking.capacity}</td>
              <td className="border p-2">{booking.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
