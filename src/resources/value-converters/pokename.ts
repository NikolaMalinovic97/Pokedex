export class PokenameValueConverter {

  toView(value: string) {
    const words = value.split('-');
    let result = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    for (let i=1; i<words.length; i++) {
      if (words[i] === 'jr' || words[i] === 'm' || words[i] === 'f') {
        result += ' ' + words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
      else {
        result += ' (' + words[i] + ')';
      }
    }
    return result;
  }

  fromView(value) {
    //
  }
}
