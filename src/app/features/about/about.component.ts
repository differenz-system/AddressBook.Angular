import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-about',
    imports: [
        CommonModule,
        RouterModule,
        ...MATERIAL_MODULES
    ],
    standalone: true,
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  contact() {
    window.location.href = 'mailto:team@differenzsystem.com';
  }

  visitWebsite() {
    window.open('https://www.differenzsystem.com/', '_blank');
  }
}
