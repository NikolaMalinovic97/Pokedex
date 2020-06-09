import { autoinject } from 'aurelia-dependency-injection';
import { UserService } from 'resources/services/user-service';
import { Router } from 'aurelia-router';
import * as Toastr from 'toastr';
import { I18N } from 'aurelia-i18n';
import { RouteService } from 'resources/services/route-service';

@autoinject
export class Login {

  username: string;
  password: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private routeService: RouteService,
    private i18n: I18N
  ) { }

  canActivate(params, routeConfig, navigationInstruction) {
    let isAccessible = this.routeService.shouldRouteBeAccessible(routeConfig);
    if (!isAccessible) {
      this.router.navigate('not-found');
    }
    return true;
  }

  signIn() {
    this.userService.signIn(this.username, this.password)
      .then(resolve => {
        if (resolve) {
          this.router.navigate('');
        } else {
          Toastr.error(this.i18n.tr('toastr.login.message'), this.i18n.tr('toastr.login.title'));
        }
      });
  }

  signInGoogle() {
    console.log('Sign in with Google');
  }

  signInFacebook() {
    console.log('Sign in with Facebook');
  }
}
