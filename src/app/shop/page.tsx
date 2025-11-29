import Navbar from "@/components/dom/Navbar";
import ProductList from "@/components/dom/ProductList";

export default function ShopPage() {
  return (
    <main className="bg-neutral-950 min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ProductList />
      </div>
    </main>
  );
}
