/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { request } from "@/utils";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");

  try {
    const response = await request.get("orders/cart", {
      params: { username },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error fetching cart:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { message: "Failed to fetch cart" },
      { status: error.response?.status || 500 }
    );
  }
}
