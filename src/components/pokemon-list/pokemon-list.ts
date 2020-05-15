import { autoinject } from 'aurelia-framework';
import { PokemonService } from 'resources/services/pokemon-service';
import {Router} from 'aurelia-router';

@autoinject
export class PokemonList {

  pokemon;
  lastPage: number;
  pokemonPerPage: number = 20;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  async attached() {
    const totalPokemonCount = await this.pokemonService.getTotalCount();
    this.lastPage = Math.ceil(totalPokemonCount / this.pokemonPerPage);
    this.pokemon = await this.pokemonService.getPokemon(0, this.pokemonPerPage);
  }

  async fetchPokemon(clickedPage) {
    const offset = --clickedPage * this.pokemonPerPage;
    this.pokemon = await this.pokemonService.getPokemon(offset, this.pokemonPerPage);
  }

  redirectToPokemonDetail(pokemonName: string) {
    this.router.navigate(`pokemon/${pokemonName}`);
  }
}
