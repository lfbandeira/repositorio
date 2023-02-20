import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CentralModule } from './central/central.module';
import { EmbalagemModule } from './embalagem/embalagem.module';
import { EstoqueModule } from './estoque/estoque.module';
import { AuthGuardService } from './guards/auth.guard.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { MenuModule } from './menu/menu/menu.module';
import { ProdutoModule } from './produto/produto.module';
import { UnidadeModule } from './unidade/unidade.module';
import { UsuarioModule } from './usuario/usuario.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [LoginService,AuthGuardService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MenuModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        HttpClientModule,
        CentralModule,
        EmbalagemModule,
        ProdutoModule,
        UnidadeModule,
        UsuarioModule,
        EstoqueModule,
        MatProgressSpinnerModule
    ]
})
export class AppModule { }
