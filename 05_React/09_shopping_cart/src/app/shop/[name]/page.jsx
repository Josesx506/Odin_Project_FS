import ProductCategories from "@/components/ProductCategories";

export default async function Page({ params, searchParams }) {
  const urlParams = await params;
  const name = urlParams.name;
  const urlArgs = await searchParams;
  const page = urlArgs.page || 1;

  return (
    <div>
      <ProductCategories name={name} page={page} />
    </div>
  )
}
