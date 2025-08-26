interface Config {
  apiUrl: string;
}

export const config: Config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
};
