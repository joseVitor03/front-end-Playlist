import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import userContext from './context/user.context';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import useLogin from './hooks/useLogin';
import User from './pages/User/User';
import PlaylistUser from './pages/PlaylistUser/PlaylistUser';

function App() {
  const { handleChange, form, handleForm,
    resultLogin, handleFormRegister, register, handleChangeRegister } = useLogin();

  const valueLogin = {
    form,
    handleChange,
    handleForm,
    resultLogin,
    handleFormRegister,
    register,
    handleChangeRegister,
  };
  return (
    <userContext.Provider value={ valueLogin }>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/user" element={ <User /> } />
        <Route path="/playlistUser" element={ <PlaylistUser /> } />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
