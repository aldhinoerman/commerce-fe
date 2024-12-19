/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import LoginModal from "./login-user";
import { decodeUUID, encodeName } from "@/utils";
import store from "store";
import Cart from "./cart";

function Navbar() {
  const [decodedUsername, setDecodedUsername] = useState("");
  const username = store.get("username");

  const handleDecodeUsername = useCallback(() => {
    if (username) {
      setDecodedUsername(decodeUUID(username));
    }
  }, [username]);

  useEffect(() => {
    handleDecodeUsername();
  }, [handleDecodeUsername]);

  const handleSubmitSuccess = (data: any) => {
    alert(`Welcome, ${data.name}!`);
    store.set("username", encodeName(data.name));
const dialog = document.getElementById("modal-login") as HTMLDialogElement;
dialog?.close();
    window.location.reload();
  };

  const handleLogout = () => {
    store.remove("username");

    setDecodedUsername("");
    alert("You have been logged out");
    window.location.reload();
  };

  return (
    <>
      <nav className="max-w-[1080px] w-full">
        <div className="py-6 flex items-center justify-between">
          <Link href={"/"} className="uppercase text-3xl font-bold">
            <h1>Shop.co</h1>
          </Link>
          <div className="flex items-center gap-4">
            {username && decodedUsername ? (
              <button className="btn btn-ghost" onClick={handleLogout}>
                Hi, {decodedUsername}
              </button>
            ) : (
<>
              <button
                className="btn btn-ghost"
                              onClick={() => {
const dialog = document.getElementById("modal-login") as HTMLDialogElement;
dialog?.showModal();
}}
              >
                Login
              </button>
</>
            )}
            <Cart
              toggleShow={
                <label htmlFor="cart" className="btn btn-primary">
                  <ShoppingCartIcon className="w-6 h-6" />
                </label>
              }
            />
          </div>
        </div>
      </nav>

      <LoginModal onSubmitSuccess={handleSubmitSuccess} />
    </>
  );
}

export default Navbar;
