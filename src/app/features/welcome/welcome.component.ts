import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    ...MATERIAL_MODULES
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  contact() {
    window.location.href = 'mailto:team@differenzsystem.com';
  }

  visitWebsite() {
    window.open('https://www.differenzsystem.com/', '_blank');
  }
}
