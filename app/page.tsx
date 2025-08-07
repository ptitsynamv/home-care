import { shopifyFetch } from "@/app/_lib/shopify";

export default async function Home() {
  const query = `query { hello }`;

  const data = await shopifyFetch({ query });

  console.log({ data })


  return (
    <div>
      <h1>Here home</h1>
    </div>
  );
}
