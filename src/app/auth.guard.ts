import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/AuthService/auth.service';
import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('User is authenticated',authService.isAuthenticated());
    return true;
  } else {
    console.log('User is not authenticated, redirecting to login');
    router.navigate(['/login']);
    return false;
  }
};

