/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { request } from "@/utils";

export async function PATCH(req: Request) {
  const data = await req.json();
console.log('data', data);

  try {
    const response = await request.patch("orders/cart", data);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error update cart:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Failed update cart" },
      { status: error.response?.status || 500 }
    );
  }
}
