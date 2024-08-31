const serverURL = "https://aidsbridge-1.onrender.com";

export const search = async <T>(
  path: string,
  params: any = {}
): Promise<T[]> => {
  const query: URLSearchParams = new URLSearchParams(params);
  const response = await fetch(`${serverURL}/${path}?${query}`, {
    method: "GET",
  });
  return response.json();
};
