import { SubData } from '../../resources/models/sub-data';
import { Package } from '../../resources/models/package';
import { autoinject } from 'aurelia-framework';
import { ValidationControllerFactory, ValidationRules, validateTrigger } from 'aurelia-validation';

@autoinject
export class Subscribe {

  subData: SubData;
  periodOptions: number[];
  packages: string[];
  controller;

  constructor(private controllerFactory: ValidationControllerFactory) {
    this.subData = new SubData;
    this.periodOptions = [1, 3, 6, 12];
    this.subData.period = this.periodOptions[0];
    this.packages = Object.values(Package);
    this.subData.package = Package.Bronze;
    this.controller = this.controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.blur;
    const onlyNumbers = /^\d+$/;
    ValidationRules
      .ensure('name')
        .required().withMessage('Name is required.')
        .maxLength(25).withMessage('Name must have less than 26 characters.')
      .ensure('email')
        .required().withMessage('Email is required.')
        .email().withMessage('Enter valid email.')
      .ensure('phone')
        .required().withMessage('Phone number is required.')
        .maxLength(20).withMessage('Phone must have less than 21 characters.')
        .matches(onlyNumbers).withMessage('Phone number can contain numbers only.')
      .on(this.subData);
  }

  submit() {
    // console.log(this.subData);
    this.controller.validate().then(result => {
      if (result.valid) {
        console.log('Result is Valid');
        // Add confirm dialog
      }
      else {
        console.log('Result is Invalid');
        // Add Toastr Warning
      }
    });
  }
}
