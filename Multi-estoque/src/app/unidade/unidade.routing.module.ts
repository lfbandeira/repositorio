import { UnidadeResolver } from './../guards/unidade.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../guards/auth.guard.service';
import { UnidadeFormComponent } from './unidade-form/unidade-form.component';
import { UnidadeComponent } from './unidade.component';

const routes: Routes = [
  { path: 'unidade',  component: UnidadeComponent, canActivate: [AuthGuardService] },
  { path: 'novaunidade',  component: UnidadeFormComponent, canActivate: [AuthGuardService],
  resolve: { unidade: UnidadeResolver }},
  { path: 'editaunidade/:idUnidade',  component: UnidadeFormComponent, canActivate: [AuthGuardService],
  resolve: { unidade: UnidadeResolver } },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class UnidadeRoutingModule {}
