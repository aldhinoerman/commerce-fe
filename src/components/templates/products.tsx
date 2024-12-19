import { IProduct } from "@/utils";
import React from "react";
import { SectionWrapper } from "../atoms";
import { Loading } from "../molecules";
import { ProductCard } from "../organisms";

interface ProductsProps {
  products: IProduct[];
  loading: boolean;
  onLoadMore: () => void;
  pagination: {
    total: number;
  };
}

function Products({
  products,
  loading,
  pagination,
  onLoadMore,
}: ProductsProps) {
  console.log("product", products);

  return (
    <SectionWrapper id="products">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center">Products</h1>

        <div className="flex flex-col w-full">
          <div className="flex flex-wrap justify-center my-8 gap-8">
            {products?.length > 0 &&
              products.map((obj, idx) => <ProductCard data={obj} key={idx} />)}
          </div>
          {loading ? (
            <Loading />
          ) : (
            products?.length > 6 && (
              <div className="mx-auto my-8">
                <button
                  className="btn btn-primary"
                  onClick={onLoadMore}
                  disabled={Boolean(products?.length <= pagination.total)}
                >
                  Load More
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Products;
