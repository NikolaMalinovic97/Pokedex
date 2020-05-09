export class PokenameValueConverter {

  nameSufix = ['o', 'z', 'm', 'f', 'oh', 'jr', 'null', 'mime']

  toView(value: string) {
    const words = value.split('-');
    let result = this.capitilizeFirstLetter(words[0]);
    for (let i=1; i < words.length; i++) {
      if (this.nameSufix.includes(words[i])) {
        result += ' ' + this.capitilizeFirstLetter(words[i]);
      }
      else {
        result += ' ' + this.surroundWithBrackets(words[i]);
      }
    }
    return result;
  }

  fromView(value) {
    //
  }

  private capitilizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  private surroundWithBrackets(word) {
    return `(${word})`;
  }
}
