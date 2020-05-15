export class PctCalcValueConverter {

  toView(value) {
    const maxValue = 180;
    return value / maxValue * 100;
  }
}
