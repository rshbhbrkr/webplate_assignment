import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userData: any;

  constructor(private authService: AuthService, public titleService: Title
    ) {
      this.titleService.setTitle("PROFILE - WEBPLAT");
    }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userData = user;
  }
}

