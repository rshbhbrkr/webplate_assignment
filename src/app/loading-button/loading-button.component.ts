import { CommonModule } from '@angular/common';


import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-button',
  standalone: true,
  imports: [CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './loading-button.component.html',
  styleUrl: './loading-button.component.scss'
})
export class LoadingButtonComponent {
  @Input() isLoading: boolean = false;
}
