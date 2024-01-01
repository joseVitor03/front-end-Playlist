import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import userContext from '../../context/user.context';
import { ListFilms, Director } from '../../type';
import styles from './playlistUser.module.css';

function PlaylistUser() {
  const api = import.meta.env.VITE_MY_API;
  const { resultLogin } = useContext(userContext);
  const navigate = useNavigate();
  const [myFilms, setMyFilms] = useState<ListFilms[]>([]);

  const removeFilm = async (filmId: number) => {
    try {
      await axios.post(
        `${api}/user/removeFilms`,
        { userId: resultLogin.userId, filmId },

        {
          headers: { Authorization: `Bearer ${resultLogin.token}` },
        },
      );
      setMyFilms(myFilms.filter((film) => film.id !== filmId));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'erro na remoção',
        text: 'tente novamente',
      });
    }
  };

  useEffect(() => {
    const render = async () => {
      try {
        const response = await axios.post(
          `${api}/user/filmsUser`,
          { userId: resultLogin.userId },
          { headers: { Authorization: `Bearer ${resultLogin.token}` } },
        );
        setMyFilms(response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'erro de busca',
          text: 'insira novamente seus dados',
        });
        navigate('/login');
      }
    };
    render();
  }, []);

  return (
    <main className={ styles.main }>
      <header className={ styles.header }>
        <h2>Playlist Films</h2>
        <button onClick={ () => navigate('/user') }>Lista de Filmes</button>
      </header>
      <section className={ styles.containerPlaylist }>
        { myFilms.length > 0 ? (
          <>
            { myFilms.map((film: ListFilms) => (
              <div className={ styles.cardPlaylistUser } key={ film.id }>
                <img src={ film.poster } alt={ `poster do filme ${film.name}` } />
                <h3>{ film.name }</h3>
                { film.directors.map(({ name, id }: Director) => (
                  <p key={ id }>{ name }</p>
                ))}
                <button onClick={ () => removeFilm(film.id) }>Remover Filme</button>
              </div>
            ))}
          </>) : <h2>Nenhum Filme Adicionado.</h2> }
      </section>
    </main>
  );
}

export default PlaylistUser;
