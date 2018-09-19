import { Component, Input, EventEmitter } from '@angular/core';
import { EmitService } from '../_services/emit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { Redirect } from '../_services/commonFunctions';
@Component({
    //moduleId: module.id,
    selector:'main',
    templateUrl: 'index.component.html'
})
export class IndexInnerComponent {
    title = '';
    constructor(private emitService: EmitService, private storageService: StorageService, private route: ActivatedRoute, private router: Router, private redirect: Redirect ) {
    }
}
