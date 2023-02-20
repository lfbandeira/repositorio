import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login/login.service';
import { EmbalagemService } from '../embalagem.service';
import { Location } from '@angular/common';
import { Embalagem } from '../model/embalagem';

@Component({
  selector: 'app-embalagem-form',
  templateUrl: './embalagem-form.component.html',
  styleUrls: ['./embalagem-form.component.scss']
})
export class EmbalagemFormComponent {
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';


  form = this.formBuilder.group({
    cpf_cnpj: this.loginService.cpf_cnpj,
    idEmbalagem: this.loginService.chave,
    descricao: ["", Validators.required]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: EmbalagemService,
    private snackBar: MatSnackBar,
    private location: Location,
    private loginService:LoginService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    const embalagem:Embalagem[] = this.route.snapshot.data['embalagem'];
     if(embalagem[0].idEmbalagem!=''){
      this.form.setValue({
        cpf_cnpj:embalagem[0].cpf_cnpj,
        idEmbalagem:embalagem[0].idEmbalagem,
        descricao:embalagem[0].descricao
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
    this.snackBar.open('Erro ao Salvar embalagem', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  private onSuccess() {
    this.snackBar.open('Embalagem Enviada com sucesso', '', { duration: 3000 });
    this.location.back();
  }
}
