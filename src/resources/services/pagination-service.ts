import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class PaginationService {

	pages = [1, 2, 3, 4, 5];
  activePage = 1;
	numberOfAllPokemon;

	constructor() { }

	setActivePage(activePage) {
    this.activePage = activePage;
  }

}