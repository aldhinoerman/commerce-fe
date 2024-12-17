/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { request } from "@/utils";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const response = await request.post("auth/login", { email, password });
    const { token } = response.data.data;

    const res = NextResponse.json({ message: "Login successful" });

    (await cookies()).set("authToken", token, { maxAge: 60 * 60 * 24 });

    return res;
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "An error occurred";

    return NextResponse.json({ message }, { status });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
