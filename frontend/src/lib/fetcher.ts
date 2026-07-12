const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const fetcher = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options
  });

  const data = await response.json()

  if(!response.ok) {
    throw new Error(data.message || "Request Failed");
  }

  return data as T;
}