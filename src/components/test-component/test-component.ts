import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { RouteService } from 'resources/services/route-service';
import { Router } from 'aurelia-router';

@autoinject
export class TestComponent {

  constructor(private i18n: I18N, private routeService: RouteService, private router: Router) {
  }

  canActivate(params, routeConfig, navigationInstruction) {
    let isAccessible = this.routeService.shouldRouteBeAccessible(routeConfig);
    if (!isAccessible) {
      this.router.navigate('not-found');
    }
    return true;
  }
}
