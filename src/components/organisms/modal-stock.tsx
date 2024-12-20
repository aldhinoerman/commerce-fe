/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useProductStore } from "@/store";
import { IStock, IVariant } from "@/utils";
import React from "react";
import { useForm } from "react-hook-form";
import Modal from "./modal";

interface ModalStockProps {
  data: IVariant;
}

function ModalStock({ data }: ModalStockProps) {
  const { adjustStock } = useProductStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStock>();

  const onStockAdjustment = async (stock: any) => {
    try {
      const dataSubmit = {
        ...stock,
        adjustment: Number(stock.adjustment),
      };
      await adjustStock(dataSubmit);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal id={`stock-opname-${data.id}`} title="Stock Opname">
      <form
        onSubmit={handleSubmit((val) =>
          onStockAdjustment({
            ...val,
            variantId: data.id,
          })
        )}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Adjustment</label>

          <input
            type="number"
            min={0}
            defaultValue={1}
            className={`input input-bordered w-full ${
              errors?.adjustment ? "border-red-500" : ""
            }`}
            {...register("adjustment", {
              required: "Adjustment is required",
            })}
          />
          {errors?.adjustment && (
            <p className="text-red-500 text-sm">
              {errors?.adjustment?.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Reason</label>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors?.reason ? "border-red-500" : ""
            }`}
            {...register("reason", {
              required: "Reason is required",
            })}
          />
          {errors?.reason && (
            <p className="text-red-500 text-sm">{errors?.reason?.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </Modal>
  );
}

export default ModalStock;
