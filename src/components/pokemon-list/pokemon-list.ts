import { autoinject } from 'aurelia-framework';
import { PokemonService } from 'resources/services/pokemon-service';
import { PaginationService } from 'resources/services/pagination-service';

@autoinject
export class PokemonList {

  pokemon;

  constructor(
    private pokemonService: PokemonService,
    private paginationService: PaginationService
  ) { }

  attached() {
    this.pokemonService.getPokemon(0)
      .then((pokemon) => {
        this.pokemon = pokemon;        
      });
  }

  onPageClick(pageNumber) {
    if (pageNumber === this.paginationService.activePage)
      return;
    this.paginationService.activePage = pageNumber;
    const offset = (pageNumber - 1) * 20;
    this.pokemonService.getPokemon(offset).then((pokemon) => {
      this.pokemon = pokemon;
    });
  }
}
