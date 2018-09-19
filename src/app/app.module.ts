import { NgModule } from '@angular/core';
import { ServiceCall } from './_services/servicecall.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './_services/account.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HandleErrors, Redirect } from './_services/commonFunctions';
import { StorageService } from './_services/storage.service';
import { EmitService } from './_services/emit.service';
import { AppRoutingModule } from './app.routing'
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [AccountService, ServiceCall, StorageService, HandleErrors, Redirect, EmitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
