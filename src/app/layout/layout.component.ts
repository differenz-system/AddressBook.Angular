import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from '../shared/material.module';
import { filter, map } from 'rxjs';
import { AuthService } from '../features/auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ...MATERIAL_MODULES
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  pageTitle = '';
  isSidebarOpen = true;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd =>
          event instanceof NavigationEnd
        ),
        map(() => {
          let currentRoute = this.route;

          while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          }

          return currentRoute.snapshot.data['title'] as string;
        })
      )
      .subscribe((title) => {
        this.pageTitle = title || 'Dashboard';
      });

  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    console.log('Logout clicked');
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}