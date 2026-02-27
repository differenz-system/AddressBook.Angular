import { Routes } from '@angular/router';
import { authGuard } from './core/config/auth.guard';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.AUTH_ROUTES)
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component')
        .then(m => m.AboutComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component')
        .then(m => m.LayoutComponent),
    canActivate: [authGuard],   // 🔐 Protect everything inside
    children: [

      {
        path: 'welcome',
        loadComponent: () =>
          import('./features/welcome/welcome.component')
            .then(m => m.WelcomeComponent),
        data: { title: 'Welcome' }
      },

      {
        path: 'address-book',
        loadChildren: () =>
          import('./features/address-book/address-book.routes')
            .then(m => m.ADDRESS_BOOK_ROUTES),
        data: { title: 'Address Book' }
      },

      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
      }

    ]
  },
  // Default fallback
  {
    path: '**',
    redirectTo: 'login'
  }
];
