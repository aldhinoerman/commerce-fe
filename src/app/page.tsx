"use client";
import { Footer, Header, Hero, MainLayout, Products } from "@/components";
import { useProductStore } from "@/store";
import { useEffect, useState } from "react";

export default function Home() {
  const { products, fetchProducts, loading } = useProductStore();

  const [pagePagination, setPagePagination] = useState({ page: 1, limit: 10 });
  useEffect(() => {
    fetchProducts(pagePagination.page, pagePagination.limit);
  }, [fetchProducts, pagePagination]);

  const handleLoadMore = () => {
    setPagePagination((prevState) => ({
      ...prevState,
      limit: prevState.limit + 6,
    }));
  };

  return (
    <>
      <Header />
      <MainLayout>
        <Hero />
        <Products
          products={products?.data || []}
          loading={loading}
          pagination={{ total: Number(products?.pagination?.total ?? 0) }}
          onLoadMore={handleLoadMore}
        />
      </MainLayout>
      <Footer />
    </>
  );
}
