import {autoinject, bindable} from 'aurelia-framework';

@autoinject()
export class PokeBackgroundCustomAttribute {

  constructor(private element: Element) { }

  valueChanged(newValue, oldValue) {
    const oldStyle = this.element.getAttribute("style");    
    this.element.setAttribute("style",
      `${oldStyle !== null ? oldStyle : ''} 
      background-image: url('/img/card-background/${newValue}.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;`);
  }
}
