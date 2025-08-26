export interface Product {
  description: string;
  handle: string;
  id: string;
  title: string;
  vendor: string;
  images: {
    edges: { node: { altText: string; height: number; originalSrc: string; width: number } }[];
    pageInfo: PageInfo;
  };
  priceRange: PriceRange;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductsResponse {
  products: {
    edges: { node: Product }[];
    pageInfo: PageInfo;
  };
}

export interface ProductByHandleResponse {
  productByHandle: ProductInfo;
}

export interface ProductInfo extends Product {
  descriptionHtml: string;
  options: { id: string; name: string; values: string[] }[];
}

export interface PriceRange {
  minVariantPrice: { amount: string; currencyCode: string };
  maxVariantPrice?: { amount: string; currencyCode: string };
}
