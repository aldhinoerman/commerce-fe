/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useProductStore } from "@/store";
import { ICategory, toast } from "@/utils";
import React, { useCallback, useEffect, useState } from "react";
import ErrorFetch from "./error-fetch";
import { Drawer, Table } from "../organisms";
import {
  EyeIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import moment from "moment";
import Image from "next/image";
import { AlertConfirm } from "../molecules";

function CategoryList() {
  const {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    loading,
    message,
    error,
  } = useProductStore();

  const [page, setPage] = useState(1);
  const [showAlert, setShowAlert] = useState<{
    show: boolean;
    id: number | null;
  }>({ show: false, id: null });

  useEffect(() => {
    fetchCategories(page);
  }, [fetchCategories, page]);

  useEffect(() => {
    if (message) {
      return toast(message);
    }
  }, [message]);

  const handleSetPage = (page: number) => {
    setPage(page);
  };

  const handleShowAlert = (status: any, id: number | null) => {
    setShowAlert({ show: status, id });
  };

  const onDelete = async () => {
    if (!showAlert.id) return false;
    await deleteCategory(showAlert.id);
    handleShowAlert(false, null);
  };

  const FormCategory = ({ initialData }: { initialData?: ICategory }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ICategory>({
      defaultValues: {
        name: initialData?.name ?? "",
        image: initialData?.image ?? undefined,
      },
    });

    const onSubmit = async (data: ICategory) => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);

        if (data.image && data.image[0]) {
          formData.append("image", data.image[0]);
        }

        if (initialData && initialData?.id) {
          formData.append("id", String(initialData.id));
        }

        if (initialData) {
          await updateCategory(formData);
        } else {
          await createCategory(formData);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className={`input input-bordered w-full ${
                errors.name ? "border-red-500" : ""
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image</label>
            {initialData?.image ? (
              <>
                <Image
                  src={initialData.image}
                  alt="image-category"
                  width={100}
                  height={100}
                />
                <input
                  type="file"
                  className={`w-full ${errors.image ? "border-red-500" : ""}`}
                  {...register("image")}
                />
              </>
            ) : (
              <input
                type="file"
                className={`w-full ${errors.image ? "border-red-500" : ""}`}
                {...register("image")}
              />
            )}
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </>
    );
  };

  const columns = useCallback(
    () => [
      {
        key: "name",
        title: "Name",
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
                  id={`view-category-${idx}`}
                  position="right"
                  toggle={
                    <label
                      htmlFor={`view-category-${idx}`}
                      className="btn btn-square btn-ghost"
                    >
                      <EyeIcon className="w-6 h-6" />
                    </label>
                  }
                >
                  <p>Name: {res.name}</p>
                  {res?.image && (
                    <Image
                      src={res.image ?? null}
                      alt={`category-${idx}`}
                      width={100}
                      height={100}
                    />
                  )}
                </Drawer>

                <Drawer
                  id={`edit-category-${idx}`}
                  position="right"
                  toggle={
                    <label
                      htmlFor={`edit-category-${idx}`}
                      className="btn btn-ghost"
                    >
                      <PencilSquareIcon className="w-6 h-6" />
                    </label>
                  }
                >
                  <FormCategory initialData={res} />
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
    [categories, page]
  );

  if (error) {
    return (
      <ErrorFetch
        title="Error Get Data"
        description={error}
        action={() => fetchCategories(page)}
      />
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold">Product Category List</h4>
          <Drawer
            id="new-category"
            position="right"
            toggle={
              <label htmlFor="new-category" className="btn btn-primary my-6">
                <PlusIcon className="w-4 h-4" /> New
              </label>
            }
          >
            <FormCategory />
          </Drawer>
        </div>

        <Table
          columns={columns()}
          data={categories?.data ?? []}
          total={Number(categories?.pagination?.totalPages)}
          currentPage={Number(categories?.pagination?.page)}
          rowsPerPage={Number(categories?.pagination?.limit)}
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

export default CategoryList;
