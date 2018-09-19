import { Component, OnInit } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  // moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  constructor(private router: Router,
    private storageService: StorageService,
  ) {
  }
  ngOnInit() {
    var UserDataKey = "UserData";
    let UserData: any = this.storageService.read(UserDataKey);
    if (UserData && UserData.user_id) {
      this.router.navigate(['address-book']);
    }
    else {  // not logged in so redirect to landing page with the return url
      this.router.navigate(['home/welcome']);
    }
  }
}
