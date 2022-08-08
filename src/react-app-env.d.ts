/// <reference types="react-scripts" />
export interface User {
  id?: number,
  first_name: string,
  last_name: string,
  birth_date: string,
  gender: string,
  job: string,
  biography: string,
  is_active: boolean
}

export interface UsersData {
  Data: User[];
}

export interface RootState {
  users: User[];
  currentUser: User | undefined;
  mode: boolean;
}
