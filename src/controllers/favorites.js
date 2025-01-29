import ViewFavoritesList from '../views/ViewFavoritesList';

const FavoritesList = class FavoritesList {
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
        ${await ViewFavoritesList(this.movies)}
    </div>
    `;
  }

  Favorites() {
    this.movies = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('favorites-')) {
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

  deleteFavoritesList() {
    const favoritesbuttons = document.querySelectorAll('#favorites');
    favoritesbuttons.forEach((button) => {
      button.addEventListener('click', async () => {
        const movieId = button.getAttribute('data-id');
        localStorage.removeItem(`favorites-${movieId}`);
        this.movies = this.movies.filter((movie) => movie.id !== parseInt(movieId, 10));
        await this.run();
      });
    });
  }

  async run() {
    this.Favorites();
    this.el.innerHTML = await this.render();
    this.deleteFavoritesList();
  }
};

export default FavoritesList;
