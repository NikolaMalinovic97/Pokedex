import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { EventAggregator } from 'aurelia-event-aggregator';
import { I18N } from 'aurelia-i18n';
import { autoinject } from 'aurelia-framework';

@autoinject
export class App {

  constructor(private ea: EventAggregator, private i18n: I18N, private router: Router) {}

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Pokedex';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: ['', 'test'], name: 'test', moduleId: PLATFORM.moduleName("components/test-component/test-component"), title: 'Test', nav: true },
      { route: 'pokemon', name: 'pokemon', moduleId: PLATFORM.moduleName("components/pokemon-list/pokemon-list"), title: 'Pokémon', nav: true },
      { route: 'pokemon/:name', name: 'pokemonDetail', moduleId: PLATFORM.moduleName("components/pokemon-detail/pokemon-detail"), title: 'Pokemon detail'},
      { route: 'subscribe', name: 'subscribe', moduleId: PLATFORM.moduleName("components/subscribe/subscribe"), title: 'Subscribe', nav: true },
      { route: '*path', name: 'home', moduleId: PLATFORM.moduleName("components/not-found/not-found.html") }
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
  }
}
