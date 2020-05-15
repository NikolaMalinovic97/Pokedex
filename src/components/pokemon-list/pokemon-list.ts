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
    const fetchedPokemon = await this.pokemonService.getPokemon(0);
    this.pokemon = fetchedPokemon;
  }

  metodaA() {
    console.log('bla bla');
    
  }

  async refreshData(clickedPage) {
    const offset = --clickedPage * this.pokemonPerPage;
    await this.pokemonService.getPokemon(offset).then((pokemon) => {
      this.pokemon = pokemon;
    });
  }
}
