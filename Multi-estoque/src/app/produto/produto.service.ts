import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Chave } from './model/chave';
import { ConsultaPaginada } from './model/consultaPaginada';

import { Produto } from './model/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  APIListaPaginada: string =
    'https://2hynx65yc0.execute-api.sa-east-1.amazonaws.com/consultaPaginada';

  private APIListaTodos: string =
    'https://2hynx65yc0.execute-api.sa-east-1.amazonaws.com/lista/?cpf_cnpj=' +
    this.loginService.cpf_cnpj;
  private readonly APICadastrar =
    'https://2hynx65yc0.execute-api.sa-east-1.amazonaws.com/cadastrarProduto';
  private readonly APIListaPorId =
    'https://2hynx65yc0.execute-api.sa-east-1.amazonaws.com/listaporid/' +
    this.loginService.cpf_cnpj +
    '/';
  private readonly APIBuscaChave =
    'https://2hynx65yc0.execute-api.sa-east-1.amazonaws.com/buscaContagem/' +
    this.loginService.cpf_cnpj;

    private create(record: Partial<Produto>) {
    return this.httpClient
      .post<Produto>(this.APICadastrar, record)
      .pipe(first());
  }
  salvar(record: Partial<Produto>) {
    return this.create(record);
  }

  listar() {
    return this.httpClient.get<Produto[]>(this.APIListaTodos).pipe(
      first(),
      tap((produtos) => {
        this.loginService.chave = (produtos.length + 1).toString();
      })
    );
  }

  buscaChave() {
    const url = this.APIBuscaChave;
    return this.httpClient.get<Chave[]>(url).pipe(first(), tap());
  }

  listarPorId(idProduto: string) {
    if (idProduto == '') {
      return this.httpClient
        .get<Produto[]>(this.APIListaTodos)
        .pipe(first(), tap());
    }
    const url = this.APIListaPorId + idProduto;
    return this.httpClient.get<Produto[]>(url).pipe(first(), tap());
  }

  consultaPaginada(record: Partial<ConsultaPaginada>) {
    return this.httpClient
      .post(this.APIListaPaginada, record)
      .pipe(first());
  }

}
