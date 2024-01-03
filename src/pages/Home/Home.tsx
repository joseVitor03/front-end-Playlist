import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListFilms, Director } from '../../type';
import styled from './home.module.css';

function Home() {
  const [listFilms, setListFilms] = useState<ListFilms[]>([]);
  const api = import.meta.env.VITE_MY_API;

  const navigate = useNavigate();

  useEffect(() => {
    const films = async () => {
      const response = await axios.get(`${api}/films`);
      setListFilms(response.data);
    };

    films();
  }, []);

  return (
    <main className={ styled.main }>
      <header className={ styled.header }>
        <h1>Playlist Filmes</h1>
        <div className={ styled.btns }>
          <button
            className={ styled.btn }
            onClick={ () => navigate('/login') }
          >
            Login
          </button>
          <button
            className={ styled.btn }
            onClick={ () => navigate('/register') }
          >
            Criar conta test
          </button>
        </div>
      </header>
      <section className={ styled.container }>
        { listFilms.length && listFilms.map((film: ListFilms) => (
          <div
            key={ film.id }
            className={ styled.card }
          >
            <img src={ film.poster } alt={ `poster ${film.name}` } />
            <h3>{ film.name }</h3>
            { film.directors.map(({ id, name }: Director) => (
              <p key={ id }>{ name }</p>
            ))}
            <button
              onClick={ () => navigate('/login') }
            >
              Adicionar em sua Playlist
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;
