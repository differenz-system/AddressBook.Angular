import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './landing.component.html'
})
export class LandingPageComponent   {
  title = 'Differenz - Welcome';
  msg ='Welcome to Differenz Angular 6 Demo App.'
  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
