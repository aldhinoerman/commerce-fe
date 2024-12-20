/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { formatCurrency, ICart } from "@/utils";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useEffect, useState } from "react";
import store from "store";
import { debounce } from "lodash";
import { useOrderStore } from "@/store";

interface CartItemProps {
  data: ICart;
}

function CartItem({ data }: CartItemProps) {
  const { updateCart, deleteCart } = useOrderStore();
  const [quantity, setQuantity] = useState(1);
  const username = store.get("username");

  useEffect(() => {
    if (data && data.quantity) {
      setQuantity(data.quantity);
    }
  }, [data]);

  const updateQuantity = useCallback(
    debounce(async (newQuantity) => {
      try {
        const dataSubmit = {
          username,
          variantId: data.variant.id,
          quantity: newQuantity,
        };
        await updateCart(dataSubmit);
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }
    }, 3000),
    []
  );
  const handleQuantityChange = (num: number) => {
    const newQuantity = Math.max(1, quantity + num);
    setQuantity(newQuantity);
    updateQuantity(newQuantity);
  };

  const handleRemove = async () => {
    try {
      const dataSubmit = {
        username,
        variantId: data.variant.id,
      };
      await deleteCart(dataSubmit);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    data && (
      <div className="mb-4 text-center">
        <p className="font-bold text-center">{data.variant.name}</p>

        <div className="flex items-center gap-4 justify-center my-4">
          <button
            className="btn btn-circle btn-sm"
            onClick={() => handleQuantityChange(-1)}
            disabled={Boolean(quantity === 1)}
          >
            <MinusIcon className="w-6 h-6" />
          </button>
          <p>{quantity}</p>
          <button
            className="btn btn-circle btn-sm"
            onClick={() => handleQuantityChange(1)}
            disabled={Boolean(data.variant.stock === quantity)}
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>

        <p className="text-center">
          {formatCurrency(
            data?.variant?.price && data?.quantity
              ? data?.variant?.price * data?.quantity
              : 0
          )}
        </p>

        <button
          className="my-4 bg-red-500 text-white px-2 py-1 rounded mt-4"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    )
  );
}

export default CartItem;
