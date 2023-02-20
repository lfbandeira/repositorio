import { Embalagem } from './../embalagem/model/embalagem';
import { EmbalagemService } from './../embalagem/embalagem.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmbalagemResolver implements Resolve<Embalagem[]> {
  constructor(private embalagemService:EmbalagemService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Embalagem[]> {
    if(route.params && route.params['idEmbalagem']){
      return this.embalagemService.listarPorId(route.params['idEmbalagem']);
    }
    return of([{ idEmbalagem:'',
      cpf_cnpj:'',
      descricao:''}]);
  }
}
