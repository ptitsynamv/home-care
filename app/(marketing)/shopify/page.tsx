import { ProductsResponse } from "@/app/_lib/product";
import { shopifyFetch } from "@/app/_lib/shopify";
import Image from 'next/image';
import Link from "next/link";

export default async function Page() {
  const query = `
query getAllProducts($first: Int = 20, $query: String) {
  products(first: $first, query: $query) {
    pageInfo {
    hasNextPage
    hasPreviousPage
  }
    edges {
      node {
        id
        title
        vendor
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              originalSrc
              altText
              width
              height
            }
          }
        }
      }
    }
  }
}
`
  const data = await shopifyFetch<ProductsResponse>({ query, variables: { first: 20, query: "vendor:Renovation" } });

  const products = data.products.edges.map((edge) => edge.node);

  console.log({ data });

  return (
    <>
      <div className="grid gap-4 mb-8 md:mb-12 md:grid-cols-2">
        {products && products.map((product) => (
          <div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/shopify/${product.handle}`}>
              <Image
                className="p-8 rounded-t-lg"
                src={'/images/' + product.images.edges[0]?.node.originalSrc || '/placeholder.png'}
                alt={product.title}
                width={2048}
                height={2048}
              />
            </Link>
            <div className="px-5 pb-5">
              <Link href={`/shopify/${product.handle}`}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}</span>
                <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

