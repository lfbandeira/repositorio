import { ProdutoResolver } from './../guards/produto.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../guards/auth.guard.service';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoComponent } from './produto.component';

const routes: Routes = [
  { path: 'produto',  component: ProdutoComponent, canActivate: [AuthGuardService] },
  { path: 'novoproduto',  component: ProdutoFormComponent, canActivate: [AuthGuardService],
  resolve: { produto: ProdutoResolver } },
  { path: 'editaproduto/:idProduto',  component: ProdutoFormComponent, canActivate: [AuthGuardService],
  resolve: { produto: ProdutoResolver } }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
