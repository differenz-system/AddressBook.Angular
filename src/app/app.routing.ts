import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'home', loadChildren: './home/outer.module#OuterModule' },
            { path: '', loadChildren: './main/inner.module#InnerModule' },
            // otherwise redirect to home
            { path: '**', redirectTo: 'home/welcome' }
        ], { useHash: true, relativeLinkResolution: 'legacy' })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
