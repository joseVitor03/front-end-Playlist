import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import userContext from '../../context/user.context';
import { ListFilms, Director } from '../../type';
import styles from './user.module.css';

function User() {
  const api = import.meta.env.VITE_MY_API;
  const { resultLogin } = useContext(userContext);
  const [films, setFilms] = useState<ListFilms[]>([]);
  const [favoriteFilms, setFavoriteFilms] = useState<
  ListFilms[]>([]);
  const navigate = useNavigate();

  const addOrRemoveFilmList = async (filmId: number, film: ListFilms) => {
    if (favoriteFilms.find((movie) => movie.id === filmId)) {
      await axios.post(
        `${api}/user/removeFilms`,
        { filmId, userId: resultLogin.userId },
        { headers: { Authorization: `Bearer ${resultLogin.token}` } },
      );
      const newList = favoriteFilms.filter((fav) => fav.id !== filmId);
      console.log(newList);
      setFavoriteFilms(newList);
    } else {
      await axios.post(`${api}/user/films`, {
        filmId, userId: resultLogin.userId,
      }, { headers: { Authorization: `Bearer ${resultLogin.token}` } });
      setFavoriteFilms([...favoriteFilms, film]);
    }
  };

  useEffect(() => {
    const render = async () => {
      try {
        const response = await axios.get(`${api}/user/allfilms`, {
          headers: { Authorization: `Bearer ${resultLogin.token}` },
        });
        const listFilmsUser = await axios.post<ListFilms[]>(`
        ${api}/user/filmsUser`, { userId: resultLogin.userId }, {
          headers: { Authorization: `Bearer ${resultLogin.token}` },
        });
        setFavoriteFilms(listFilmsUser.data);
        setFilms(response.data);
      } catch (error: any) {
        Swal.fire({
          title: 'Login Expirado!',
          text: 'Login expirado. Faça o login novamente.',
          timer: 3000,
          icon: 'warning',
        });
        navigate('/login');
      }
    };

    render();
  }, []);

  return (
    <main>
      <header className={ styles.header }>
        <h2>Playlist Films</h2>
        <button
          onClick={ () => navigate('/playlistUser') }
          className={ styles.btn }
        >
          Sua Playlist
        </button>
      </header>
      <section className={ styles.container }>
        { films && films.map((film) => (
          <div className={ styles.card } key={ film.id }>
            <img src={ film.poster } alt={ `poster filme ${film.name}` } />
            <h3>{film.name}</h3>
            { film.directors.map((director: Director) => (
              <p key={ director.id }>{director.name}</p>
            ))}
            <button onClick={ () => addOrRemoveFilmList(film.id, film) }>
              {favoriteFilms.some((fav) => fav.id === film.id)
                ? 'Remover da Playlist' : 'Adicionar' }

            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default User;
