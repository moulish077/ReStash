
const API_URL = "http://localhost:3000";

export async function checkBackend() {
  const response = await fetch(`${API_URL}/api/health`);

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  return response.json();
}

export async function authenticateUser(
  mode: "login" | "signup",
  email: string,
  password: string
) {
  const response = await fetch(
    `${API_URL}/api/auth/${mode}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Authentication failed");
  }

  return data;
}

export type Resource = {
  id: number
  name: string
  description: string
  category: string
  location: string
  owner: string
  available: boolean
}



export async function getResources(): Promise<Resource[]> {
  const response = await fetch(`${API_URL}/api/resources`)

  if (!response.ok) {
    throw new Error('Failed to load resources')
  }

  const result = await response.json()
  return result.data as Resource[]
}

export async function createResource(
  resource: Omit<Resource, 'id' | 'available'>,
): Promise<Resource> {
  const response = await fetch(`${API_URL}/api/resources`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resource),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to create resource')
  }

  return result.data as Resource
}
