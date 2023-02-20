import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs';

import { Usuario } from './../usuario/model/usuario';
import { UsuarioService } from './../usuario/usuario.service';
import { Login } from './model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioAutenticado:boolean=false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  idUsuario: string='';
  cpf_cnpj: string='';
  chave: string='';
  edicao:boolean=false;
  APIEfetuarLogin: string =
  'https://3r6c5rmxdd.execute-api.sa-east-1.amazonaws.com/efetuarLogin/' ;



  constructor(private router:Router,
    private httpClient: HttpClient) { }



    consultar(login: string, senha:string, cpf_cnpj:string) {
      const url = this.APIEfetuarLogin +cpf_cnpj+'/'+ login+'|'+senha;
      return this.httpClient.get<Usuario>(url).pipe(first(), tap());
    }

    fazerLogin(login: Partial<Login>) {
      const url =
        this.APIEfetuarLogin +
        login.cpf_cnpj +
        '/' +
        login.login +
        '|' +
        login.senha;

      return this.httpClient.get<Usuario>(url).pipe(
        first()
      );
    }


  setUsuarioAutenticado(autenticado: boolean) {
    this.usuarioAutenticado = autenticado;
  }
  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }
}
