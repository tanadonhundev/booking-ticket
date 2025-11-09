import { NextRequest, NextResponse } from "next/server";
import { eq, and, sql } from "drizzle-orm";
import conn from "@/db";
import { ticket, booking } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { ticket_id, capacity, name, email } = await req.json();
    const db = await conn;

    // ✅ ตรวจสอบว่ามี booking ซ้ำหรือไม่ (ชื่อ + อีเมล + ticket_id)
    const existing = await db
      .select()
      .from(booking)
      .where(
        and(
          eq(booking.name, name),
          eq(booking.email, email),
          eq(booking.ticketId, ticket_id)
        )
      );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "You have already booked this ticket" },
        { status: 400 }
      );
    }

    //  ดึงข้อมูล ticket เพื่อเช็ค remaining ก่อน
    const ticketData = await db
      .select()
      .from(ticket)
      .where(eq(ticket.id, ticket_id));

    if (ticketData.length === 0) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }

    const remaining = ticketData[0].remaining;

    //  เช็ค capacity > remaining → บอกว่าเต็ม / ไม่พอ
    if (capacity > remaining) {
      return NextResponse.json(
        { message: "Not enough tickets available" },
        { status: 400 }
      );
    }

    //  อัปเดตจำนวนตั๋ว
    await db
      .update(ticket)
      .set({
        remaining: sql`${ticket.remaining} - ${capacity}`,
        status: sql`IF(${ticket.remaining} - ${capacity} <= 0, 'sold_out', 'available')`,
      })
      .where(eq(ticket.id, ticket_id));

    // เพิ่มข้อมูลการจอง
    await db.insert(booking).values({
      ticketId: ticket_id,
      capacity: capacity,
      name: name,
      email: email,
    });

    return NextResponse.json(
      { message: `${name} booked successfully` },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "failed to book a ticket", error: err },
      { status: 500 }
    );
  }
}
