/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { request } from "@/utils";
import { cookies } from "next/headers";

export async function PATCH(req: Request) {
  const data = await req.formData();

  const cookieStore = cookies();
  const authToken = (await cookieStore).get("authToken")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await request.patch("products/categories", data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error update product categories:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { message: "Failed update product categories" },
      { status: error.response?.status || 500 }
    );
  }
}
