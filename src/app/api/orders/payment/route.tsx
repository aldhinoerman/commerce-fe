/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { request } from "@/utils";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const response = await request.post("orders/payment", data);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error checkout:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Failed create checkout" },
      { status: error.response?.status || 500 }
    );
  }
}
