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
        <a href="/lists" class="btn btnwatch btn-primary">Mes Listes</a>
        <div class="container-fluid">
            ${Movies(this.movies, this.reviews)}
        </div>
        `;
  }

  async search() {
    const AuthStr = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTM5YTJhZTU1NGFmYWEzM2RmZGI3Y2FjMzVmMDg3YSIsIm5iZiI6MTczNjg0Njk4NS4wMTQwMDAyLCJzdWIiOiI2Nzg2MmU4OTYyZThmYTYyOWRiYjA2MDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.v2iGZi0NCaTVu9MFdtly5Yc3IP6uZLvfW6W5atLZcEE';
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
    const AuthStr = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTM5YTJhZTU1NGFmYWEzM2RmZGI3Y2FjMzVmMDg3YSIsIm5iZiI6MTczNjg0Njk4NS4wMTQwMDAyLCJzdWIiOiI2Nzg2MmU4OTYyZThmYTYyOWRiYjA2MDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.v2iGZi0NCaTVu9MFdtly5Yc3IP6uZLvfW6W5atLZcEE';
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
