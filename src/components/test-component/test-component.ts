import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';

@autoinject
export class TestComponent {

  constructor(private i18n: I18N) {
  }

}
