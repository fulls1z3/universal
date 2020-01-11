export interface Auth {
  email?: string;
  password?: string;
}

export const initialAuth: Auth = {
  email: undefined,
  password: undefined
};
