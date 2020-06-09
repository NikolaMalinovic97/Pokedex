import { autoinject } from 'aurelia-dependency-injection';
import { UserService } from './user-service';

@autoinject
export class RouteService {

  constructor(private userService: UserService) { }

  shouldRouteBeAccessible(config): boolean {
    const onSigned = config.onSigned;
    const routeRoles = config.roles;
    if (onSigned && this.userService.isSignedIn()) 
      return false;
    if (!routeRoles)
      return true;
    return this.userService.isSignedIn() && routeRoles.includes(this.userService.signedUser.role);
  }
}