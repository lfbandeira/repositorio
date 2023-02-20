import { EstoqueService } from './../../estoque.service';
import { UnidadeService } from './../../../unidade/unidade.service';
import { ProdutoService } from 'src/app/produto/produto.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Estoque } from '../../model/estoque';

@Component({
  selector: 'app-form-transferencia',
  templateUrl: './form-transferencia.component.html',
  styleUrls: ['./form-transferencia.component.scss'],
})
export class FormTransferenciaComponent {
  desabilitaSpinnerUnOrigem: boolean = true;
  desabilitaSpinnerUnDestino: boolean = true;
  desabilitaSpinnerProd : boolean=true;
  desabilitaSpinnerSalvar:boolean=true;
  estoque: Estoque[] = [];
  descEmbalagem: string = '';
  quemChamou: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private produtoService: ProdutoService,
    private unidadeService: UnidadeService,
    private estoqueService: EstoqueService,
    private snackBar: MatSnackBar
  ) {}

  form = this.formBuilder.group({
    descProduto: ['', Validators.required],
    quantidade: ['', Validators.required],
    unidadeOrigem: ['', Validators.required],
    unidadeDestino: ['', Validators.required],
    idUnidadeOrigem: ['', Validators.required],
    idUnidadeDestino: ['', Validators.required],
    idProduto: ['', Validators.required],
  });

  limpaVariaveis() {
    this.form.reset();
    this.estoque = [];
    return;
  }

  onListProduto() {
    this.desabilitaSpinnerProd = false;

    const idProduto = this.form.get('idProduto').getRawValue();
    this.produtoService.listarPorId(idProduto).subscribe((dados) => {
      if (dados.length > 0) {
        this.form.get('descProduto').setValue(dados[0].descricao);
        this.descEmbalagem = dados[0].descEmbalagem;
        this.desabilitaSpinnerProd = true;

      } else {
        this.form.get('descProduto').setValue('');
        this.desabilitaSpinnerProd = true;

      }
    });
  }

  onListUnidade(quemChamou: string) {
    this.quemChamou = quemChamou;
    let unidade: any = '';

    switch (this.quemChamou) {
      case 'unidadeOrigem':
        this.desabilitaSpinnerUnOrigem=false;
        unidade = this.form.get('idUnidadeOrigem').getRawValue();
        break;
      default:
        this.desabilitaSpinnerUnDestino=false;
        unidade = this.form.get('idUnidadeDestino').getRawValue();
    }

    this.unidadeService.listarPorId(unidade).subscribe((dados) => {
      if (dados.length > 0) {
        switch (this.quemChamou) {
          case 'unidadeOrigem':
            this.form.get('unidadeOrigem').setValue(dados[0].descricao);
            this.desabilitaSpinnerUnOrigem=true;
            break;
          default:
            this.desabilitaSpinnerUnDestino=true;
            this.form.get('unidadeDestino').setValue(dados[0].descricao);
        }
      } else {
        switch (this.quemChamou) {
          case 'unidadeOrigem':
            this.form.get('unidadeOrigem').setValue('');
            this.desabilitaSpinnerUnOrigem=true;
            break;
          default:
            this.desabilitaSpinnerUnDestino=true;
            this.form.get('unidadeDestino').setValue('');
        }
      }
    });
  }



  salvarTransferencia() {
this.desabilitaSpinnerSalvar=false;
    let data = new Date();
    let dataFormatada =
      data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
      const formulario = this.form.value;

    let vChave: string =
    formulario.idUnidadeDestino+
      '|' +
    formulario.idProduto+
      '|' +
      this.loginService.cpf_cnpj;
    /**
     * Iniciando o aporte
     */
    this.estoque.push({
      cpf_cnpj: this.loginService.cpf_cnpj,
      chave: vChave,
      data: dataFormatada,
      descEmbalagem: this.descEmbalagem,
      descProduto: formulario.descProduto,
      descUnidade: formulario.unidadeDestino,
      obs:
        'Aporte Por Transferencia ( Unidade Origem ' +
        formulario.unidadeOrigem+
        ' - Unidade Destino ' +
        formulario.unidadeDestino+
        ')',
      quantidade: Number(formulario.quantidade),
      usuario: this.loginService.idUsuario,
    });

    this.estoqueService.salvarAporte(this.estoque[0]).subscribe();

    vChave =
    formulario.idUnidadeOrigem +
      '|' +
      formulario.idProduto +
      '|' +
      this.loginService.cpf_cnpj;
    this.estoque[0].chave = vChave;
    this.estoque[0].descUnidade = formulario.unidadeOrigem;
    this.estoque[0].quantidade = Number(formulario.quantidade) * -1;
    this.estoque[0].obs =
      'Baixa Por Transferencia ( Unidade Origem ' +
      formulario.unidadeOrigem+
      ' - Unidade Destino ' +
      formulario.unidadeDestino+
      ')';
    this.estoqueService.salvarBaixa(this.estoque[0]).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
    /**
     * Finalizando a Baixa
     */
    this.limpaVariaveis();
    this.desabilitaSpinnerSalvar=true;
  }

  private onError() {
    this.snackBar.open('Erro ao salvar Transferencia ' , '', {
      duration: 3000,
    });
  }

  private onSuccess() {
    this.snackBar.open('Transferencia ocorreu com sucesso', '', {
      duration: 3000,
    });
    //this.location.back();
  }
}
