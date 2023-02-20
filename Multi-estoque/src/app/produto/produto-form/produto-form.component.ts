import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Embalagem } from 'src/app/embalagem/model/embalagem';
import { LoginService } from 'src/app/login/login.service';
import { Produto } from '../model/produto';

import { ProdutoService } from '../produto.service';
import { EmbalagemService } from './../../embalagem/embalagem.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent {
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';


  form = this.formBuilder.group({
    cpf_cnpj:[this.loginService.cpf_cnpj,Validators.required],
    idProduto:[this.loginService.chave,Validators.required],
    descricao: ["", Validators.required],
    descEmbalagem:['', Validators.required]
  });

  embalagens :Embalagem[]=[]

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ProdutoService,
    private serviceEmbalagem: EmbalagemService,
    private snackBar: MatSnackBar,
    private location: Location,
    private loginService:LoginService,
    private route:ActivatedRoute
  ) {

    this.serviceEmbalagem.listarCombo().subscribe(dados=>{
      this.embalagens=dados;
    })

  }
  ngOnInit(): void {
    const produto:Produto[] = this.route.snapshot.data['produto'];
    if(produto[0].idProduto!=''){
     this.form.setValue({
      cpf_cnpj: produto[0].cpf_cnpj,
      idProduto: produto[0].idProduto,
      descricao: produto[0].descricao,
      descEmbalagem: produto[0].descEmbalagem
     })
   }

  }
  onCancel() {
    this.location.back();
  }
  onSubmit() {

    this.service.salvar(this.form.value).subscribe(

      (result) => {
        this.onSuccess()
      },
      (error) => {
        this.onError()
      }
    );
  }

  onError() {
    this.snackBar.open('Erro ao Salvar Produto', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  private onSuccess() {
    this.snackBar.open('Produto Enviado com sucesso', '', { duration: 3000 });
    this.location.back();
  }
}

