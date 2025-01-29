import axios from 'axios';

const movie = (data) => `
<div class="colonne">
    <div class="card" style="margin-top: 20px;">
      <img src="${data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://placehold.co/200x300?text=No+image'}" class="card-img-top" alt="pas d'image">
      <div class="cardbody">
        <h5 class="cardtitle">${data.title}</h5>
        <a href="/film?id=${data.id}">Voir les détails</a>
        <button class="btn btn-primary" id="favorites" data-id="${data.id}">Supprimer de ma liste</button>
      </div>
    </div>
  </div>`;

export default async (datas) => {
  const AuthStr = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTM5YTJhZTU1NGFmYWEzM2RmZGI3Y2FjMzVmMDg3YSIsIm5iZiI6MTczNjg0Njk4NS4wMTQwMDAyLCJzdWIiOiI2Nzg2MmU4OTYyZThmYTYyOWRiYjA2MDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.v2iGZi0NCaTVu9MFdtly5Yc3IP6uZLvfW6W5atLZcEE';
  const moviePromises = datas.map(async (movie_id) => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}`, {
        headers: { Authorization: AuthStr }, params: { language: 'fr-FR' }
      });
      return movie(res.data);
    } catch (error) {
      return '';
    }
  });
  const moviesHTML = await Promise.all(moviePromises);
  return moviesHTML.join('');
};
