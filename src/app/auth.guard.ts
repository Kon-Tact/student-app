import { CanActivateFn } from '@angular/router';
import { GotoService } from './goto.service';

export function createAuthGuard(goto: GotoService): CanActivateFn {
  return (route) => {
    const path = route.routeConfig ? route.routeConfig.path : '';
  
    if (path === 'students' || path === 'signin' || path === 'edit' || path === 'accounts') {
      const isAuthenticated = localStorage.getItem("connectedAccount") ? true : false;
  
      if (!isAuthenticated) {
        goto.goToLoginPage();
        return false;
      }
    }
  
    return true;
  };
}
