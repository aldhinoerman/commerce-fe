/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductDetail } from "@/components";
import { apiRoute } from "@/utils";
import React from "react";

async function getProductById(id: number) {
  const res = await apiRoute.get(`products/get?id=${id}`);

  if (!res) {
    throw new Error(`Failed to fetch product with ID ${id}`);
  }

  return res.data;
}

async function ProductPage({ params }: any) {
  const { slug } = await params;

  const slugParts = slug.split("-");
  const id = slugParts[slugParts.length - 1];

  if (!id) {
    return <div>Product ID is missing</div>;
  }

  let product;
  try {
    product = await getProductById(Number(id));
  } catch (error) {
    return console.error(error);
  }

  return <ProductDetail product={product.data} slug={slug} />;
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params;

  const slugParts = slug.split("-");
  const id = slugParts[slugParts.length - 1];

  if (!id) {
    return {
      title: "Product Not Found",
      description: "No product found with this ID",
    };
  }

  const product = await getProductById(Number(id));

  return {
    title: `${product?.title || "Commerce"}`,
    description: product.description,
  };
}

export default ProductPage;
