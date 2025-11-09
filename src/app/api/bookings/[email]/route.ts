/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import db from "@/db";
import { booking } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/bookings/[email]">
) {
  try {
    const { email } = await ctx.params;

    // Query หา bookings ตาม email
    const result = await (await db)
      .select()
      .from(booking)
      .where(eq(booking.email, email));

    if (!result || result.length === 0) {
      return Response.json(
        { message: "ไม่พบข้อมูลการจองในระบบ" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        email,
        bookings: result,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return Response.json(
      {
        message: "Failed to fetch bookings",
      },
      { status: 500 }
    );
  }
}
