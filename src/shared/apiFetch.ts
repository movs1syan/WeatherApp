const KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiFetch = async (type: string, version: string, endpoint: string, params: Record<string, number | string> = {}) => {
  const url = new URL(`${BASE_URL}/${type}/${version}/${endpoint}`);

  url.searchParams.set("appid", KEY);
  url.searchParams.set("units", "metric");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`API error: ${res.statusText}`);
  }

  return res.json();
}