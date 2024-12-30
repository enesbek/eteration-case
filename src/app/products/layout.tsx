import React from "react";
import Cart from "@/components/Cart";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row gap-8 min-h-screen p-8 pb-20">
      <main className="flex-1">{children}</main>
      <aside className="w-1/4 max-w-48">
        <Cart />
      </aside>
    </div>
  );
};

export default ProductsLayout;
