import { autoinject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';
import { AureliaConfiguration } from 'aurelia-configuration/dist/commonjs/aurelia-configuration';

@autoinject
export class PokemonService {

	url = 'https://pokeapi.co/api/v2';

	constructor(
		private httpClient: HttpClient,
		private config: AureliaConfiguration
	) { }

	async getTotalCount() {
		const result = await this.httpClient.fetch(`${this.url}/pokemon/?offset=0&limit=1`);
		const data = await result.json();
		return data.count;
	}

	async getPokemon(offset: number, limit: number) {
		const result = await this.httpClient.fetch(`${this.url}/pokemon?offset=${offset}&limit=${limit}`);
		const data = await result.json();
		const pokemonUrlList = this.loadUrls(data);
		const promises = this.loadPromises(pokemonUrlList);
		const promisesResult = await Promise.all(promises);
		return this.loadPokemon(promisesResult);
	}

	async getSinglePokemon(pokemonName) {
		const result = await this.httpClient.fetch(`${this.url}/pokemon/${pokemonName}`);
		const data = await result.json();		
		return this.loadSinglePokemon(data);
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
			type: data.types.reverse().map(type => type.type.name)
		}));
		return pokemon;
	}

	private async loadSinglePokemon(data) {	
		return {
			id: data.id,
			name: data.name,
			image: data.sprites['front_default'],
			type: data.types.reverse().map(type => type.type.name),
			stats: data.stats.map(stat => ({name: stat.stat.name, value: stat.base_stat})),
			description: await this.loadDescription(data)
		}
	}

	private async loadDescription(input) {
		const result = await this.httpClient.fetch(input.species.url);
		const data = await result.json();
		const description = data.flavor_text_entries.find(text => {
			return text.language.name === 'en'
		});
		return description.flavor_text;
	}
}