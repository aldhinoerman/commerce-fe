/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useProductStore } from "@/store";
import React, { useCallback, useEffect, useState } from "react";
import { AlertConfirm } from "../molecules";
import ErrorFetch from "./error-fetch";
import {
  EyeIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Drawer, ModalStock, Table } from "../organisms";
import { formatCurrency, IProduct, objectToFormData, toast } from "@/utils";
import { useFieldArray, useForm } from "react-hook-form";
import Image from "next/image";
import moment from "moment";

function ProductList() {
  const {
    products,
    categories,
    fetchCategories,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    loading,
    error,
    message,
  } = useProductStore();

  const [page, setPage] = useState(1);
  const [showAlert, setShowAlert] = useState<{
    show: boolean;
    id: number | null;
  }>({ show: false, id: null });

  useEffect(() => {
    fetchProducts(page);
  }, [fetchProducts, page]);

  useEffect(() => {
    fetchCategories(1, 100);
  }, [fetchCategories]);

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
    await deleteProduct(showAlert.id);
    handleShowAlert(false, null);
  };

  const FormProduct = ({ initialData }: { initialData?: IProduct }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
    } = useForm<IProduct>({
      defaultValues: {
        title: initialData?.title ?? undefined,
        description: initialData?.description ?? undefined,
        categoryId: initialData?.categoryId ?? undefined,
        variants:
          initialData?.variants && initialData?.variants?.length > 0
            ? initialData.variants.map((val: any) => ({
                name: val.name,
                description: val.description,
                price: val.price,
                stock: val.stock,
                image: val.image,
                sku: val.sku,
              }))
            : [],
      },
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: "variants",
    });

    const onSubmit = async (data: IProduct) => {
      try {
        let parseData;

        let dataForm: any = {
          ...data,
          id: initialData?.id ? initialData.id : undefined,
        };

        if (data?.variants?.length > 0) {
          parseData = data.variants.map((v, idx) => ({
            name: v?.name
              ? v.name
              : initialData?.variants[idx]?.name
              ? initialData?.variants[idx]?.name
              : null,
            sku: v?.sku
              ? v.sku
              : initialData?.variants[idx]?.sku
              ? initialData?.variants[idx]?.sku
              : null,
            description: v?.description
              ? v.description
              : initialData?.variants[idx]?.description
              ? initialData?.variants[idx]?.description
              : null,
            price: v?.price
              ? Number(v.price)
              : initialData?.variants[idx]?.price
              ? Number(initialData?.variants[idx]?.price)
              : null,
            stock: v?.stock
              ? Number(v.stock)
              : initialData?.variants[idx]?.stock
              ? Number(initialData?.variants[idx]?.stock)
              : null,
            image:
              v && v?.image
                ? v.image[0]
                : initialData?.variants[idx]?.image
                ? initialData?.variants[idx]?.image
                : null,
          }));

          dataForm = { ...dataForm, variants: parseData };
        }

        const fd = objectToFormData(dataForm);

        if (initialData) {
          await updateProduct(fd);
        } else {
          await createProduct(fd);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className={`input input-bordered w-full ${
                errors.title ? "border-red-500" : ""
              }`}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              className={`textarea textarea-bordered w-full ${
                errors.description ? "border-red-500" : ""
              }`}
              {...register("description")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              className="select select-bordered w-full"
              {...register("categoryId", {
                required: "Category Id is required",
              })}
            >
              {categories &&
                categories?.data?.length > 0 &&
                categories.data.map((obj, idx) => (
                  <option key={idx} value={obj.id}>
                    {obj.name}
                  </option>
                ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <h4 className="font-bold">Variants</h4>
            {fields?.length > 0 &&
              fields?.map((val, index) => (
                <React.Fragment key={val.id || index}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>

                    <input
                      type="text"
                      className={`input input-bordered w-full ${
                        errors?.variants?.[index]?.name ? "border-red-500" : ""
                      }`}
                      {...register(`variants.${index}.name`, {
                        required: "Name is required",
                      })}
                    />
                    {errors?.variants?.[index]?.name && (
                      <p className="text-red-500 text-sm">
                        {errors?.variants[index]?.name?.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      className={`textarea textarea-bordered w-full ${
                        errors?.variants?.[index]?.description
                          ? "border-red-500"
                          : ""
                      }`}
                      {...register(`variants.${index}.description`)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Code
                    </label>

                    <input
                      type="text"
                      className={`input input-bordered w-full ${
                        errors?.variants?.[index]?.sku ? "border-red-500" : ""
                      }`}
                      {...register(`variants.${index}.sku`, {
                        required: "Code is required",
                      })}
                    />
                    {errors?.variants?.[index]?.sku && (
                      <p className="text-red-500 text-sm">
                        {errors?.variants[index]?.sku?.message}
                      </p>
                    )}
                  </div>

                  {!initialData && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Stock
                      </label>

                      <input
                        type="number"
                        min={0}
                        defaultValue={1}
                        className={`input input-bordered w-full ${
                          errors?.variants?.[index]?.stock
                            ? "border-red-500"
                            : ""
                        }`}
                        {...register(`variants.${index}.stock`, {
                          required: "Stock is required",
                        })}
                      />
                      {errors?.variants?.[index]?.stock && (
                        <p className="text-red-500 text-sm">
                          {errors?.variants[index]?.stock?.message}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Price
                    </label>

                    <input
                      type="number"
                      min={0}
                      defaultValue={0}
                      className={`input input-bordered w-full ${
                        errors?.variants?.[index]?.price ? "border-red-500" : ""
                      }`}
                      {...register(`variants.${index}.price`, {
                        required: "Stock is required",
                      })}
                    />
                    {errors?.variants?.[index]?.price && (
                      <p className="text-red-500 text-sm">
                        {errors?.variants[index]?.price?.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Image
                    </label>
                    {val?.image && typeof val?.image === "string" ? (
                      <>
                        <Image
                          src={val.image}
                          alt="image-category"
                          width={100}
                          height={100}
                        />
                        <input
                          type="file"
                          className={`w-full ${
                            errors?.variants?.[index]?.image
                              ? "border-red-500"
                              : ""
                          }`}
                          {...register(`variants.${index}.image`)}
                        />
                      </>
                    ) : (
                      <input
                        type="file"
                        className={`w-full ${
                          errors?.variants?.[index]?.image
                            ? "border-red-500"
                            : ""
                        }`}
                        {...register(`variants.${index}.image`)}
                      />
                    )}
                    {errors?.variants?.[index]?.image && (
                      <p className="text-red-500 text-sm">
                        {errors.variants[index].image.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={Boolean(fields?.length === 1)}
                    onClick={() => remove(index)}
                    className="my-4 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </React.Fragment>
              ))}

            <button
              className="btn btn-primary w-full mb-4"
              onClick={() =>
                append({
                  name: undefined,
                  description: undefined,
                  price: 0,
                  stock: 1,
                  sku: undefined,
                  image: undefined,
                })
              }
            >
              Add Variant
            </button>
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
        key: "title",
        title: "Title",
      },
      {
        key: "category",
        title: "Category",
        render: (v: any) => (v?.name ? v.name : ""),
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
                  id={`view-product-${idx}`}
                  position="right"
                  toggle={
                    <label
                      htmlFor={`view-product-${idx}`}
                      className="btn btn-square btn-ghost"
                    >
                      <EyeIcon className="w-6 h-6" />
                    </label>
                  }
                >
                  <div>
                    <p>Title: {res?.title}</p>
                    <p>{res?.description}</p>

                    <div className="mt-4">
                      <h4 className="font-bold">Variants</h4>
                      {res?.variants?.length > 0 &&
                        res.variants.map((v: any, index: number) => (
                          <div key={index} className="mb-4 flex flex-col gap-4">
                            <p>
                              {index + 1}. {v.name}{" "}
                              <span className="text-bold">{v.sku}</span>
                            </p>
                            <p>{v?.description}</p>
                            <p>
                              {v?.price
                                ? formatCurrency(v.price)
                                : formatCurrency(0)}
                            </p>
                            <p>Stock: {v?.stock ?? "0"}</p>

                            <label
                              htmlFor={`stock-opname-${v.id}`}
                              className="btn btn-primary btn-xs"
                              onClick={() => {
                                const dialog = document.getElementById(
                                  `stock-opname-${v.id}`
                                ) as HTMLDialogElement;

                                if (dialog) {
                                  dialog?.showModal();
                                }
                              }}
                            >
                              Stock Opname
                            </label>
                            <ModalStock data={v} />
                          </div>
                        ))}
                    </div>
                  </div>
                </Drawer>

                <Drawer
                  id={`edit-product-${idx}`}
                  position="right"
                  toggle={
                    <label
                      htmlFor={`edit-product-${idx}`}
                      className="btn btn-ghost"
                    >
                      <PencilSquareIcon className="w-6 h-6" />
                    </label>
                  }
                >
                  <FormProduct initialData={res} />
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
    [products, page]
  );

  if (error) {
    return (
      <ErrorFetch
        title="Error Get Data"
        description={error}
        action={fetchProducts}
      />
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold">Product List</h4>
          <Drawer
            id="new-product"
            position="right"
            toggle={
              <label htmlFor="new-product" className="btn btn-primary my-6">
                <PlusIcon className="w-4 h-4" /> New
              </label>
            }
          >
            <FormProduct />
          </Drawer>
        </div>

        <Table
          columns={columns()}
          data={products?.data ?? []}
          total={Number(products?.pagination?.totalPages)}
          currentPage={Number(products?.pagination?.page)}
          rowsPerPage={Number(products?.pagination?.limit)}
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

export default ProductList;
