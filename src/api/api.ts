export const BASE_URL = 'https://frontend-candidate.dev.sdh.com.ua/v1/contact/';

export async function getAllUsers() {
  const response = await fetch(`${BASE_URL}`);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function getUser(id: number | undefined) {
  const response = await fetch(`${BASE_URL}${id}`);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function delUser(id : number) {
  const response = await fetch(`${BASE_URL}${id}`, { method: 'DELETE' });

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response;
}

export async function createUser(
  first_name: string,
  last_name: string,
  birth_date: string,
  gender: string,
  job: string,
  biography: string,
  is_active: boolean,
) {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      first_name,
      last_name,
      birth_date,
      gender,
      job,
      biography,
      is_active,
    }),
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response;
}

export async function updateUser(
  id: number | undefined,
  first_name: string,
  last_name: string,
  birth_date: string,
  gender: string,
  job: string,
  biography: string,
  is_active: boolean,
) {
  const response = await fetch(`${BASE_URL}${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      first_name,
      last_name,
      birth_date,
      gender,
      job,
      biography,
      is_active,
    }),
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response;
}
