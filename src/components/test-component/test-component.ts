import { autoinject } from 'aurelia-framework';
import { ValidationControllerFactory, ValidationRules, validateTrigger } from 'aurelia-validation';

@autoinject
export class TestComponent {

  controller;
  todo = {
    title: '',
    name: ''
  };

  constructor(private controllerFactory: ValidationControllerFactory) {
    this.controller = this.controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.blur;
    ValidationRules
      .ensure('title').required().minLength(3).withMessage('Title must at least be 3 chars long.')
      .ensure('name').required()
      .on(this.todo);
  }

  submit() {
    this.controller.validate().then(result => {
      console.log(result);
    });
  }



}
