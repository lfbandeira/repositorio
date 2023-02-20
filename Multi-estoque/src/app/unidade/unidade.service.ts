import { Unidade } from './model/unidade';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Chave } from '../produto/model/chave';
import { ConsultaPaginada } from './model/consultaPaginada';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  APIListaPaginada: string =
  'https://9egbf1h5h5.execute-api.sa-east-1.amazonaws.com/consultaPaginada' ;


  private readonly APIBuscaChave =
    'https://9egbf1h5h5.execute-api.sa-east-1.amazonaws.com/buscaContagem/' +
    this.loginService.cpf_cnpj;

  APIListaTodos: string = 'https://9egbf1h5h5.execute-api.sa-east-1.amazonaws.com/lista/?cpf_cnpj=' +  this.loginService.cpf_cnpj;
  APIScan: string = 'https://9egbf1h5h5.execute-api.sa-east-1.amazonaws.com/scanTable/?cpf_cnpj=' +  this.loginService.cpf_cnpj;

  private readonly APICadastrar = 'https://9egbf1h5h5.execute-api.sa-east-1.amazonaws.com/cadastrarUnidade';
  private readonly APIListaPorId =
  'https://9egbf1h5h5.execute-api.sa-east-1.amazonaws.com/unidadeporid/' +
  this.loginService.cpf_cnpj +
  '/';

  private create(record: Partial<Unidade>) {
    return this.httpClient
      .post<Unidade>(this.APICadastrar, record)
      .pipe(first());
  }

  listarPorId(idUnidade: string) {
    const url = this.APIListaPorId + idUnidade;
    return this.httpClient.get<Unidade[]>(url).pipe(first(), tap());
  }

  salvar(record: Partial<Unidade>) {
    return this.create(record);
  }

  listar() {
    return this.httpClient.get<Unidade[]>(this.APIListaTodos).pipe(
      first(),
      tap((unidades) => {
        this.loginService.chave = (unidades.length +1).toString();
      })
    );
  }

  buscaChave() {
    const url = this.APIBuscaChave;
    return this.httpClient.get<Chave[]>(url).pipe(first(), tap());
  }
  scan() {
    return this.httpClient.get<Unidade[]>(this.APIScan).pipe(
      first(),
      tap()
    );
  }

  consultaPaginada(record: Partial<ConsultaPaginada>) {
    return this.httpClient
      .post(this.APIListaPaginada, record)
      .pipe(first());
  }
}
