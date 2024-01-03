export type PropForm = {
  name?: string,
  email: string,
  password: string,
};

export type Director = {
  id: number,
  name: string
};

export type ListFilms = {
  id: number,
  name: string,
  poster: string,
  year: number,
  directors: Director[],
};

export type PropRegister = {
  name: string,
  email: string,
  password: string,
};

export type TypeResultLogin = {
  token?: string,
  userId?: number,
  data?: { message?: string } };

export type PropUserContext = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  form: PropForm,
  handleForm: (event: React.FormEvent<HTMLFormElement>) => void,
  handleFormRegister: (event: React.FormEvent<HTMLFormElement>) => void,
  resultLogin: TypeResultLogin,
  register: PropRegister,
  handleChangeRegister: (event: React.ChangeEvent<HTMLInputElement>) => void,
};
