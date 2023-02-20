import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login/login.service';
import { ProdutoService } from 'src/app/produto/produto.service';
import { UnidadeService } from 'src/app/unidade/unidade.service';
import { EstoqueService } from '../../estoque.service';
import { Estoque } from '../../model/estoque';

@Component({
  selector: 'app-form-aporte',
  templateUrl: './form-aporte.component.html',
  styleUrls: ['./form-aporte.component.scss'],
})
export class FormAporteComponent {
  desabilitaSpinnerProd: boolean = true;
  desabilitaSpinnerUnid: boolean = true;
  desabilitaSpinnerSalvar: boolean = true;
  descEmbalagem: string = '';
  estoque: Estoque[] = [];

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
    unidade: ['', Validators.required],
    idUnidade: ['', Validators.required],
    idProduto: ['', Validators.required],
  });

  limpaVariaveis() {
    this.estoque = [];
    this.form.reset();
    return;
  }

  onListUnidade() {
    let unidade: any = '';

    this.desabilitaSpinnerUnid = false;
    unidade = this.form.get('idUnidade').getRawValue();

    this.unidadeService.listarPorId(unidade).subscribe((dados) => {
      if (dados.length > 0) {
            this.form.get('unidade').setValue(dados[0].descricao);
            this.desabilitaSpinnerUnid = true;
      } else {
            this.form.get('unidade').setValue('');
            this.desabilitaSpinnerUnid = true;

      }
    });
  }

  private onError() {
    this.snackBar.open('Erro ao salvar Aporte ', '', {
      duration: 3000,
    });
  }

  private onSuccess() {
    this.snackBar.open('Aporte ocorreu com sucesso', '', {
      duration: 3000,
    });
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

  lancarAporte() {
    this.desabilitaSpinnerSalvar = false;
    const formulario = this.form.value;
    const vChave: string =
      formulario.idUnidade + '|' + formulario.idProduto + '|' + this.loginService.cpf_cnpj;
    let data = new Date();
    let dataFormatada =
      data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
    this.estoque.push({
      cpf_cnpj: this.loginService.cpf_cnpj,
      chave: vChave,
      data: dataFormatada,
      descEmbalagem: this.descEmbalagem,
      descProduto: formulario.descProduto,
      descUnidade: formulario.unidade,
      obs: 'Aporte',
      quantidade: Number(formulario.quantidade),
      usuario: this.loginService.idUsuario,
    });


    this.estoqueService.salvarAporte(this.estoque[0]).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
    this.limpaVariaveis();
    this.desabilitaSpinnerSalvar = true;
  }


}
