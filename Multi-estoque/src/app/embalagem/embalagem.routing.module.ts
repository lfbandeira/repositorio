import { EmbalagemResolver } from './../guards/embalagem.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../guards/auth.guard.service';
import { EmbalagemComponent } from './embalagem.component';
import { EmbalagemFormComponent } from './embalagem-form/embalagem-form.component';

const routes: Routes = [
  {
    path: 'embalagem',
    component: EmbalagemComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'novaembalagem',
    component: EmbalagemFormComponent,
    canActivate: [AuthGuardService],
    resolve: { embalagem: EmbalagemResolver }
  },
  {
    path: 'editaembalagem/:idEmbalagem',
    component: EmbalagemFormComponent,
    canActivate: [AuthGuardService],
    resolve: { embalagem: EmbalagemResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmbalagemRoutingModule {}
