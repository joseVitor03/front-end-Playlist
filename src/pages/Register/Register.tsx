import { useContext } from 'react';
import styles from './register.module.css';
import userContext from '../../context/user.context';
import cine from './Drive-in movie theater-amico.svg';

function Register() {
  const { handleChangeRegister, register, handleFormRegister } = useContext(userContext);
  return (
    <main className={ styles.PageLogin }>
      <section className={ styles.containerDriveIn }>
        <img src={ cine } alt="imagem cinema de carros" />
      </section>
      <section className={ styles.containerForm }>
        <form onSubmit={ (e) => handleFormRegister(e) }>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              type="text"
              value={ register.name }
              onChange={ (e) => handleChangeRegister(e) }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              value={ register.email }
              onChange={ (e) => handleChangeRegister(e) }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              id="password"
              type="password"
              value={ register.password }
              onChange={ (e) => handleChangeRegister(e) }
            />
          </label>
          <button>Login</button>
          <div className={ styles.linkRegister } />
        </form>
      </section>
    </main>
  );
}

export default Register;
