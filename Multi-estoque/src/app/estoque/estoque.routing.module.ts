import { RelEstoqueComponent } from './rel-estoque/rel-estoque.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../guards/auth.guard.service';
import { EstoqueComponent } from './estoque.component';

const routes: Routes = [
  { path: 'estoque',  component: EstoqueComponent, canActivate: [AuthGuardService] },
  { path: 'relestoque',  component: RelEstoqueComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class EstoqueRoutingModule {}
