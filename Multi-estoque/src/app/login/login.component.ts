import { Component, OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  spinner:boolean=true;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';

  constructor(
    private formBuilder:FormBuilder,
    private loginService: LoginService,
    private router:Router,
    private snackBar: MatSnackBar,){

  }

  form = this.formBuilder.group({
    login:["",Validators.required],
    senha: ["", Validators.required],
    cpf_cnpj:['', Validators.required]
  });

  ngOnInit(): void {}

  cancelar(){

  }


  onError() {
    this.snackBar.open('Usuário não autorizado', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }


  fazerLogin() {
    this.spinner=false;
    this.loginService.fazerLogin(this.form.value).subscribe(
      dados=>{
        this.loginService.mostrarMenuEmitter.emit(true)
        this.loginService.idUsuario = dados.login;
        this.loginService.cpf_cnpj = dados.cpf_cnpj;
        this.loginService.setUsuarioAutenticado(true);
        this.router.navigate(['/']);
        this.spinner=true;
      },error=>{
        this.spinner=true;
        this.onError()
  }

    )
  }
}


