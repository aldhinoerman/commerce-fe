/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useOrderStore } from "@/store";
import { formatCurrency } from "@/utils";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import ErrorFetch from "./error-fetch";
import { Table } from "../organisms";

function OrderList() {
  const { fetchOrders, orders, error, loading } = useOrderStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchOrders(page);
  }, [fetchOrders, page]);

  const handleSetPage = (page: number) => {
    setPage(page);
  };

  const columns = useCallback(
    () => [
      {
        key: "username",
        title: "Username",
      },
      {
        key: "status",
        title: "Status",
        render: (v: any) => (v ? v.charAt(0).toUpperCase() + v.slice(1) : ""),
      },
      {
        key: "totalPrice",
        title: "Total Transaction",
        align: "right",
        render: (v: number) => formatCurrency(v ?? 0),
      },
      {
        key: "createdAt",
        title: "Created At",
        render: (v: string) =>
          v ? moment(v).format("DD MMM YYYY h:mm:ss a") : "",
      },
    ],
    []
  );

  if (error) {
    return (
      <ErrorFetch
        title="Error Get Data"
        description={error}
        action={fetchOrders}
      />
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold">Order List</h4>
        </div>

        <Table
          columns={columns()}
          data={orders?.data ?? []}
          total={Number(orders?.pagination?.totalPages)}
          currentPage={Number(orders?.pagination?.page)}
          rowsPerPage={Number(orders?.pagination?.limit)}
          loading={loading}
          onPageChange={handleSetPage}
        />
      </div>
    </>
  );
}

export default OrderList;
