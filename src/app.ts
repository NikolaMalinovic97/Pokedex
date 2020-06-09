import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { EventAggregator } from 'aurelia-event-aggregator';
import { I18N } from 'aurelia-i18n';
import { autoinject } from 'aurelia-framework';
import { UserRole } from 'resources/models/enum/user-role';

@autoinject
export class App {

  isLoading: boolean

  constructor(private ea: EventAggregator, private i18n: I18N, private router: Router) {
    this.isLoading = false;
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Pokedex';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName("components/home/home"), title: 'Home', nav: true },
      { route: 'test', name: 'test', moduleId: PLATFORM.moduleName("components/test-component/test-component"), title: 'Test', nav: true, roles: [UserRole.Admin] },
      { route: 'pokemon', name: 'pokemon', moduleId: PLATFORM.moduleName("components/pokemon-list/pokemon-list"), title: 'Pokémon', nav: true },
      { route: 'pokemon/:name', name: 'pokemonDetail', moduleId: PLATFORM.moduleName("components/pokemon-detail/pokemon-detail"), title: 'Pokemon detail' },
      { route: 'subscribe', name: 'subscribe', moduleId: PLATFORM.moduleName("components/subscribe/subscribe"), title: 'Subscribe', nav: true, roles: [UserRole.Admin, UserRole.User] },
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName("components/login/login"), title: 'Login', nav: true, onSigned: true },
      { route: '*path', name: 'notFound', moduleId: PLATFORM.moduleName("components/not-found/not-found.html") }
    ]);
  }

  attached() {    
    this.ea.subscribe('setLanguage', response => {
      this.i18n.setLocale(response);
      localStorage.setItem('language', response);      
    });
    this.ea.subscribe('setPokemonPerPage', response => {
      this.router.navigateToRoute('pokemon', { page: 1 }, { replace: true });
      localStorage.setItem('pokemonPerPage', response);
    });
    this.ea.subscribe('isLoading', response => {
      this.isLoading = response;
    });
  }
}
