const Error404 = class Error404 {
  constructor() {
    this.el = document.querySelector('#app');
    this.run();
  }

  render() {
    return `
    <h1> Error 404 </h1>
    `;
  }

  run() {
    this.el.innerHTML = this.render();
  }
};

export default Error404;
