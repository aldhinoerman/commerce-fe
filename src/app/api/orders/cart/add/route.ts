/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { request } from "@/utils";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const response = await request.post("orders/cart", data);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error add cart:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Failed add cart" },
      { status: error.response?.status || 500 }
    );
  }
}
