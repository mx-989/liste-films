import ViewWatchList from '../views/ViewWatchList';

const WatchList = class WatchList {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.params = params;
    this.movies = [];
    this.run();
  }

  async render() {
    return `
    <a href="/list-film" class="btn btn-primary">Acceuil</a>
    <a href="/lists" class="btn btn-primary">Mes Listes</a>
    <div class="row">
        ${await ViewWatchList(this.movies)}
    </div>
    `;
  }

  WatchList() {
    this.movies = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('watchlist-')) {
        try {
          const movie = JSON.parse(localStorage.getItem(key));
          if (movie) {
            this.movies.push(movie);
          }
        } catch (error) {
          localStorage.removeItem(key);
        }
      }
    });
  }

  deleteWatchList() {
    const watchlistButtons = document.querySelectorAll('#watchlist');
    watchlistButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        const movieId = button.getAttribute('data-id');
        localStorage.removeItem(`watchlist-${movieId}`);
        this.movies = this.movies.filter((movie) => movie.id !== parseInt(movieId, 10));
        await this.run();
      });
    });
  }

  async run() {
    this.WatchList();
    this.el.innerHTML = await this.render();
    this.deleteWatchList();
  }
};

export default WatchList;
