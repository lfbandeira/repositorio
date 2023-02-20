import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuario } from '../usuario/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolver implements Resolve<Usuario[]> {
  constructor(private usuarioService:UsuarioService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario[]> {
    if(route.params && route.params['login']){
      return this.usuarioService.listarPorLogin(route.params['login']);
    }
    return of([{
      login:'',
      cpf_cnpj:'',
      nome:'',
      senha:'',
      excluido:false,
    }]);
  }
}
