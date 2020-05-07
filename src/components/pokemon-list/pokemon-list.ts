import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { AureliaConfiguration } from 'aurelia-configuration';
import { url } from 'inspector';

@autoinject
export class PokemonList {

  pokemon;
  pages = [1, 2, 3, 4, 5];
  activePage = 1;
  previousPage = null;
  nextPage = null;

  constructor(private config: AureliaConfiguration, private httpClient: HttpClient) { }

  attached() {
    this.getPokemon(0).then((pokemon) => {
      this.pokemon = pokemon;
    });
  }

  getPokemon(offset: number) {
    return new Promise((resolve, reject) => {
      this.httpClient.fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
      .then(result => { return result.json(); })
      .then(data => {

        const numberOfAllPokemon = data.count;
        const lastPage = Math.ceil(numberOfAllPokemon / 20);
        if (this.activePage <= 2) {
          this.pages = [1, 2, 3, 4, 5];
        } 
        else if (this.activePage >= lastPage-1) {
          this.pages = [lastPage-4, lastPage-3, lastPage-2, lastPage-1, lastPage];
        }
        else {
          this.pages = [this.activePage-2, this.activePage-1, this.activePage, this.activePage+1, this.activePage+2];
        }
        
        


        const pokemonUrlList = this.loadUrls(data);
        const promises = this.loadPromises(pokemonUrlList);
        Promise.all(promises).then(result => {
          resolve(this.loadPokemon(result));
        })
      })
    })
  }

  // getPokemon(offset: number) {
  //   this.httpClient.fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
  //     .then(result => { return result.json(); })
  //     .then(data => {

  //       const numberOfAllPokemon = data.count;
  //       const lastPage = Math.ceil(numberOfAllPokemon / 20);
  //       if (this.activePage <= 2) {
  //         this.pages = [1, 2, 3, 4, 5];
  //       } 
  //       else if (this.activePage >= lastPage-1) {
  //         this.pages = [lastPage-4, lastPage-3, lastPage-2, lastPage-1, lastPage];
  //       }
  //       else {
  //         this.pages = [this.activePage-2, this.activePage-1, this.activePage, this.activePage+1, this.activePage+2];
  //       }
        
        


  //       const pokemonUrlList = this.loadUrls(data);
  //       const promises = this.loadPromises(pokemonUrlList);
  //       Promise.all(promises).then(result => {
  //         this.pokemon = this.loadPokemon(result);
  //       })
  //     })
  // }

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

  onPageClick(pageNumber) {
    if (pageNumber === this.activePage)
      return;
    this.activePage = pageNumber;
    const offset = (this.activePage - 1) * 20;    
    this.getPokemon(offset).then((pokemon) => {
      this.pokemon = pokemon;
    });
  }
}
