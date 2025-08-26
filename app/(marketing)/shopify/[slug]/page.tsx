import { ProductByHandleResponse } from "@/app/_lib/interfaces/product";
import getProductQuery from "@/app/_lib/queries/get-product";
import { shopifyFetch } from "@/app/_lib/services/shopify";
import Image from 'next/image';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const data = await shopifyFetch<ProductByHandleResponse>({ query: getProductQuery, variables: { slug } });
  const product = data.productByHandle;

  return (
    <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Image className="rounded-t-lg" src={'/images/' + product.images.edges[0]?.node.originalSrc || '/placeholder.png'} alt={product.title} width={2048}
        height={2048} />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
      </div>
    </div>
  )
}
