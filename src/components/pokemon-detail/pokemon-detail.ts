import { autoinject } from 'aurelia-framework';
import { PokemonService } from 'resources/services/pokemon-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class PokemonDetail {

  pokemon;
  pokemonName;

  constructor(private pokemonService: PokemonService, private ea: EventAggregator) {
  }

  async activate(params) {
    this.ea.publish('isLoading', true);
    this.pokemonName = params.name;
  }

  async attached() {
    this.pokemon = await this.pokemonService.getSinglePokemon(this.pokemonName);
    this.ea.publish('isLoading', false);
  }
}
