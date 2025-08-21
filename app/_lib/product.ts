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
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
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
