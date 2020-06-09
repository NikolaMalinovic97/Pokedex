import { autoinject } from 'aurelia-dependency-injection';
import { RouteService } from 'resources/services/route-service';

@autoinject
export class AuthFilterValueConverter {

  constructor(private routeService: RouteService) { }

  toView(value) {
    return value.filter(route => this.routeService.shouldRouteBeAccessible(route.config));
  }

  fromView(value) {
    //
  }
}
