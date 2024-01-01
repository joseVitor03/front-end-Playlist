import { Link } from 'react-router-dom';
import { useContext } from 'react';
import styles from './login.module.css';
import cine from './Drive-in movie theater-amico.svg';
import userContext from '../../context/user.context';

function Login() {
  const { handleChange, form, handleForm, resultLogin } = useContext(userContext);

  return (
    <main className={ styles.PageLogin }>
      <section className={ styles.containerDriveIn }>
        <img src={ cine } alt="imagem cinema de carros" />
      </section>
      <section className={ styles.containerForm }>
        <form onSubmit={ (e) => handleForm(e) }>
          { resultLogin.data && (
            <p className={ styles.message }>{resultLogin.data.message}</p>
          )}
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              value={ form.email }
              onChange={ (e) => handleChange(e) }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              id="password"
              type="password"
              value={ form.password }
              onChange={ (e) => handleChange(e) }
            />
          </label>
          <button>Login</button>
          <div className={ styles.linkRegister }>
            <Link className={ styles.linkRegister } to="/register">
              Não possuí conta? Cadastre-se aqui
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
