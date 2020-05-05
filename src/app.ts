import {autoinject} from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

@autoinject
export class App {

  constructor(private router: Router) {}

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Pokedex';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: ['', 'pokemon'], name: 'pokemon', moduleId: PLATFORM.moduleName("components/pokemon-list/pokemon-list"), title: 'Pokemon list', nav: true },
      { route: 'test', name: 'test', moduleId: PLATFORM.moduleName("components/test-component/test-component"), title: 'Test', nav: true },
      { route: '*path', name: 'home', moduleId: PLATFORM.moduleName("components/not-found/not-found.html") }
    ]);
  }
}
