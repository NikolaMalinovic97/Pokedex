import { autoinject } from 'aurelia-framework';

@autoinject()
export class StatIconCustomAttribute {
  constructor(private element: Element) { }

  valueChanged(newValue, oldValue) {
    const classList = this.element.classList;
    classList.add('fas');
    this.element.classList.add(this.getClass(newValue));
  }

  private getClass(statName) {
    switch (statName) {
      case 'speed':
        return 'fa-bolt';
      case 'special-defense':
        return 'fa-certificate';
      case 'special-attack':
        return 'fa-sun';
      case 'defense':
        return 'fa-shield-alt';
      case 'attack':
        return 'fa-hand-rock';
      case 'hp':
        return 'fa-heart';

      default:
        break;
    }
  }
}
