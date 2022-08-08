export const BASE_URL = 'https://frontend-candidate.dev.sdh.com.ua/v1/contact/';

export async function getAllUsers() {
  try {
    const response = await fetch(`${BASE_URL}`);

    return response.json();
  } catch (error) {
    return error;
  }
}

export async function getUser(id: number | undefined) {
  try {
    const response = await fetch(`${BASE_URL}${id}`);

    return response.json();
  } catch (error) {
    return error;
  }
}

export async function delUser(id : number) {
  try {
    const response = await fetch(`${BASE_URL}${id}`, { method: 'DELETE' });

    return response;
  } catch (error) {
    return error;
  }
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
