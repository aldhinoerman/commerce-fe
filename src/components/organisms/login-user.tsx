/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import Modal from "./modal";

const LoginModal = ({
  onSubmitSuccess,
}: {
  onSubmitSuccess: (data: any) => void;
}) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data: any) => {
    onSubmitSuccess?.(data);
    reset();
  };

  return (
    <Modal id="modal-login" title="Login">
      <p className="py-4">Please login by writing your name</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder="Enter your name"
          className="input input-bordered w-full mb-4"
        />
        <div className="modal-action">
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
