/// <reference types="react-scripts" />
export interface User {
  id?: number,
  first_name: string,
  last_name: string,
  birth_date: Date | null,
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
  currentId: number | undefined;
  currentUser: User | undefined;
}
