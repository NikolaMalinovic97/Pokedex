import { autoinject } from 'aurelia-framework';

@autoinject()
export class PoketypeColorCustomAttribute {

  constructor(private element: Element) { }

  valueChanged(newValue, oldValue) {
    const type = newValue;
    const background = this.getBackgroundColor(type);
    const oldStyle = this.element.getAttribute("style");
    this.element.setAttribute("style", `${oldStyle !== null ? oldStyle : ''} background-color: ${background}; color: #f0f0f0;`);
  }

  private getBackgroundColor(type) {
    switch (type) {
      case 'normal':
        return '#A8A878';
      case 'fire':
        return '#F08030';
      case 'water':
        return '#6890F0';
      case 'electric':
        return '#F8D030';
      case 'grass':
        return '#78C850';
      case 'ice':
        return '#98D8D8';
      case 'ground':
        return '#E0C068';
      case 'flying':
        return '#A890F0';
      case 'ghost':
        return '#705898';
      case 'rock':
        return '#B8A038';
      case 'fighting':
        return '#C03028';
      case 'poison':
        return '#A040A0';
      case 'psychic':
        return '#F85888';
      case 'bug':
        return '#A8B820';
      case 'dark':
        return '#705848';
      case 'steel':
        return '#B8B8D0';
      case 'dragon':
        return '#7038F8';
      case 'fairy':
        return '#EE99AC';
      default:
        return 'black';
    }
  }
}
