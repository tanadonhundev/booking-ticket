import db from "@/db";
import { ticket } from "@/db/schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, capacity, price } = body;

    const newTicket = await (
      await db
    )
      .insert(ticket)
      .values({
        name,
        capacity,
        price,
        remaining: capacity,
        status: "available",
      })
      .$returningId();

    return Response.json(
      { message: "เพิ่มตั๋วสำเร็จ", ticket: newTicket[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error("Add ticket error:", err);
    return Response.json({ message: "เพิ่มตั๋วไม่สำเร็จ" }, { status: 500 });
  }
}
