import {autoinject, bindable} from 'aurelia-framework';

@autoinject()
export class PokeBackgroundCustomAttribute {

  constructor(private element: Element) { }

  valueChanged(newValue, oldValue) {
    this.element.setAttribute("style",
      `background-image: url('/img/card-background/${newValue}.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;`);
  }
}
