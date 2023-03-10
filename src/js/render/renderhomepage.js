import { refs } from '../refs';
import ApiService from '../fetchservice';

import image from '../../images/logo.png';

const apiService = new ApiService();

export async function renderHomePage(trendingFilms) {
  let genres = await apiService.fetchGenre();

  const murkupHomePage = trendingFilms.map(
    ({ id, poster_path, title, original_title, genre_ids, release_date }) => {
      const filmGenres = genre_ids.map(id => {
        for (const genre of genres) {
          if (id === genre.id) {
            return genre.name;
          }
        }
      });

      return `<li class="library-item" data-id="${id}"><img
    class="film-poster"
    src="${checkPoster(poster_path)}"
    alt="${original_title}"/>
     <div>
        <p class="film-name">${title}</p>
        <p class="film-descr">
          ${filmGenres.join(', ')} | ${release_date.slice(0, 4)}
        </p>
      </div>
      
    </li>`;
    }
  );

  refs.mainLibrary.insertAdjacentHTML('beforeend', murkupHomePage.join(''));
}

import myImage2 from '../../images/logo.png';

function checkPoster(poster_path) {
  let poster = ``;
  if (poster_path) {
    return (poster = `https://image.tmdb.org/t/p/w300${poster_path}`);
  } else {
    return (poster = myImage2);
  }
}
