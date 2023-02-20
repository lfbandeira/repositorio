import { EstoqueService } from './estoque.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { LoginService } from '../login/login.service';
import { Produto } from '../produto/model/produto';
import { UnidadeService } from '../unidade/unidade.service';
import { ProdutoService } from './../produto/produto.service';
import { Estoque } from './model/estoque';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss'],
})
export class EstoqueComponent implements OnInit {
  habilitaTransferencia: boolean = false;
  habilitaAporte: boolean = false;
  habilitaVenda: boolean = false;
  habilitaAvaria: boolean = false;
  estoque: Estoque[] = [];
  quantidade: string = '';
  produtos: Produto[] = [];
  idproduto: string = '';
  idUnidade: string = '';

  descProduto: string = '';
  descEmbalagem: string = '';
  descUnidade: string = '';
  quemChamou: string = '';

  /**
   * Tratamento dos Spinners
   */
  desabilitaSpinnerProdutoVenda: boolean = true;
  desabilitaSpinnerUnidadeVenda: boolean = true;

  desabilitaSpinnerProdTrans: boolean = true;
  desabilitaSpinnerUnidadeTransOrigem: boolean = true;
  desabilitaSpinnerUnidadeTransDestino: boolean = true;

  desabilitaSpinnerProdAvaria: boolean = true;
  desabilitaSpinnerUnidadeAvaria: boolean = true;

  desabilitaSpinnerProdAporte: boolean = true;
  desabilitaSpinnerUnidadeAporte: boolean = true;

  desabilitaSpinner: boolean = true;

  trataSpinner(acao: boolean) {
    switch (this.quemChamou) {
      case 'transferencia':
        this.desabilitaSpinnerProdTrans = acao;
        break;
      case 'aporte':
        this.desabilitaSpinnerProdAporte = acao;
        break;
      case 'venda':
        this.desabilitaSpinnerProdutoVenda = acao;
        break;
      case 'avaria':
        this.desabilitaSpinnerProdAvaria = acao;

        break;
      case 'unidadeOrigem':
        this.desabilitaSpinnerUnidadeTransOrigem = acao;

        break;
      case 'unidadeDestino':
        this.desabilitaSpinnerUnidadeTransDestino = acao;

        break;
    }
  }
  limpaVariaveis() {
    this.quantidade = '';
    this.idproduto = '';
    this.idUnidade = '';
    this.descProduto = '';
    this.descEmbalagem = '';
    this.descUnidade = '';
     this.estoque = [];
    return;
  }
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private produtoService: ProdutoService,
    private unidadeService: UnidadeService,
    private estoqueService: EstoqueService,
    private snackBar: MatSnackBar
  ) {}

  vender() {
    this.desabilitaSpinner = false;
    const vChave: string =
      this.idUnidade + '|' + this.idproduto + '|' + this.loginService.cpf_cnpj;
    let data = new Date();
    let dataFormatada =
      data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();

    this.estoque.push({
      cpf_cnpj: this.loginService.cpf_cnpj,
      chave: vChave,
      data: dataFormatada,
      descEmbalagem: this.descEmbalagem,
      descProduto: this.descProduto,
      descUnidade: this.descUnidade,
      obs: 'Baixa por Venda',
      quantidade: Number(this.quantidade)*-1,
      usuario: this.loginService.idUsuario,
    });


    this.estoqueService.salvarBaixa(this.estoque[0]).subscribe(
      (result) => this.onSuccess('Baixa'),
      (error) => this.onError('Baixa')
    );
    this.limpaVariaveis();
    this.desabilitaSpinner = true;
  }

  lancarAvaria() {
    this.desabilitaSpinner = false;
    const vChave: string =
      this.idUnidade + '|' + this.idproduto + '|' + this.loginService.cpf_cnpj;
   let data = new Date();
    let dataFormatada =
      data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();

    this.estoque.push({
      cpf_cnpj: this.loginService.cpf_cnpj,
      chave: vChave,
      data: dataFormatada,
      descEmbalagem: this.descEmbalagem,
      descProduto: this.descProduto,
      descUnidade: this.descUnidade,
      obs: 'Baixa por Avaria',
      quantidade: Number(this.quantidade)* -1,
      usuario: this.loginService.idUsuario,
    });

    this.estoqueService.salvarBaixa(this.estoque[0]).subscribe(
      (result) => this.onSuccess('Baixa'),
      (error) => this.onError('Baixa')
    );
    this.limpaVariaveis();
    this.desabilitaSpinner = true;
  }
  cancelar(): void {
    this.habilitaVenda = false;
    this.habilitaAvaria = false;
    this.habilitaAporte = false;
    this.habilitaTransferencia = false;

    this.limpaVariaveis();
  }

  onListUnidade(quemChamou: string) {
    this.quemChamou = quemChamou;
    this.trataSpinner(false);
    let unidade: string = '';

    switch (this.quemChamou) {
      case 'unidadeOrigem':
        unidade = this.idUnidade;
        break;
      default:
        unidade = this.idUnidade;
    }

    this.unidadeService.listarPorId(unidade).subscribe((dados) => {
      if (dados.length > 0) {
        switch (this.quemChamou) {
          default:
            this.descUnidade = dados[0].descricao;
        }

        this.trataSpinner(true);
      } else {
        this.descUnidade = '';
        this.trataSpinner(true);
      }
    });
  }

  onList(quemChamou: string) {
    this.quemChamou = quemChamou;
    this.trataSpinner(false);

    this.produtoService.listarPorId(this.idproduto).subscribe((dados) => {
      if (dados.length > 0) {
        this.descProduto = dados[0].descricao;
        this.descEmbalagem = dados[0].descEmbalagem;
        this.trataSpinner(true);
      } else {
        this.trataSpinner(true);
      }
    });
  }

  ngOnInit(): void {


  }
  marcaOpcao(opcao: string) {
    this.limpaVariaveis();
    switch (opcao) {
      case 'transferencia':
        this.habilitaTransferencia = true;
        this.habilitaAporte = false;
        this.habilitaAvaria = false;
        this.habilitaVenda = false;
        break;
      case 'aporte':
        this.habilitaTransferencia = false;
        this.habilitaAporte = true;
        this.habilitaAvaria = false;
        this.habilitaVenda = false;
        break;
      case 'venda':
        this.habilitaTransferencia = false;
        this.habilitaAporte = false;
        this.habilitaAvaria = false;
        this.habilitaVenda = true;
        break;
      case 'avaria':
        this.habilitaTransferencia = false;
        this.habilitaAporte = false;
        this.habilitaAvaria = true;
        this.habilitaVenda = false;
        break;
    }
  }

  lancarAporte() {
    this.desabilitaSpinner = false;
    const vChave: string =
      this.idUnidade + '|' + this.idproduto + '|' + this.loginService.cpf_cnpj;
    let data = new Date();
    let dataFormatada =
      data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();

   this.estoque.push({
      cpf_cnpj: this.loginService.cpf_cnpj,
      chave: vChave,
      data: dataFormatada,
      descEmbalagem: this.descEmbalagem,
      descProduto: this.descProduto,
      descUnidade: this.descUnidade,
      obs: 'Aporte',
      quantidade: Number(this.quantidade),
      usuario: this.loginService.idUsuario,
    });


    this.estoqueService.salvarAporte(this.estoque[0]).subscribe(
      (result) => this.onSuccess('Aporte'),
      (error) => this.onError('Aporte')
    );
    this.limpaVariaveis();
    this.desabilitaSpinner = true;
  }

  private onError(modulo: string) {
    this.snackBar.open('Erro ao salvar ' + modulo, '', { duration: 5000 });
  }

  private onSuccess(modulo: string) {
    this.snackBar.open(modulo + ' ocorreu com sucesso', '', { duration: 5000 });
    //this.location.back();
  }
}
