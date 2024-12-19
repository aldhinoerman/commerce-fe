/* eslint-disable */
"use client";
import React, { useCallback, useEffect } from "react";
import Drawer from "./drawer";
import store from "store";
import { useOrderStore } from "@/store";
import { CartItem } from "../molecules";

interface CartProps {
  toggleShow: React.ReactNode;
}

function Cart({ toggleShow }: CartProps) {
  const { fetchCart, cart } = useOrderStore();
  const username = store.get("username");

  const getCart = useCallback(() => {
    if (username) {
      fetchCart(username);
    }
  }, [fetchCart, username]);

  useEffect(() => {
    getCart();
  }, [getCart]);

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
const dialog = document.getElementById("modal-login") as HTMLDialogElement;
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
                  <button className="btn btn-primary">Checkout</button>
                </div>
              </>
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
