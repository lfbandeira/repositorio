import { UsuarioResolver } from './../guards/usuario.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../guards/auth.guard.service';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  { path: 'usuario',  component: UsuarioComponent, canActivate: [AuthGuardService] },
  { path: 'novousuario',  component: UsuarioFormComponent, canActivate: [AuthGuardService],
  resolve: { usuario: UsuarioResolver } },
  { path: 'editausuario/:login',  component: UsuarioFormComponent, canActivate: [AuthGuardService],
  resolve: { usuario: UsuarioResolver } }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
