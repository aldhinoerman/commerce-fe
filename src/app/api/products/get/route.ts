/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { request } from "@/utils";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page");

  const cookieStore = cookies();
  const authToken = (await cookieStore).get("authToken")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await request.get("products", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: { page },
    });

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
