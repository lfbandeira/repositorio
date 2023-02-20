import { LoginService } from './../../login/login.service';
import { CentralService } from './../central.service';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-central-form',
  templateUrl: './central-form.component.html',
  styleUrls: ['./central-form.component.scss'],
})
export class CentralFormComponent implements OnInit {


  form = this.formBuilder.group({
    cpf_cnpj: this.loginService.cpf_cnpj,
    idCentral: this.loginService.chave,
    descricao: [''],
    cidade: [''],
    bairro: [''],
  });


  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CentralService,
    private snackBar: MatSnackBar,
    private location: Location,
    private loginService:LoginService
  ) {}
  ngOnInit(): void {}
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
    this.snackBar.open('Erro ao salvar Central', '', { duration: 5000 });
  }

  private onSuccess() {
    this.snackBar.open('Central Enviada com sucesso', '', { duration: 5000 });
    this.location.back();
  }
}
