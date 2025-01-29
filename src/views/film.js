const movie = (data) => `
<div class="colonne">
    <div class="card" style="margin-top: 20px;">
      <img src="${data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://placehold.co/200x300?text=No+image'}" class="card-img-top" alt="pas d'image">
      <div class="cardbody">
        <h5 class="cardtitle">${data.title}</h5>
        <a href="/film?id=${data.id}">Voir les détails</a>
        <button class="button modalopener-btn" data-id="${data.id}">Ajouter à ma liste</button>
      </div>
    </div>
  </div>`;

export default (movies) => `
    <div class='row'>
        ${movies.map((data) => (movie(data))).join('')}
    </div>
`;
