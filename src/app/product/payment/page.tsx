"use client";
import { Loading, SectionWrapper } from "@/components";
import ErrorFetch from "@/components/templates/error-fetch";
import { useOrderStore } from "@/store";
import { formatCurrency } from "@/utils";
import Link from "next/link";
import React, { useEffect } from "react";
import store from "store";

function Payment() {
  const username = store.get("username");
  const { orders, fetchOrders, payment, error, loading } = useOrderStore();

  useEffect(() => {
    if (username) {
      fetchOrders(1, 100, username);
    }
  }, [fetchOrders, username]);

  if (error) {
    return (
      <ErrorFetch
        title="Error Get Data"
        description={error}
        action={() => fetchOrders()}
      />
    );
  }

  const handlePay = async (orderId: number) => {
    try {
      await payment(orderId);
    } catch (error) {
      console.error("Failed creating payment", error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading size="lg" />
      ) : (
        <SectionWrapper id="payment">
          <div className="w-full">
            {orders && orders?.data?.length > 0 ? (
              <ul className="w-full list-disc flex flex-col gap-4">
                {orders?.data.map((obj, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <p>
                      Status Payment:{" "}
                      {obj.status.charAt(0).toUpperCase() + obj.status.slice(1)}
                    </p>
                    <p className="font-bold">
                      Total Price: {formatCurrency(obj?.totalPrice ?? 0)}
                    </p>
                    <button
                      className="btn btn-primary bg-blue-900 hover:bg-blue-500 text-white"
                      onClick={() => handlePay(obj.id)}
                      disabled={loading || obj.status === "paid"}
                    >
                      Pay
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Orders found</p>
            )}

            <div className="text-center mt-12">
              <Link href={"/"} className="btn btn-primary" prefetch>
                Return to Home
              </Link>
            </div>
          </div>
        </SectionWrapper>
      )}
    </>
  );
}

export default Payment;
