export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Registration {
  name?: string;
  email: string;
  password: string;
}
