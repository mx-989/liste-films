import './index.scss';
import Error404 from './controllers/error404';

const Router = class Router {
  constructor(routes = []) {
    this.routes = routes;
    this.path = window.location.pathname;
    this.params = !window.location.search ? {} : Object.fromEntries(window.location.search.split('?')[1].split('&').map((param) => param.split('=')));
    this.run();
  }

  startController() {
    for (let i = 0; i < this.routes.length; i += 1) {
      const route = this.routes[i];
      if (this.path === '/') {
        window.location.pathname = '/list-film';
        return;
      }
      if (this.path === route.url) {
        const Controller = route.controller;
        new Controller(this.params);
        return;
      }
    }
    new Error404();
  }

  run() {
    this.startController();
  }
};

export default Router;
