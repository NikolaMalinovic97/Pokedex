import { SubData } from '../../resources/models/sub-data';
import { Package } from '../../resources/models/package';

export class Subscribe {

  subData: SubData;
  periodOptions: number[];
  packages: string[];

  constructor() {
    this.subData = new SubData;
    this.periodOptions = [1, 3, 6, 12];
    this.subData.period = this.periodOptions[0];
    this.packages = Object.values(Package);
    this.subData.package = Package.Bronze;
  }

  submit() {
    console.log(this.subData);
  }
}
