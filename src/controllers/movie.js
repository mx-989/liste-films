import axios from 'axios';
import Movies from '../views/movie';

const Movie = class Movie {
  constructor(data) {
    this.el = document.querySelector('#app');
    this.movies = [];
    this.reviews = [];
    this.params = data;
    this.run();
  }

  render() {
    return `
        <a href="/list-film" class="btn btn-primary">Home</a>
        <a href="/watchlist" class="btn btnwatch btn-primary">Watchlist</a>
        <div class="container-fluid">
            ${Movies(this.movies, this.reviews)}
        </div>
        `;
  }

  async search() {
    const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA0ZTEyNWQxYTRjZTczZGY3ZGQ2MDljYjUxMTFmYSIsIm5iZiI6MTczNjg0Mjk5My43MDIwMDAxLCJzdWIiOiI2Nzg2MWVmMWM4MWFjYWE2M2RiYzIyOWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZGNZAN_Svay8Dks8adkEH96nxPXj_VheEAi0F47E8kU');
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${this.params.id}`, {
        headers: { Authorization: AuthStr }, params: { language: 'fr-FR' }
      });
      this.movies = res.data;
      return this.movies;
    } catch (error) {
      return '';
    }
  }

  async review() {
    const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA0ZTEyNWQxYTRjZTczZGY3ZGQ2MDljYjUxMTFmYSIsIm5iZiI6MTczNjg0Mjk5My43MDIwMDAxLCJzdWIiOiI2Nzg2MWVmMWM4MWFjYWE2M2RiYzIyOWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZGNZAN_Svay8Dks8adkEH96nxPXj_VheEAi0F47E8kU');
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${this.params.id}/reviews`, {
        headers: { Authorization: AuthStr }
      });
      this.reviews = res.data;
      return this.reviews;
    } catch (error) {
      return '';
    }
  }

  async run() {
    await this.review();
    await this.search();
    this.el.innerHTML = this.render();
  }
};

export default Movie;
