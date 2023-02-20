import { Relatorio } from './rel-estoque/model/relatorio';
import { LoginService } from './../login/login.service';
import { Estoque } from './model/estoque';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { first, tap, Observable } from 'rxjs';
import { Unidade } from '../unidade/model/unidade';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  APIListaTodas: string =
    'https://9egbf1h5h5.execute-api.sa-east-1.amazonaws.com/lista/?cpf_cnpj=00900164751';

  private readonly APICadastrarBaixa =
    'https://rs5hp5q2m7.execute-api.sa-east-1.amazonaws.com/cadastrarBaixa';

  private readonly APICadastrarAporte =
    'https://mnu91huxw0.execute-api.sa-east-1.amazonaws.com/cadastrarAporte';

  private readonly APIConsultaEstoque =
    'https://jxpcyxbcsl.execute-api.sa-east-1.amazonaws.com/relEstoque/' +
    this.loginService.cpf_cnpj+'/';

  estoques: Estoque[] = [];
  relatorio: Relatorio[] = [];
  @Output() unidades: Unidade[];
  relatorios: Relatorio[];
  @Output() retorno: Relatorio[] = [];

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {
    this.unidades = [];
    this.relatorios = [];
  }

  async buscaEstoque(chave: string) {
     const url = this.APIConsultaEstoque + chave;

    this.relatorios = [];
    this.retorno = [];
    try {
      await this.httpClient.get<Relatorio>(url).forEach((obj) => {
        this.relatorios[0] = obj;
        if (this.relatorios[0].descEmbalagem != '')
          this.retorno.push(this.relatorios[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }
  async buscaUnidades() {
    this.httpClient.get(this.APIListaTodas).forEach((obj) => {
      const aux: string = JSON.stringify(obj);
      this.unidades = JSON.parse(aux);
    });
  }

  /*******    APORTE  ********/
  private createAporte(record: Partial<Estoque>) {
    return this.httpClient
      .post<Estoque>(this.APICadastrarAporte, record)
      .pipe(first());
  }

  salvarAporte(record: Partial<Estoque>) {
    return this.createAporte(record);
  }

  /********  Baixa  ******/

  private createBaixa(record: Partial<Estoque>) {
    return this.httpClient
      .post<Estoque>(this.APICadastrarBaixa, record)
      .pipe(first());
  }

  salvarBaixa(record: Partial<Estoque>) {
    return this.createBaixa(record);
  }
  consultarEstoque(chave: string) {
    const url = this.APIConsultaEstoque + '/' + chave;
    return this.httpClient.get<Relatorio[]>(url).pipe(first(), tap());
  }
}
