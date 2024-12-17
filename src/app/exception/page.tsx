"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ExceptionPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message") || "Something went wrong.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-red-500">500</h1>
      <p className="text-xl mt-4">{errorMessage}</p>
      <Link href="/admin" className="btn btn-primary mt-6">
        Go back to Home
      </Link>
    </div>
  );
}
