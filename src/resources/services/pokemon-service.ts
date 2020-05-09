import { autoinject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';
import { PaginationService } from './pagination-service';
import { AureliaConfiguration } from 'aurelia-configuration/dist/commonjs/aurelia-configuration';

@autoinject
export class PokemonService {

	numberOfAllPokemon;

	constructor(
		private httpClient: HttpClient,
		private paginationService: PaginationService,
		private config: AureliaConfiguration
	) { }

	getPokemon(offset: number) {
		return new Promise((resolve, reject) => {
			this.httpClient.fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
				.then(result => { return result.json(); })
				.then(data => {
					this.paginationService.pages = this.loadPages(data.count); //problematicno
					const pokemonUrlList = this.loadUrls(data);
					const promises = this.loadPromises(pokemonUrlList);
					Promise.all(promises).then(result => {
						resolve(this.loadPokemon(result));
					})
				})
		})
	}

	private loadPages(count) {
		const lastPage = Math.ceil(count / 20);
		if (this.paginationService.activePage <= 2) {
			return [1, 2, 3, 4, 5];
		}
		else if (this.paginationService.activePage >= lastPage - 1) {
			return [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
		}
		else {
			return [
				this.paginationService.activePage - 2,
				this.paginationService.activePage - 1,
				this.paginationService.activePage,
				this.paginationService.activePage + 1,
				this.paginationService.activePage + 2];
		}
	}

	private loadUrls(data) {
		const pokemonUrlList = [];
		data.results.forEach(pokemon => {
			pokemonUrlList.push(pokemon.url);
		});
		return pokemonUrlList;
	}

	private loadPromises(urls) {
		const promises = [];
		urls.forEach(url => {
			promises.push(this.httpClient.fetch(url).then(res => res.json()));
		});
		return promises;
	}

	private loadPokemon(result) {
		const pokemon = result.map(data => ({
			id: data.id,
			name: data.name,
			image: data.sprites['front_default'],
			type: data.types.map(type => type.type.name)
		}));		
		return pokemon;
	}
}