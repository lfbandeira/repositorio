import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../guards/auth.guard.service';
import { CentralFormComponent } from './central-form/central-form.component';
import { CentralComponent } from './central.component';

const routes: Routes = [
  { path: 'central',  component: CentralComponent, canActivate: [AuthGuardService] },
  { path: 'novacentral',  component: CentralFormComponent, canActivate: [AuthGuardService] },
  { path: 'editacentral',  component: CentralFormComponent, canActivate: [AuthGuardService] }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class CentralRoutingModule {}
