import { Usuario } from './model/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Chave } from '../produto/model/chave';
import { ConsultaPaginada } from './model/consultaPaginada';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  APIListaPaginada: string =
    'https://3r6c5rmxdd.execute-api.sa-east-1.amazonaws.com/consultaPaginada' ;


  APIListaTodos: string =
    'https://3r6c5rmxdd.execute-api.sa-east-1.amazonaws.com/lista/?cpf_cnpj=' +
    this.loginService.cpf_cnpj;
  private readonly APICadastrar =
    'https://3r6c5rmxdd.execute-api.sa-east-1.amazonaws.com/cadastrarUsuario';
  private readonly APIListaPorLogin =
    'https://3r6c5rmxdd.execute-api.sa-east-1.amazonaws.com/listarPorLogin/' +
    this.loginService.cpf_cnpj +
    '/';

  private readonly APIBuscaChave =
    'https://3r6c5rmxdd.execute-api.sa-east-1.amazonaws.com/buscaContagem/' +
    this.loginService.cpf_cnpj;

  buscaChave() {
    const url = this.APIBuscaChave;
    return this.httpClient.get<Chave[]>(url).pipe(first(), tap());
  }

  private create(record: Partial<Usuario>) {
    return this.httpClient
      .post<Usuario>(this.APICadastrar, record)
      .pipe(first());
  }

  listarPorLogin(login: string) {
    const url = this.APIListaPorLogin + login;
    return this.httpClient.get<Usuario[]>(url).pipe(first(), tap());
  }

  consultaPaginada(record: Partial<ConsultaPaginada>) {
    return this.httpClient
      .post(this.APIListaPaginada, record)
      .pipe(first());
  }

  salvar(record: Partial<Usuario>) {
    return this.create(record);
  }

  listar() {
    return this.httpClient
      .get<Usuario[]>(this.APIListaTodos)
      .pipe(first(), tap());
  }
}
