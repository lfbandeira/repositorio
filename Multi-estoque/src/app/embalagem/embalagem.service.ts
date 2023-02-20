import { ConsultaPaginada } from './model/consultaPaginada';
import { Embalagem } from './model/embalagem';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Chave } from '../produto/model/chave';

@Injectable({
  providedIn: 'root',
})
export class EmbalagemService {
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  private readonly APIBuscaChave =
    'https://0jc60ezzki.execute-api.sa-east-1.amazonaws.com/buscaContagem/' +
    this.loginService.cpf_cnpj;

  APIListaTodos: string =
    'https://0jc60ezzki.execute-api.sa-east-1.amazonaws.com/lista/?cpf_cnpj=' +
    this.loginService.cpf_cnpj;

    APIListaPaginada: string =
    'https://0jc60ezzki.execute-api.sa-east-1.amazonaws.com/consultaPaginada' ;

  APIListaCombo: string =
    'https://0jc60ezzki.execute-api.sa-east-1.amazonaws.com/listarCombo/?cpf_cnpj=' +
    this.loginService.cpf_cnpj;
  private readonly APICadastrar =
    'https://0jc60ezzki.execute-api.sa-east-1.amazonaws.com/cadastrarEmbalagem';
  private readonly APIListaPorId =
    'https://0jc60ezzki.execute-api.sa-east-1.amazonaws.com/listaporid/' +
    this.loginService.cpf_cnpj +
    '/';

  listarPorId(idEmbalagem: string) {
    const url = this.APIListaPorId + idEmbalagem;
    return this.httpClient.get<Embalagem[]>(url).pipe(first(), tap());
  }

  private create(record: Partial<Embalagem>) {
    return this.httpClient
      .post<Embalagem>(this.APICadastrar, record)
      .pipe(first());
  }


  consultaPaginada(record: Partial<ConsultaPaginada>) {
    return this.httpClient
      .post(this.APIListaPaginada, record)
      .pipe(first());
  }


  salvar(record: Partial<Embalagem>) {
    return this.create(record);
  }

  buscaChave() {
    const url = this.APIBuscaChave;
    return this.httpClient.get<Chave[]>(url).pipe(first(), tap());
  }

  listar() {
    return this.httpClient.get<Embalagem[]>(this.APIListaTodos).pipe(
      first(),
      tap((embalagens) => {
        this.loginService.chave = (embalagens.length + 1).toString();
      })
    );
  }

  listarCombo() {
    return this.httpClient.get<Embalagem[]>(this.APIListaCombo).pipe(
      first(),
      tap((embalagens) => {
        this.loginService.chave = (embalagens.length + 1).toString();
      })
    );
  }
}
