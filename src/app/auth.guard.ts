import { CanActivateFn } from '@angular/router';
import { ConnectionService } from './connection.service';
import { GotoService } from './goto.service';

export function createAuthGuard(connectServ: ConnectionService, goto: GotoService): CanActivateFn {
  return (route, state) => {
    const path = route.routeConfig ? route.routeConfig.path : '';
  
    if (path === 'students' || path === 'signin' || path === 'edit') {
      const isAuthenticated = connectServ.retrieveAccount() ? true : false;
  
      if (!isAuthenticated) {
        console.log("User is not authenticated");
        goto.goToLoginPage();
        return false;
      }
    }
  
    return true;
  };
}
