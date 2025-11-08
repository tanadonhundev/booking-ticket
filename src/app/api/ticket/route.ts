import { NextRequest, NextResponse } from "next/server";
import conn from "@/db";
import { ticket } from "@/db/schema";

type NewTicket = typeof ticket.$inferInsert;

export async function POST(req: NextRequest) {
  const body = (await req.json()) as NewTicket[];
  const db = await conn;

  await db.insert(ticket).values(body);

  return NextResponse.json(
    { message: "บันทึกคำสั่งซื้อสำเร็จ" },
    { status: 201 }
  );
}

export async function GET() {
  const db = await conn;

  const tickets = await db.select().from(ticket);

  return NextResponse.json(tickets, { status: 200 });
}
