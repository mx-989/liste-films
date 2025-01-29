import './index.scss';
import Routeur from './router';
import ControllerListFilm from './controllers/homepage';
import Film from './controllers/movie';
import ControllerWatchList from './controllers/watchlist';
import ControllerLists from './controllers/lists';
import ControllerFavorites from './controllers/favorites';
import ControllerSeen from './controllers/seen';

global.API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTM5YTJhZTU1NGFmYWEzM2RmZGI3Y2FjMzVmMDg3YSIsIm5iZiI6MTczNjg0Njk4NS4wMTQwMDAyLCJzdWIiOiI2Nzg2MmU4OTYyZThmYTYyOWRiYjA2MDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.v2iGZi0NCaTVu9MFdtly5Yc3IP6uZLvfW6W5atLZcEE';

const routes = [{
  url: '/list-film',
  controller: ControllerListFilm
}, {
  url: '/film',
  controller: Film
}, {
  url: '/watchlist',
  controller: ControllerWatchList
}, {
  url: '/lists',
  controller: ControllerLists
}, {
  url: '/favorites',
  controller: ControllerFavorites
}, {
  url: '/seen',
  controller: ControllerSeen
}];

new Routeur(routes);
