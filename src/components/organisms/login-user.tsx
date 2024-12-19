/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";

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
    <dialog id="modal-login" className="modal">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg">Login</h3>
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

        <form method="dialog">
          <button className="btn btn-ghost">Close</button>
        </form>
      </div>
    </dialog>
  );
};

export default LoginModal;
