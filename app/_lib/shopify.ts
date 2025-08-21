const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: { first?: number; query?: string };
}): Promise<T> {
  const res = await fetch(domain, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch Shopify API');
  }

  return json.data;
}
