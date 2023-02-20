import { UnidadeService } from './../unidade/unidade.service';
import { ProdutoService } from './../produto/produto.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Unidade } from '../unidade/model/unidade';

@Injectable({
  providedIn: 'root'
})
export class UnidadeResolver implements Resolve<Unidade[]> {
  constructor(private unidadeService:UnidadeService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Unidade[]> {
    if(route.params && route.params['idUnidade']){
      return this.unidadeService.listarPorId(route.params['idUnidade']);
    }
    return of([{
      idUnidade:'',
      cpf_cnpj:'',
      descricao:'',
      cidade:'',
      bairro:''
    }]);
  }
}
