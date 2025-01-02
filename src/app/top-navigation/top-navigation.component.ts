import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.scss'
})
export class TopNavigationComponent implements OnInit {
  userData: any = {};
  isMenuOpen: boolean = false; // Mobile menu state
  isProfileMenuOpen: boolean = false; // Profile menu initially closed

  constructor(private router: Router) {}

  ngOnInit(): void {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userData = user;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
