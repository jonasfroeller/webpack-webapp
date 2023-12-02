const REST_PORT = 8080; // 127.0.0.1 needed for tests. else -> ::1 => Error
const REST_URL = `http://127.0.0.1:${REST_PORT}`;

async function fetchJson(url: string, config: unknown): Promise<unknown> {
  try {
    const response = await fetch(url, config ?? undefined);

    if (!response.ok) {
      console.error(`Request failed. Status: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function create(body: unknown): Promise<unknown> {
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  return await fetchJson(REST_URL, config);
}
