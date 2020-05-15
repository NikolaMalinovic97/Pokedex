import { autoinject } from 'aurelia-framework';
import { PokemonService } from 'resources/services/pokemon-service';

@autoinject
export class PokemonDetail {

  pokemon;

  constructor(private pokemonService: PokemonService) {
  }

  async activate(params) {  
    const pokemonName = params.name;
    this.pokemon = await this.pokemonService.getSinglePokemon(pokemonName);    
  }
}
