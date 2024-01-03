import { createContext } from 'react';
import { PropUserContext } from '../type';

const userContext = createContext({
  handleChange: () => {},
  form: { email: '', password: '' },
  handleForm: () => {},
  handleFormRegister: () => {},
  resultLogin: { token: '', userId: 0, data: { message: '' } },
  register: { name: '', email: '', password: '' },
  handleChangeRegister: () => {},
} as PropUserContext);

export default userContext;
