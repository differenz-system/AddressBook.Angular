import { Injectable } from '@angular/core';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { EmitService } from '../_services/emit.service';
import { AppSettings } from '../_modals/appSettings';
// import CryptoJS from 'crypto-js';
// import hmacSHA256 from 'crypto-js/hmac-sha256';
declare var $: any;

@Injectable()
export class Redirect {
    constructor(
        private emitService: EmitService) {
    }
    onClickRedirect(OrganisationId: number, redirectUrl: string): boolean {
        var href = window.location.href;
        if (href.indexOf("Organisation/AddSession") >= 0) {
            let redirectData: any =
            {
                url: redirectUrl,
                OrganisationId: OrganisationId
            }
            if (redirectUrl == "Organisation/AddSession") {
                redirectData.SessionId = 0;
            }
            else if (redirectUrl == "/") // if Click on ViewDashboard then no parameters
            {
                redirectData.SessionId = 0;
                redirectData.OrganisationId = 0;
            }
            this.emitService.emitMenuEvent(redirectData);
            return false;
        }
        else if (href.indexOf("Organisation/EditOrganisation") >= 0) {
            let redirectData: any =
            {
                url: redirectUrl,
                OrganisationId: OrganisationId,
            }
            if (redirectUrl == "Organisation/AddSession") {
                redirectData.SessionId = 0;
            }
            else if (redirectUrl == "/") // if Click on ViewDashboard then no parameters
            {
                redirectData.SessionId = 0;
                redirectData.OrganisationId = 0;
            }
            this.emitService.emitMenuEvent(redirectData);
            return false;
        }
        else {
        }
        return true;
    }
}


@Injectable()
export class HandleErrors {
    constructor(
        private route: ActivatedRoute,
        private router: Router, private storageService: StorageService) {
    }
    HandleError(error: any, toastr: any): void {
        var Message = "";
        if (error.error != undefined && error.error.Message != undefined && error.error.Message != null && error.error.Message != "") {
            Message = error.error.Message
        }
        else if (error != null && error.response != undefined && error.response != null && error.response != '') {
            var errordata = JSON.parse(error.response);
            Message = errordata.Message
        }
        else {
            Message = "Error Occured, Please try again"
        }
        if (error.status == 400 || error.status == 500) { // BadRequest OR Internal Server Error
            toastr.error(Message);
        }
        else if (error.status == 405) {
            var UserDataKey = "UserData";
            let UserData: any = this.storageService.read(UserDataKey);
        }

        else if (error.status == 800 || error.status == 401) { // Token Expired Or Unauthorized
            toastr.error('Session Expired');
        }
        else if (error.status == 0 && !navigator.onLine) {
            toastr.error('No Internet Connectivity');
        }
        else {
            toastr.error(Message);
        }
    }
}
