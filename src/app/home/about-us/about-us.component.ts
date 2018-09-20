import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  //moduleId: module.id,
  selector: 'app-about',
  templateUrl: './about-us.component.html'
})
export class AboutUsComponent {
  title = 'Differenz - Abous us';
  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
