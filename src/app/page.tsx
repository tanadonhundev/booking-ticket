"use client";

import { useState } from "react";

type Ticket = {
  id: number;
  name: string;
  date: string;
  time: string;
  price: number;
  available: boolean;
};

export default function BookingPage() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      name: "กรุงเทพ → เชียงใหม่",
      date: "2025-11-10",
      time: "08:30",
      price: 1200,
      available: true,
    },
    {
      id: 2,
      name: "กรุงเทพ → ภูเก็ต",
      date: "2025-11-10",
      time: "14:00",
      price: 1500,
      available: false,
    },
    {
      id: 3,
      name: "กรุงเทพ → ขอนแก่น",
      date: "2025-11-11",
      time: "09:45",
      price: 1000,
      available: true,
    },
  ]);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) {
      alert("กรุณาเลือกตั๋วก่อนจอง");
      return;
    }

    // จำลองการจอง
    const booking = {
      name,
      email,
      ticket: selectedTicket.name,
      date: selectedTicket.date,
      time: selectedTicket.time,
      price: selectedTicket.price,
      ticketNo: `TKT-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
    };

    setMessage(
      `✅ จองสำเร็จ! หมายเลขตั๋วของคุณคือ ${booking.ticketNo} (${booking.ticket})`
    );

    // reset form
    setName("");
    setEmail("");
    setSelectedTicket(null);
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🚌 ระบบขายตั๋วออนไลน์
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">รายการตั๋วที่มี</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">เส้นทาง</th>
              <th className="border p-2">วันที่</th>
              <th className="border p-2">เวลา</th>
              <th className="border p-2">ราคา</th>
              <th className="border p-2">สถานะ</th>
              <th className="border p-2">เลือก</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr
                key={t.id}
                className={`${
                  !t.available ? "text-gray-400 bg-gray-50" : "hover:bg-gray-50"
                }`}
              >
                <td className="border p-2">{t.name}</td>
                <td className="border p-2">{t.date}</td>
                <td className="border p-2">{t.time}</td>
                <td className="border p-2">{t.price.toLocaleString()} บาท</td>
                <td className="border p-2">
                  {t.available ? (
                    <span className="text-green-600 font-medium">ว่าง</span>
                  ) : (
                    <span className="text-red-500 font-medium">เต็มแล้ว</span>
                  )}
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => t.available && setSelectedTicket(t)}
                    disabled={!t.available}
                    className={`px-3 py-1 rounded-md ${
                      t.available
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    เลือก
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selectedTicket && (
        <section>
          <h2 className="text-xl font-semibold mb-3 text-green-600">
            🧾 ตั๋วที่เลือก: {selectedTicket.name} ({selectedTicket.date} เวลา{" "}
            {selectedTicket.time})
          </h2>

          <form
            onSubmit={handleBooking}
            className="bg-white shadow-md rounded-xl p-6 space-y-4"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                ชื่อ
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                อีเมล
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              ยืนยันการจอง
            </button>
          </form>
        </section>
      )}

      {message && (
        <p className="mt-6 text-center text-green-600 font-medium">{message}</p>
      )}
    </main>
  );
}
