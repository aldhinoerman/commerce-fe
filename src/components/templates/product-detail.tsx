/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { encodeName, formatCurrency, IProduct, IVariant } from "@/utils";
import React, { useEffect, useState } from "react";
import { SectionWrapper } from "../atoms";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { MinusIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import store from "store";
import { Cart, LoginModal } from "../organisms";
import { useOrderStore } from "@/store";

interface ProductDetailProps {
  product: IProduct;
  slug: string;
}

function ProductDetail({ product, slug }: ProductDetailProps) {
  const { addCart } = useOrderStore();
  const username = store.get("username");
  const [variant, setVariant] = useState<IVariant | null>(null);
  const [qty, setQty] = useState<number | undefined>(1);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setVariant(product?.variants[0]);
    }
  }, [product]);

  const handleChangeVariant = (data: IVariant) => {
    setVariant(data);
  };

  const handleIncrease = () => {
    setQty((prevState) => {
      if (prevState === variant?.stock) return prevState;
      return prevState && prevState + 1;
    });
  };

  const handleDecrease = () => {
    setQty((prevState) => {
      if (prevState === 1) return prevState;
      return prevState && prevState - 1;
    });
  };

  const handleSubmitSuccess = (data: any) => {
    alert(`Welcome, ${data.name}!`);
    store.set("username", encodeName(data.name));
    document?.getElementById("modal-login")?.close();
    window.location.reload();
  };

  const handleAddCart = async () => {
    if (variant) {
      await addCart({
        username,
        variantId: variant.id,
        quantity: qty,
      });
    }
  };
  console.log("product", product);

  return (
    <>
      <SectionWrapper id={slug}>
        <div className="w-full">
          <h1 className="font-bold text-xl">{product.title}</h1>
          <p>{product.category.name}</p>
          {variant && (
            <>
              <div className="flex justify-center">
                {variant?.image && (
                  <Image
                    src={variant.image}
                    alt={variant?.name ?? ""}
                    width={500}
                    height={500}
                  />
                )}
              </div>
              <div className="flex gap-8 justify-center my-8">
                {product?.variants?.length > 0 &&
                  product.variants.map((obj, idx) => (
                    <button
                      onClick={() => handleChangeVariant(obj)}
                      className="btn btn-primary"
                      key={idx}
                    >
                      {obj.name} ({obj.stock})
                    </button>
                  ))}
              </div>

              <div className="my-8">
                <p>{variant.description}</p>
                <p className="font-bold">
                  {formatCurrency(variant?.price ?? 0)}
                </p>
              </div>

              <div className="flex items-center gap-4 justify-center">
                {username ? (
                  <>
                    <Cart
                      toggleShow={
                        <label
                          htmlFor="cart"
                          className="btn btn-primary"
                          onClick={handleAddCart}
                        >
                          <ShoppingCartIcon className="w-6 h-6" /> Add to Cart
                        </label>
                      }
                    />
                    <button
                      className="btn btn-circle"
                      onClick={handleDecrease}
                      disabled={Boolean(qty === 1)}
                    >
                      <MinusIcon className="w-6 h-6" />
                    </button>
                    <p>{qty}</p>
                    <button
                      className="btn btn-circle"
                      onClick={handleIncrease}
                      disabled={Boolean(qty === variant.stock)}
                    >
                      <PlusIcon className="w-6 h-6" />
                    </button>
                    <button className="btn btn-primary">Buy Now</button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      document?.getElementById("modal-login")?.showModal()
                    }
                  >
                    Login to Buy
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </SectionWrapper>
      <LoginModal onSubmitSuccess={handleSubmitSuccess} />
    </>
  );
}

export default ProductDetail;
