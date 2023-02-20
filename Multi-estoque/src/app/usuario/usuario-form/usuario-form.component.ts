import { Usuario } from './../model/usuario';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login/login.service';
import { UsuarioService } from '../usuario.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent {
  form = this.formBuilder.group({
    cpf_cnpj: this.loginService.cpf_cnpj,
    login: [this.loginService.chave,Validators.required],
    nome: ['',Validators.required],
    senha: ['',Validators.required],
    excluido:[false]
  });

   editando : boolean = false;



  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UsuarioService,
    private snackBar: MatSnackBar,
    private location: Location,
    private loginService:LoginService,
    private route:ActivatedRoute
  ) {
    this.editando=loginService.edicao;
  }
  ngOnInit(): void {
    const usuario:Usuario[] = this.route.snapshot.data['usuario'];
    if(usuario[0].login!=''){
     this.form.setValue({
      cpf_cnpj: usuario[0].cpf_cnpj,
      login: usuario[0].login,
      nome: usuario[0].nome,
      senha: usuario[0].senha,
      excluido:usuario[0].excluido
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
    this.snackBar.open('Erro ao salvar Usuário', '', { duration: 3000 });
  }

  private onSuccess() {
    this.snackBar.open('Usuário Enviado com sucesso', '', { duration: 3000 });
    this.location.back();
  }
}
