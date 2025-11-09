/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import db from "@/db";
import { booking, ticket } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/ticket/[id]">
) {
  try {
    const { id } = await ctx.params;

    const ticketId = Number(id);

    if (isNaN(ticketId)) {
      return Response.json({ message: "Invalid ticket ID" }, { status: 400 });
    }

    // หาข้อมูล ticket
    const [existingTicket] = await (await db)
      .select()
      .from(ticket)
      .where(eq(ticket.id, ticketId));

    console.log(existingTicket);

    if (!existingTicket) {
      return Response.json({ message: "Ticket not found" }, { status: 404 });
    }

    // เช็คว่ามี booking ของ ticket นี้หรือยัง
    const bookingsCount = await (await db)
      .select()
      .from(booking)
      .where(eq(booking.ticketId, ticketId));

    if (bookingsCount.length > 0) {
      return Response.json(
        { message: "ไม่สามารถลบตั๋วนี้ได้ มีคนจองแล้ว" },
        { status: 400 }
      );
    }

    // ลบ ticket
    await (await db).delete(ticket).where(eq(ticket.id, ticketId));

    return Response.json(
      { message: "Ticket deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return Response.json(
      {
        message: "Failed to fetch Ticket",
      },
      { status: 500 }
    );
  }
}
