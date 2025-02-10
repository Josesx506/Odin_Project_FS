import ProductDetails from "@/components/ProductDetails";

export default async function Pages({ params, searchParams }) {
  const urlParams = await params;
  const id = parseInt(urlParams.id);

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  )
}
