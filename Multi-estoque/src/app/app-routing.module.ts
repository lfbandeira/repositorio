import { EstoqueRoutingModule } from './estoque/estoque.routing.module';
import { UsuarioRoutingModule } from './usuario/usuario.routing.module';
import { UnidadeRoutingModule } from './unidade/unidade.routing.module';
import { ProdutoRoutingModule } from './produto/produto.routing.module';
import { EmbalagemRoutingModule } from './embalagem/embalagem.routing.module';
import { CentralRoutingModule } from './central/central.routing.module';
import { MenuComponent } from './menu/menu/menu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/auth.guard.service';

const routes: Routes = [
  { path: '',  component: MenuComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CentralRoutingModule,
    EmbalagemRoutingModule,
    ProdutoRoutingModule,
    UnidadeRoutingModule,
    UsuarioRoutingModule,
    EstoqueRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
