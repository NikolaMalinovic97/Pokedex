import { autoinject } from 'aurelia-framework';

@autoinject()
export class ProgressbarValueCustomAttribute {
  constructor(private element: Element) { }

  valueChanged(newValue, oldValue) {
    const width = this.calculatePercentage(newValue);
    const background = this.getBackgroundColor(newValue);
    const oldStyle = this.element.getAttribute("style");
    this.element.setAttribute("style", `${oldStyle !== null ? oldStyle : ''} background-color: ${background}; color: white; width: ${width}%`);
  }

  private calculatePercentage(value) {
    const maxValue = 180;
    return value / maxValue * 100;
  }

  private getBackgroundColor(value) {
    if (value < 60)
      return '#32a840';
    if (value < 100)
      return '#e8ca00';
    if (value < 150)
      return '#ff7b00';
    else
      return '#ff0000';
  }
}
