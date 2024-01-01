import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { PropForm, TypeResultLogin, PropRegister } from '../type';

const useLogin = () => {
  const InitialForm = {
    email: '',
    password: '',
  };

  const InitialRegister = {
    name: '',
    email: '',
    password: '',
  };

  const api = import.meta.env.VITE_MY_API;
  const navigate = useNavigate();
  const [form, setForm] = useState<PropForm>(InitialForm);
  const [register, setRegister] = useState<PropRegister>(InitialRegister);
  const [resultLogin, setResultLogin] = useState<TypeResultLogin>({});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await axios.post<PropForm, AxiosResponse>(`${api}/login`, form);
      setResultLogin(result.data);
      navigate('/user');
      setForm(InitialForm);
    } catch (error: any) {
      setResultLogin(error.response);
      setForm(InitialForm);
    }
  };

  const handleFormRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await axios.post<PropForm, AxiosResponse>(`${api}/register`, form);
      setResultLogin(result.data);
      navigate('/user');
      setRegister(InitialRegister);
    } catch (error: any) {
      setResultLogin(error.response);
      setRegister(InitialRegister);
    }
  };

  return {
    handleChange,
    form,
    handleForm,
    resultLogin,
    handleFormRegister,
    register,
  };
};

export default useLogin;
