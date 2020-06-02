import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';

@autoinject
export class Header {

  currentLocale: string;
  languages: object[];

  constructor(private router: Router, private i18n: I18N) {
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
    this.i18n.setLocale(locale);
    this.currentLocale = locale;
    localStorage.setItem('language', locale);
  }
}
