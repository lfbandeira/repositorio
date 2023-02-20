import { Unidade } from './../model/unidade';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login/login.service';
import { UnidadeService } from '../unidade.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unidade-form',
  templateUrl: './unidade-form.component.html',
  styleUrls: ['./unidade-form.component.scss']
})
export class UnidadeFormComponent {
  form = this.formBuilder.group({
    cpf_cnpj: [this.loginService.cpf_cnpj,Validators.required],
    idUnidade: [this.loginService.chave,Validators.required],
    descricao: ['',Validators.required],
    cidade: [''],
    bairro: [''],

  });


  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UnidadeService,
    private snackBar: MatSnackBar,
    private location: Location,
    private loginService:LoginService,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    const unidade:Unidade[] = this.route.snapshot.data['unidade'];
    if(unidade[0].idUnidade!=''){
     this.form.setValue({
      cpf_cnpj: unidade[0].cpf_cnpj,
      idUnidade: unidade[0].idUnidade,
      descricao: unidade[0].descricao,
      cidade: unidade[0].cidade,
      bairro: unidade[0].bairro,
     })
   }

  }
  onCancel() {
    this.location.back();
  }
  onSubmit() {
    this.service.salvar(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  private onError() {
    this.snackBar.open('Erro ao salvar Unidade', '', { duration: 3000 });
  }

  private onSuccess() {
    this.snackBar.open('Unidade Enviada com sucesso', '', { duration: 3000 });
    this.location.back();
  }
}
