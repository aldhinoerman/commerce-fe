/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { request } from "@/utils";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page");
  const id = url.searchParams.get("id");

  try {
    let response;

    if (id) {
      response = await request.get(`products/${id}`);
    } else {
      response = await request.get("products", {
        params: { page },
      });
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: error.response?.status || 500 }
    );
  }
}
