import { NextRequest } from "next/server";
import db from "@/db";
import { booking, ticket } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/bookings/cancel/[id]">
) {
  try {
    const { id } = await ctx.params;
    const bookingId = Number(id);

    if (isNaN(bookingId)) {
      return Response.json({ message: "Invalid booking ID" }, { status: 400 });
    }

    // หาข้อมูล booking
    const [existingBooking] = await (await db)
      .select()
      .from(booking)
      .where(eq(booking.id, bookingId));

    if (!existingBooking) {
      return Response.json({ message: "Booking not found" }, { status: 404 });
    }

    const { ticketId, capacity } = existingBooking;

    // ลบ booking
    await (await db).delete(booking).where(eq(booking.id, bookingId));

    // อัปเดตจำนวนตั๋ว
    await (
      await db
    )
      .update(ticket)
      .set({
        remaining: sql`${ticket.remaining} + ${capacity}`, // เพิ่มกลับ
        status: sql`IF(${ticket.remaining} + ${capacity} <= 0, 'sold_out', 'available')`,
      })
      .where(eq(ticket.id, ticketId));

    return Response.json(
      { message: "Booking canceled and ticket updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Failed to cancel booking" },
      { status: 500 }
    );
  }
}
