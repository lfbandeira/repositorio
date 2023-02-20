import { UsuarioService } from './usuario.service';
import { Usuario } from './model/usuario';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Chave } from '../produto/model/chave';
import { ConsultaPaginada } from './model/consultaPaginada';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  usuario: string = '';
  inscricao: Subscription = new Subscription();
  usuarios: Usuario[];
  chave: Chave[] = [];
  consultaPaginada: ConsultaPaginada[] = [];
  proximaChave: Object;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.usuario = this.loginService.idUsuario;

    this.usuario = this.loginService.idUsuario;
    this.criaChaveNula();
    this.onListPaginado();

    this.usuarioService.buscaChave().subscribe((dados) => {
      this.chave = dados;
    });
  }

  onListPaginado() {
    this.consultaPaginada = [];
    this.consultaPaginada.push({
      cpf_cnpj: this.loginService.cpf_cnpj,
      limite: '5',
      ultimaChave: this.proximaChave,
    });
    this.usuarioService.consultaPaginada(this.consultaPaginada[0]).subscribe(
      (result) => {
        const aux = JSON.stringify(result);
        const obj = JSON.parse(aux);

        if (obj.Items) {
          this.usuarios = obj.Items;
        } else {
          this.usuarios = obj;
        }

        if (obj.LastEvaluatedKey) {
          this.proximaChave = obj.LastEvaluatedKey;
        } else {
          this.criaChaveNula();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  limpaFiltro(){
    this.criaChaveNula();
    this.onListPaginado();
  }


  onError(errorMsg: string) {
    console.log(errorMsg);
  }

  ngOnInit(): void {
    this.criaChaveNula();
  }
  ngOndestroy() {
    //this.inscricao.unsubscribe();
  }
  onAdd() {
    this.loginService.chave = '';
    this.loginService.edicao = false;
    this.router.navigate(['/novousuario'], { relativeTo: this.route });
  }

  criaChaveNula() {
    this.proximaChave = { cpf_cnpj: '', chave: '' };
  }

  onList(login: string) {
    if (login) {
      this.criaChaveNula();
      this.usuarioService.listarPorLogin(login).subscribe(
        (result) => {
          this.usuarios = result;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onEdit(usuario: Usuario) {
    this.loginService.edicao = true;
    this.loginService.chave = usuario.login;
    this.router.navigate(['/editausuario', usuario.login], {
      relativeTo: this.route,
    });
  }
}
