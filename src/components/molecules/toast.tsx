"use client";
import { useToast } from "@/context";
import React from "react";

function Toast() {
  const { toasts, removeToast } = useToast();
  return toasts.map((toast, idx) => (
    <React.Fragment key={idx}>
      <div className="toast toast-top z-50">
        <div
          className="alert alert-info bg-white"
          onClick={() => removeToast(toast.id)}
        >
          <span>{toast.message}</span>
        </div>
      </div>
    </React.Fragment>
  ));
}

export default Toast;
