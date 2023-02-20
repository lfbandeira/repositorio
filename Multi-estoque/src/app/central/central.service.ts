import { LoginService } from 'src/app/login/login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Central } from './model/central';

@Injectable({
  providedIn: 'root',
})
export class CentralService {

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}
  APIListaTodos: string =
    'https://fmox2oj7mc.execute-api.sa-east-1.amazonaws.com/lista/?cpf_cnpj=' +
    this.loginService.cpf_cnpj;
  private readonly APICadastrar =
    'https://fmox2oj7mc.execute-api.sa-east-1.amazonaws.com/cadastrarCentral';

  private create(record: Partial<Central>) {
    return this.httpClient
      .post<Central>(this.APICadastrar, record)
      .pipe(first());
  }
  salvar(record: Partial<Central>) {
    return this.create(record);
  }

  listar() {
    return this.httpClient.get<Central[]>(this.APIListaTodos).pipe(
      first(),
      tap((centrais) => {
        this.loginService.chave = (centrais.length +1).toString();
      })
    );
  }
}
