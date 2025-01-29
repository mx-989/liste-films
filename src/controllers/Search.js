import axios from 'axios';
import ViewFilms from '../views/film';

const Nav = class Nav {
  constructor(data, params) {
    this.el = document.querySelector('#app');
    this.movies = data;
    this.params = params;
    this.run();
  }

  navbar() {
    const nav = document.querySelector('.navbar');
    const searchBar = nav.querySelector('#searchBar');
    searchBar.addEventListener('keyup', async () => {
      const value = searchBar.value.toLowerCase();
      if (value === '') {
        this.title = document.querySelector('.title h1');
        this.container = document.querySelector('.container-fluid');
        this.title.innerHTML = 'Popular Movies';
        this.container.innerHTML = ViewFilms(this.movies);
        this.modalOpener();
      } else {
        const movies = await this.search(value);
        const filterMovies = movies.filter((m) => m.title.toLowerCase().includes(value));
        this.title = document.querySelector('.title h1');
        this.container = document.querySelector('.container-fluid');
        this.title.innerHTML = 'Resulats';
        this.container.innerHTML = ViewFilms(filterMovies);
        this.modalOpener();
      }
    });
  }

  createModal(movieId) {
    if (document.querySelector('.modal')) {
      return;
    }
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" style="cursor: pointer; float: right;">&times;</span>
            <h2>Ajouter à la liste</h2>
            <button id="watchlist-button" data-id="${movieId}">A Voir</button>
            <button id="favorites-button" data-id="${movieId}">Favoris</button>
            <button id="seen-button" data-id="${movieId}">Déjà Vu</button>
        </div>
    `;
    document.body.appendChild(modal);
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      modal.remove();
    });
    const overlay = document.createElement('div');

    closeButton.addEventListener('click', () => {
      modal.remove();
      overlay.remove();
    });

    const watchlistButton = modal.querySelector('#watchlist-button');
    const favoritesButton = modal.querySelector('#favorites-button');
    const seenButton = modal.querySelector('#seen-button');

    watchlistButton.addEventListener('click', () => {
      localStorage.setItem(`watchlist-${movieId}`, movieId);
      modal.remove();
      overlay.remove();
    });

    favoritesButton.addEventListener('click', () => {
      localStorage.setItem(`favorites-${movieId}`, movieId);
      modal.remove();
      overlay.remove();
    });

    seenButton.addEventListener('click', () => {
      localStorage.setItem(`seen-${movieId}`, movieId);
      modal.remove();
      overlay.remove();
    });
  }

  modalOpener() {
    const modalbutton = document.querySelectorAll('.modalopener-btn');
    modalbutton.forEach((Button) => {
      Button.addEventListener('click', () => {
        const movieId = Button.getAttribute('data-id');
        this.createModal(movieId);
      });
    });
  }

  async search(film) {
    const AuthStr = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTM5YTJhZTU1NGFmYWEzM2RmZGI3Y2FjMzVmMDg3YSIsIm5iZiI6MTczNjg0Njk4NS4wMTQwMDAyLCJzdWIiOiI2Nzg2MmU4OTYyZThmYTYyOWRiYjA2MDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.v2iGZi0NCaTVu9MFdtly5Yc3IP6uZLvfW6W5atLZcEE';
    try {
      const res = await axios
        .get(`https://api.themoviedb.org/3/search/movie?query=${film}`, {
          headers: { Authorization: AuthStr }, params: { language: 'fr-FR' }
        });
      return res.data.results;
    } catch (error) {
      return [];
    }
  }

  run() {
    this.navbar();
    this.modalOpener();
  }
};

export default Nav;
