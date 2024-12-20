/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { request } from "@/utils";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.json();

  const cookieStore = cookies();
  const authToken = (await cookieStore).get("authToken")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await request.post("products/stock-opname", data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error update stock:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Failed update stock" },
      { status: error.response?.status || 500 }
    );
  }
}
