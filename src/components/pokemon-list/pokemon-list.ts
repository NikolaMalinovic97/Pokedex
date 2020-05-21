import { autoinject } from 'aurelia-framework';
import { PokemonService } from 'resources/services/pokemon-service';
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';

@autoinject
export class PokemonList {

  pokemon: [];
  pokemonPerPage: number;
  activePage: number;
  lastPage: number;
  isLoading: boolean;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  async activate(params) {
    this.isLoading = true;
    this.pokemonPerPage = this.getPokemonPerPage();
    this.lastPage = await this.getLastPage();
    this.handlePageParam(params.page);
  }

  async attached() {
    this.pokemon = await this.getPokemon(this.activePage);
    this.isLoading = false;
  }

  private getPokemonPerPage() {
    const pokemonPerPage = localStorage.getItem('pokemonPerPage');
    return pokemonPerPage ? +pokemonPerPage : 20;
  }

  private async getLastPage() {
    const totalPokemonCount = await this.pokemonService.getTotalCount();
    return Math.ceil(totalPokemonCount / this.pokemonPerPage);
  }

  private handlePageParam(pageParam) {
    if (isNaN(pageParam) || pageParam < 1 || pageParam > this.lastPage) {
      this.router.navigateToRoute('pokemon', { page: 1 }, { replace: true });
    } else {
      this.activePage = +pageParam;
    }
  }

  private getPokemon(activePage) {
    const offset = --activePage * this.pokemonPerPage;
    return this.pokemonService.getPokemon(offset, this.pokemonPerPage);
  }

  pageChanged(page) {
    this.router.navigateToRoute('pokemon', { page: page }, { replace: true });
  }

  private onPokemonPerPageChange() {
    localStorage.setItem('pokemonPerPage', this.pokemonPerPage.toString());
    this.router.navigateToRoute('pokemon', { page: 1 }, { replace: true });
  }
}
