import { autoinject } from 'aurelia-framework';
import { PokemonService } from 'resources/services/pokemon-service';
import { PaginationService } from 'resources/services/pagination-service';

@autoinject
export class PokemonList {

  pokemon;
  lastPage;

  constructor(
    private pokemonService: PokemonService,
    private paginationService: PaginationService
  ) { }

  attached() {
    this.pokemonService.getTotalCount()
      .then(count => {
        this.lastPage = this.calculateNumberOfPages(count, 20);
      });
    this.pokemonService.getPokemon(0)
      .then(pokemon => {
        this.pokemon = pokemon;        
      });
  }

  calculateNumberOfPages(count, itemsPerPage) {
    return Math.ceil(count / itemsPerPage);
  }

  // onPageClick(pageNumber) {
  //   if (pageNumber === this.paginationService.activePage)
  //     return;
  //   this.paginationService.activePage = pageNumber;
  //   const offset = (pageNumber - 1) * 20;
  //   this.pokemonService.getPokemon(offset).then((pokemon) => {
  //     this.pokemon = pokemon;
  //   });
  // }

  test(clickedPage) {
    this.paginationService.activePage = clickedPage;
    const offset = (clickedPage - 1) * 20;
    this.pokemonService.getPokemon(offset).then((pokemon) => {
      this.pokemon = pokemon;
    });
  }
}
