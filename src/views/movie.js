const movie = (data) => `
    <div class="colonne">
      <div class="cardmovie" style="margin-top: 20px;">
        <img src="${data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://placehold.co/200x300?text=No+image'}" class="card-img-top" alt="pas d'image">
        <div class="cardmoviebody">
          <h5 class="cardmovietitle">${data.title}</h5>
          <div class="content">
          <h5>Sorti en ${new Date(data.release_date).getFullYear()}</h5>
          <h5>Note Moyenne : ${data.vote_average} / 10</h5>
          </div> 
        </div>
      </div>
    </div>`;

export default (movies, reviews) => `
  <div class='row'>
    ${movie(movies)}
    <div class="synopsis">
    <h1>Synopsis : </h1>
    <h5>${movies.overview}</h5>
    </div>
    <div class="reviews">
    <h1>Critiques et Avis : </h1>
      ${reviews.results.slice(0, 4).map((review) => `
      <div class="review">
        <h3>${review.author}</h3>
        <p>${review.content}</p>
      </div>
      `).join('')}
    </div>
  </div>
  `;
