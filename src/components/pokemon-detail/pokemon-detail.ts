import { autoinject } from 'aurelia-framework';
import { PokemonService } from 'resources/services/pokemon-service';

@autoinject
export class PokemonDetail {

  pokemon;
  pokemonName;
  isLoading: boolean;

  constructor(private pokemonService: PokemonService) {
  }

  async activate(params) {
    this.isLoading = true;
    this.pokemonName = params.name;
  }

  async attached() {
    this.pokemon = await this.pokemonService.getSinglePokemon(this.pokemonName);
    this.isLoading = false;
  }
}
