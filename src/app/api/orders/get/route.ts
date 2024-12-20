/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { request } from "@/utils";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");
  const username = url.searchParams.get("username");

  try {
    const response = await request.get("orders", {
      params: {
        page: page && typeof page === "string" ? page : 1,
        limit: limit && typeof limit === "string" ? limit : 10,
        username,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error fetching orders:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: error.response?.status || 500 }
    );
  }
}
