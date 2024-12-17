/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Loading } from "../molecules";

interface TableColumn {
  key: string;
  title: string;
  align?: string;
  render?: (row?: any, data?: any, index?: any) => React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  total: number;
  loading?: boolean;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Table({
  columns,
  data,
  total,
  currentPage,
  rowsPerPage,
  onPageChange,
  loading,
}: TableProps) {
  const totalPages = Math.ceil(total / rowsPerPage);

  return (
    <div className="w-full">
      {loading ? (
        <Loading size="lg" />
      ) : (
        <>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-center align-center">
                  No.
                </th>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`border border-gray-300 px-4 py-2 ${
                      column.align ? `text-${column.align}` : "text-left"
                    }`}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {rowIndex + 1}
                    </td>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`border border-gray-300 px-4 py-2 ${
                          column.align ? `text-${column.align}` : "text-left"
                        }`}
                      >
                        {column.render
                          ? column.render(row[column.key], row, rowIndex)
                          : row[column.key] || ""}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
