"use client";
import React, { useCallback, useEffect } from "react";
import Drawer from "./drawer";
import store from "store";
import { useOrderStore } from "@/store";
import { CartItem, Loading } from "../molecules";

interface CartProps {
  toggleShow: React.ReactNode;
}

function Cart({ toggleShow }: CartProps) {
  const username = store.get("username");
  const { fetchCart, checkout, loading, cart } = useOrderStore();

  const getCart = useCallback(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  const handleCheckout = async () => {
    try {
      await checkout();
      window.location.href = `/product/payment`;
    } catch (error) {
      console.error("Failed to create checkout:", error);
    }
  };

  return (
    <>
      <Drawer id="cart" toggle={toggleShow} position="right">
        <div>
          {!username ? (
            <>
              <div>
                <p>Please login to view cart list</p>
                <button
                  className="btn btn-primary mt-8"
                  onClick={() => {
                    const dialog = document.getElementById(
                      "modal-login"
                    ) as HTMLDialogElement;
                    dialog?.showModal();
                  }}
                >
                  Login
                </button>
              </div>
            </>
          ) : (
            <>
              {cart?.data && cart?.data?.length > 0 ? (
                <>
                  {cart.data.map((obj, idx) => (
                    <CartItem data={obj} key={idx} />
                  ))}
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={handleCheckout}
                      disabled={loading}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              ) : loading ? (
                <Loading size="lg" />
              ) : (
                <p>Empty Cart</p>
              )}
            </>
          )}
        </div>
      </Drawer>
    </>
  );
}

export default Cart;
