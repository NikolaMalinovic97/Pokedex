import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class Header {

  currentLocale: string;
  languages: object[];

  constructor(private router: Router, private i18n: I18N, private ea: EventAggregator) {
    this.languages = [
      { lang: 'English', locale:'en' },
      { lang: 'Bosanski', locale:'bs' }
    ]
  }

  attached() {
    const locale = this.i18n.getLocale();
    this.currentLocale = locale ? locale : 'en';
  }

  changeLanguage(locale: string) {
    if (locale === this.i18n.getLocale()) 
      return;
    this.ea.publish('setLanguage', locale);
    this.currentLocale = locale;
  }
}
