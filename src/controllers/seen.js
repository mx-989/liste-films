import ViewSeenList from '../views/ViewSeenList';

const SeenList = class SeenList {
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
        ${await ViewSeenList(this.movies)}
    </div>
    `;
  }

  Seen() {
    this.movies = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('seen-')) {
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

  deleteSeenList() {
    const seenbuttons = document.querySelectorAll('#seen');
    seenbuttons.forEach((button) => {
      button.addEventListener('click', async () => {
        const movieId = button.getAttribute('data-id');
        localStorage.removeItem(`seen-${movieId}`);
        this.movies = this.movies.filter((movie) => movie.id !== parseInt(movieId, 10));
        await this.run();
      });
    });
  }

  async run() {
    this.Seen();
    this.el.innerHTML = await this.render();
    this.deleteSeenList();
  }
};

export default SeenList;
