import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';
import { EventAggregator } from 'aurelia-event-aggregator';
import { UserService } from 'resources/services/user-service';
import { User } from 'resources/models/user';

@autoinject
export class Header {

  currentLocale: string;
  languages: object[];
  signedUser: User;

  constructor(private router: Router, private i18n: I18N, private ea: EventAggregator, private userService: UserService) {
    this.languages = [
      { lang: 'English', locale:'en' },
      { lang: 'Bosanski', locale:'bs' }
    ]
  }

  attached() {
    const locale = this.i18n.getLocale();
    this.currentLocale = locale ? locale : 'en';
    this.signedUser = this.userService.signedUser;
  }

  changeLanguage(locale: string) {
    if (locale === this.i18n.getLocale()) 
      return;
    this.ea.publish('setLanguage', locale);
    this.currentLocale = locale;
  }

  signOut() {
    this.userService.signOut();
    this.router.navigate('/login');
  }
}
