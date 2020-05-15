import { autoinject } from 'aurelia-framework';
import { PokemonService } from 'resources/services/pokemon-service';  

@autoinject
export class PokemonList {

  pokemon;
  lastPage: number;
  pokemonPerPage: number = 20;

  constructor(private pokemonService: PokemonService) { }

  async attached() {
    const totalPokemonCount = await this.pokemonService.getTotalCount();
    this.lastPage = Math.ceil(totalPokemonCount / this.pokemonPerPage);
    this.pokemon = await this.pokemonService.getPokemon(0, this.pokemonPerPage);
  }

  async refreshData(activePage) {
    const offset = --activePage * this.pokemonPerPage;
    this.pokemon = await this.pokemonService.getPokemon(offset, this.pokemonPerPage);
  }
}
