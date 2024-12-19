import { formatCurrency, IProduct } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  data: IProduct;
}

function ProductCard({ data }: ProductCardProps) {
  return (
    data && (
      <Link
        href={`product/${data.title.toLocaleLowerCase().split(" ").join("-")}-${
          data.id
        }`}
        prefetch
      >
        <div className="card bg-white w-96 shadow-xl h-full">
          {data?.variants[0]?.image && (
            <figure>
              <Image
                src={data.variants[0].image}
                alt={`product-${data.title}`}
                width={500}
                height={350}
                className="w-full h-56 object-cover"
              />
            </figure>
          )}

          <div className="card-body flex flex-col justify-between">
            <h2 className="card-title text-center mx-auto">{data.title}</h2>
            <p>{data.description}</p>
            <p className="font-bold">
              {data?.variants[0]?.price
                ? formatCurrency(data.variants[0].price)
                : formatCurrency(0)}
            </p>
          </div>
        </div>
      </Link>
    )
  );
}

export default ProductCard;
