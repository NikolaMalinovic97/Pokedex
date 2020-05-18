import { autoinject } from 'aurelia-framework';
import { PokemonService } from 'resources/services/pokemon-service';  

@autoinject
export class PokemonList {

  pokemon;
  lastPage: number;
  pokemonPerPage: number;
  activePage: number;

  constructor(private pokemonService: PokemonService) {
    this.activePage = 1;
    this.pokemonPerPage = 5;
  }

  async attached() {
    const totalPokemonCount = await this.pokemonService.getTotalCount();
    this.lastPage = Math.ceil(totalPokemonCount / this.pokemonPerPage);
    this.pokemon = await this.pokemonService.getPokemon(0, this.pokemonPerPage);
  }

  async refreshData(activePage) {
    const offset = --activePage * this.pokemonPerPage;
    this.pokemon = await this.pokemonService.getPokemon(offset, this.pokemonPerPage);
  }

  async onPokemonPerPageChange() {
    const totalPokemonCount = await this.pokemonService.getTotalCount();
    this.lastPage = Math.ceil(totalPokemonCount / this.pokemonPerPage);
    this.activePage = 1;
    this.refreshData(1);
  }
}
