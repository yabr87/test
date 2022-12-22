import { fetchTrendingMovies } from './fetchAPI';
import { createMovieCards } from './moviesMarkup';
import { paginationOptions } from './pagination-options';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const moviesContainer = document.querySelector('.movies');

async function trendingMovies() {
  const res = await fetchTrendingMovies();
  moviesContainer.innerHTML = createMovieCards(res.results);

  console.log('res: ', res);

  const pagination = new Pagination('pagination', paginationOptions(res.total_results));

  pagination.on('afterMove', ({ page }) => {
    fetchTrendingMovies(page).then(res => {
      moviesContainer.innerHTML = createMovieCards(res.results);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}
trendingMovies();
