/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { request } from "@/utils";

export async function DELETE(req: Request) {
  const data = await req.json();

  try {
    const response = await request.delete("orders/cart", { data });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error delete cart:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Failed delete cart" },
      { status: error.response?.status || 500 }
    );
  }
}
