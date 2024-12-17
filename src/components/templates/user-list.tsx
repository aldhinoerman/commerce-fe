/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useUserStore } from "@/store";
import React, { useCallback, useEffect, useState } from "react";
import ErrorFetch from "./error-fetch";
import { Drawer, Table } from "../organisms";
import {
  EyeIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { cleanObject, LoginFormInput, toast } from "@/utils";
import { AlertConfirm } from "../molecules";
import moment from "moment";

function UserList() {
  const {
    users,
    fetchUsers,
    registerUser,
    updateUser,
    deleteUser,
    loading,
    message,
    error,
  } = useUserStore();

  const [page, setPage] = useState(1);
  const [showAlert, setShowAlert] = useState<{
    show: boolean;
    id: number | null;
  }>({ show: false, id: null });

  useEffect(() => {
    fetchUsers(page);
  }, [fetchUsers]);

  useEffect(() => {
    if (message) {
      return toast(message);
    }
  }, [message]);

  const columns = useCallback(
    () => [
      {
        key: "email",
        title: "Email",
      },
      {
        key: "createdAt",
        title: "Created At",
        render: (v: string) =>
          v ? moment(v).format("DD MMM YYYY h:mm:ss a") : "",
      },
      {
        key: "updatedAt",
        title: "Updated At",
        render: (v: string) =>
          v ? moment(v).format("DD MMM YYYY h:mm:ss a") : "",
      },
      {
        key: "action",
        title: "Action",
        render: (_: any, res: any, idx: number) => {
          return (
            <>
              <div className="flex gap-1">
                <Drawer
                  id={`view-user-${idx}`}
                  position="right"
                  toggle={
                    <label
                      htmlFor={`view-user-${idx}`}
                      className="btn btn-square btn-ghost"
                    >
                      <EyeIcon className="w-6 h-6" />
                    </label>
                  }
                >
                  E-mail: {res.email}
                </Drawer>

                <Drawer
                  id={`edit-user-${idx}`}
                  position="right"
                  toggle={
                    <label
                      htmlFor={`edit-user-${idx}`}
                      className="btn btn-ghost"
                    >
                      <PencilSquareIcon className="w-6 h-6" />
                    </label>
                  }
                >
                  <FormUser initialData={res} />
                </Drawer>

                <button
                  className="btn btn-ghost"
                  onClick={() => handleShowAlert(true, res.id)}
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>
            </>
          );
        },
      },
    ],
    [users]
  );

  const FormUser = ({ initialData }: { initialData?: LoginFormInput }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormInput>({
      defaultValues: {
        email: initialData?.email ?? "",
      },
    });

    const onSubmit = async (data: LoginFormInput) => {
      if (initialData) {
        const formatedData = cleanObject(data);
        await updateUser({ id: initialData?.id, ...formatedData });
      } else {
        await registerUser(data);
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className={`input input-bordered w-full ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className={`input input-bordered w-full ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </>
    );
  };

  const handleSetPage = (page: number) => {
    setPage(page);
  };

  const handleShowAlert = (status: any, id: number | null) => {
    setShowAlert({ show: status, id });
  };

  const onDelete = async () => {
    if (!showAlert.id) return false;
    await deleteUser(showAlert.id);
    handleShowAlert(false, null);
  };

  if (error) {
    return (
      <ErrorFetch
        title="Error Get Data"
        description={error}
        action={() => fetchUsers(page)}
      />
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold">User List</h4>
          <Drawer
            id="new-user"
            position="right"
            toggle={
              <label htmlFor="new-user" className="btn btn-primary my-6">
                <PlusIcon className="w-4 h-4" /> New
              </label>
            }
          >
            <FormUser />
          </Drawer>
        </div>

        <Table
          columns={columns()}
          data={users?.data ?? []}
          total={Number(users?.pagination?.totalPages)}
          currentPage={Number(users?.pagination?.page)}
          rowsPerPage={Number(users?.pagination?.limit)}
          loading={loading}
          onPageChange={handleSetPage}
        />
      </div>

      <AlertConfirm
        message="Are you sure to delete this item?"
        onDeny={() => handleShowAlert(false, null)}
        onAccept={onDelete}
        visible={showAlert.show}
      />
    </>
  );
}

export default UserList;
