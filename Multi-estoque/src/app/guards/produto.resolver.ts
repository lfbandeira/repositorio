import { ProdutoService } from './../produto/produto.service';
import { Produto } from './../produto/model/produto';
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

export class ProdutoResolver implements Resolve<Produto[]> {

  constructor(private produtoService:ProdutoService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Produto[]> {
    if(route.params && route.params['idProduto']){
      return this.produtoService.listarPorId(route.params['idProduto']);
    }
    return of([
      {
        idProduto:'',
        cpf_cnpj:'',
        descricao:'',
        descEmbalagem:''
    }
    ]);
  }

}
