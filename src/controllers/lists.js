const Lists = class Lists {
  constructor(params) {
    this.el = document.querySelector('#app');
    this.params = params;
    this.run();
  }

  async render() {
    return `
    <a href="/list-film" class="btn btn-primary">Accueil</a>
    <div class="row">
       <a class="btn btn-primary" href="/watchlist">À Voir</a>
       <a class="btn btn-primary" href="/favorites">Mes Favoris</a>
       <a class="btn btn-primary" href="/seen">Déjà Vu</a>
    </div>
    `;
  }

  async run() {
    this.el.innerHTML = await this.render();
  }
};

export default Lists;
